#!/bin/bash

# sync-knowledge.sh
# Syncs knowledge files from src/core/knowledge/ to .baton/knowledge/
# Usage:
#   --all              : Sync all knowledge files (all subdirectories)
#   --name <knowledge-name>: Sync specific knowledge file

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
SOURCE_DIR="src/core/knowledge"
DEST_DIR=".baton/knowledge"

# Parse arguments
MODE=""
KNOWLEDGE_NAME=""

if [ "$1" = "--all" ]; then
    MODE="all"
elif [ "$1" = "--name" ]; then
    if [ -z "$2" ]; then
        echo -e "${RED}Error: --name requires a knowledge file name${NC}"
        echo "Usage: $0 [--all|--name <knowledge-name>]"
        echo ""
        echo "Note: Knowledge files may be in subdirectories (anti-patterns/, best-practices/, etc.)"
        echo "      Use format: 'subdirectory/knowledge-name' or just 'knowledge-name' to search all subdirectories"
        exit 1
    fi
    MODE="name"
    KNOWLEDGE_NAME="$2"
else
    echo -e "${BLUE}Usage: $0 [--all|--name <knowledge-name>]${NC}"
    echo ""
    echo "Options:"
    echo "  --all              Sync all knowledge files from src/core/knowledge/ to .baton/knowledge/"
    echo "  --name <knowledge-name> Sync specific knowledge file"
    echo "                      Can include subdirectory: 'anti-patterns/pattern-name'"
    echo "                      Or just name to search all subdirectories: 'pattern-name'"
    echo ""
    exit 1
fi

# Function to sync a single knowledge file
sync_knowledge() {
    local knowledge_path="$1"
    local source_file=""
    local dest_file=""
    
    # Check if path includes subdirectory
    if [[ "$knowledge_path" == */* ]]; then
        # Has subdirectory
        source_file="$SOURCE_DIR/$knowledge_path"
        dest_file="$DEST_DIR/$knowledge_path"
    else
        # Search all subdirectories for the file
        found=false
        for subdir in "$SOURCE_DIR"/*/; do
            if [ -d "$subdir" ]; then
                subdir_name=$(basename "$subdir")
                if [ -f "$subdir${knowledge_path}.md" ]; then
                    source_file="$subdir${knowledge_path}.md"
                    dest_file="$DEST_DIR/$subdir_name/${knowledge_path}.md"
                    found=true
                    break
                fi
            fi
        done
        
        if [ "$found" = false ]; then
            echo -e "${RED}✗ Knowledge file not found: $knowledge_path${NC}"
            echo "  Searched in: $SOURCE_DIR/*/"
            return 1
        fi
    fi
    
    # Ensure it's a .md file
    if [[ ! "$source_file" == *.md ]]; then
        source_file="${source_file}.md"
        dest_file="${dest_file}.md"
    fi
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Knowledge file not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest_file")"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $knowledge_path${NC}"
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all knowledge files...${NC}"
    echo ""
    
    # Check if source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${YELLOW}⚠ Source directory not found: $SOURCE_DIR${NC}"
        echo "  No knowledge files to sync."
        exit 0
    fi
    
    count=0
    # Sync all files from all subdirectories
    for subdir in "$SOURCE_DIR"/*/; do
        if [ -d "$subdir" ]; then
            subdir_name=$(basename "$subdir")
            echo -e "${BLUE}Syncing from $subdir_name/...${NC}"
            
            for knowledge_file in "$subdir"*.md; do
                if [ -f "$knowledge_file" ]; then
                    knowledge_name=$(basename "$knowledge_file" .md)
                    knowledge_path="$subdir_name/$knowledge_name"
                    sync_knowledge "$knowledge_path"
                    ((count++))
                fi
            done
        fi
    done
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}⚠ No knowledge files found in $SOURCE_DIR${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $count knowledge file(s)${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing knowledge file: $KNOWLEDGE_NAME${NC}"
    echo ""
    
    sync_knowledge "$KNOWLEDGE_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Knowledge file sync complete!${NC}"
    else
        exit 1
    fi
fi

