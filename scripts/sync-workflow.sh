#!/bin/bash

# sync-workflow.sh
# Syncs workflow files from src/core/workflows/ to .baton/workflows/
# Usage:
#   --all              : Sync all workflows (main + sub-flows)
#   --name <workflow-name>: Sync specific workflow (without .yml extension)

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory (where this script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Project root (parent of scripts directory)
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Change to project root
cd "$PROJECT_ROOT"

# Source and destination directories
SOURCE_MAIN_DIR="src/core/workflows"
SOURCE_SUB_DIR="src/core/workflows/sub-flows"
DEST_MAIN_DIR=".baton/workflows"
DEST_SUB_DIR=".baton/workflows/sub-flows"

# Parse arguments
MODE=""
WORKFLOW_NAME=""

if [ "$1" = "--all" ]; then
    MODE="all"
elif [ "$1" = "--name" ]; then
    if [ -z "$2" ]; then
        echo -e "${RED}Error: --name requires a workflow name${NC}"
        echo "Usage: $0 [--all|--name <workflow-name>]"
        exit 1
    fi
    MODE="name"
    WORKFLOW_NAME="$2"
else
    echo -e "${BLUE}Usage: $0 [--all|--name <workflow-name>]${NC}"
    echo ""
    echo "Options:"
    echo "  --all              Sync all workflow files (main workflows + sub-flows)"
    echo "  --name <workflow-name> Sync specific workflow"
    echo "                      Main workflows: e.g., 'agent-initialisation', 'project-initialisation'"
    echo "                      Sub-flows: e.g., 'sub-flow-load-project-config'"
    echo ""
    exit 1
fi

# Function to sync a single workflow file
sync_workflow() {
    local workflow_name="$1"
    local source_file=""
    local dest_file=""
    
    # Check if it's a main workflow or sub-flow
    if [[ "$workflow_name" == sub-flow-* ]]; then
        # Sub-flow
        source_file="$SOURCE_SUB_DIR/${workflow_name}.yml"
        dest_file="$DEST_SUB_DIR/${workflow_name}.yml"
    else
        # Main workflow
        source_file="$SOURCE_MAIN_DIR/${workflow_name}.yml"
        dest_file="$DEST_MAIN_DIR/${workflow_name}.yml"
    fi
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Workflow not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest_file")"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $workflow_name${NC}"
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all workflows...${NC}"
    echo ""
    
    # Sync main workflows
    if [ -d "$SOURCE_MAIN_DIR" ]; then
        main_count=0
        for workflow_file in "$SOURCE_MAIN_DIR"/*.yml; do
            if [ -f "$workflow_file" ]; then
                workflow_name=$(basename "$workflow_file" .yml)
                # Skip sub-flows directory
                if [ "$workflow_name" != "sub-flows" ]; then
                    sync_workflow "$workflow_name"
                    ((main_count++))
                fi
            fi
        done
        echo -e "${GREEN}✓ Synced $main_count main workflow(s)${NC}"
    fi
    
    # Sync sub-flows
    if [ -d "$SOURCE_SUB_DIR" ]; then
        sub_count=0
        for workflow_file in "$SOURCE_SUB_DIR"/*.yml; do
            if [ -f "$workflow_file" ]; then
                workflow_name=$(basename "$workflow_file" .yml)
                sync_workflow "$workflow_name"
                ((sub_count++))
            fi
        done
        echo -e "${GREEN}✓ Synced $sub_count sub-flow(s)${NC}"
    fi
    
    total=$((main_count + sub_count))
    if [ $total -eq 0 ]; then
        echo -e "${YELLOW}⚠ No workflow files found${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $total workflow(s) total${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing workflow: $WORKFLOW_NAME${NC}"
    echo ""
    
    sync_workflow "$WORKFLOW_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Workflow sync complete!${NC}"
    else
        exit 1
    fi
fi

