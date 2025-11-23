#!/bin/bash

# sync-messages.sh
# Syncs message template files from src/core/templates/message-templates/ to .baton/messages/
# Usage:
#   --all              : Sync all message templates
#   --name <message-name>: Sync specific message file (with path relative to message-templates/)

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
SOURCE_DIR="src/core/templates/message-templates"
DEST_DIR=".baton/messages"

# Parse arguments
MODE=""
MESSAGE_PATH=""

if [ "$1" = "--all" ]; then
    MODE="all"
elif [ "$1" = "--name" ]; then
    if [ -z "$2" ]; then
        echo -e "${RED}Error: --name requires a message path${NC}"
        echo "Usage: $0 [--all|--name <message-path>]"
        echo ""
        echo "Examples:"
        echo "  --name user-messages/workflows/project-initialisation/step-4-hitl-checkpoint.md"
        echo "  --name user-messages/workflows/agent-initialisation/step-8-confirmation-initialized.md"
        exit 1
    fi
    MODE="name"
    MESSAGE_PATH="$2"
else
    echo -e "${BLUE}Usage: $0 [--all|--name <message-path>]${NC}"
    echo ""
    echo "Options:"
    echo "  --all              Sync all message template files from src/core/templates/message-templates/ to .baton/messages/"
    echo "  --name <message-path> Sync specific message file"
    echo "                      Path should be relative to message-templates/ directory"
    echo "                      Example: user-messages/workflows/project-initialisation/step-4-hitl-checkpoint.md"
    echo ""
    exit 1
fi

# Function to sync a single message file
sync_message() {
    local message_path="$1"
    local source_file="$SOURCE_DIR/$message_path"
    local dest_file="$DEST_DIR/$message_path"
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Message file not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest_file")"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $message_path${NC}"
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all message templates...${NC}"
    echo ""
    
    # Check if source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${RED}✗ Source directory not found: $SOURCE_DIR${NC}"
        exit 1
    fi
    
    count=0
    # Find all .md files in source directory (recursively)
    while IFS= read -r -d '' message_file; do
        # Get relative path from source directory
        rel_path="${message_file#$SOURCE_DIR/}"
        sync_message "$rel_path"
        ((count++))
    done < <(find "$SOURCE_DIR" -name "*.md" -type f -print0)
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}⚠ No message template files found in $SOURCE_DIR${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $count message template(s)${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing message: $MESSAGE_PATH${NC}"
    echo ""
    
    sync_message "$MESSAGE_PATH"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Message sync complete!${NC}"
    else
        exit 1
    fi
fi

