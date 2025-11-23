#!/bin/bash

# sync-agent.sh
# Syncs agent files from src/core/agents/ to .baton/agents/
# Usage:
#   --all              : Sync all agents
#   --name <agent-name>: Sync specific agent (without .md extension)

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
SOURCE_DIR="src/core/agents"
DEST_DIR=".baton/agents"

# Parse arguments
MODE=""
AGENT_NAME=""

if [ "$1" = "--all" ]; then
    MODE="all"
elif [ "$1" = "--name" ]; then
    if [ -z "$2" ]; then
        echo -e "${RED}Error: --name requires an agent name${NC}"
        echo "Usage: $0 [--all|--name <agent-name>]"
        exit 1
    fi
    MODE="name"
    AGENT_NAME="$2"
else
    echo -e "${BLUE}Usage: $0 [--all|--name <agent-name>]${NC}"
    echo ""
    echo "Options:"
    echo "  --all              Sync all agent files from src/core/agents/ to .baton/agents/"
    echo "  --name <agent-name> Sync specific agent (e.g., 'baton-agent' for baton-agent.md)"
    echo ""
    exit 1
fi

# Function to sync a single agent file
sync_agent() {
    local agent_name="$1"
    local source_file="$SOURCE_DIR/${agent_name}.md"
    local dest_file="$DEST_DIR/${agent_name}.md"
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Agent not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$DEST_DIR"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $agent_name${NC}"
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all agents...${NC}"
    echo ""
    
    # Find all .md files in source directory
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${RED}✗ Source directory not found: $SOURCE_DIR${NC}"
        exit 1
    fi
    
    count=0
    for agent_file in "$SOURCE_DIR"/*.md; do
        if [ -f "$agent_file" ]; then
            agent_name=$(basename "$agent_file" .md)
            sync_agent "$agent_name"
            ((count++))
        fi
    done
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}⚠ No agent files found in $SOURCE_DIR${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $count agent(s)${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing agent: $AGENT_NAME${NC}"
    echo ""
    
    sync_agent "$AGENT_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Agent sync complete!${NC}"
    else
        exit 1
    fi
fi

