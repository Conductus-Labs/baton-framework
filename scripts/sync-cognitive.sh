#!/bin/bash

# sync-cognitive.sh
# Syncs cognitive pattern files from src/core/cognitive/ to .baton/cognitive/
# Usage:
#   --all              : Sync all cognitive patterns
#   --name <pattern-name>: Sync specific pattern (without .yml extension)

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
SOURCE_DIR="src/core/cognitive"
DEST_DIR=".baton/cognitive"

# Parse arguments
MODE=""
PATTERN_NAME=""

if [ "$1" = "--all" ]; then
    MODE="all"
elif [ "$1" = "--name" ]; then
    if [ -z "$2" ]; then
        echo -e "${RED}Error: --name requires a pattern name${NC}"
        echo "Usage: $0 [--all|--name <pattern-name>]"
        exit 1
    fi
    MODE="name"
    PATTERN_NAME="$2"
else
    echo -e "${BLUE}Usage: $0 [--all|--name <pattern-name>]${NC}"
    echo ""
    echo "Options:"
    echo "  --all              Sync all cognitive pattern files from src/core/cognitive/ to .baton/cognitive/"
    echo "  --name <pattern-name> Sync specific pattern (e.g., 'adaptive-thinking' for adaptive-thinking.yml)"
    echo ""
    exit 1
fi

# Function to sync a single cognitive pattern file
sync_pattern() {
    local pattern_name="$1"
    local source_file="$SOURCE_DIR/${pattern_name}.yml"
    local dest_file="$DEST_DIR/${pattern_name}.yml"
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Pattern not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$DEST_DIR"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $pattern_name${NC}"
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all cognitive patterns...${NC}"
    echo ""
    
    # Find all .yml files in source directory
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${RED}✗ Source directory not found: $SOURCE_DIR${NC}"
        exit 1
    fi
    
    count=0
    for pattern_file in "$SOURCE_DIR"/*.yml; do
        if [ -f "$pattern_file" ]; then
            pattern_name=$(basename "$pattern_file" .yml)
            sync_pattern "$pattern_name"
            ((count++))
        fi
    done
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}⚠ No cognitive pattern files found in $SOURCE_DIR${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $count cognitive pattern(s)${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing cognitive pattern: $PATTERN_NAME${NC}"
    echo ""
    
    sync_pattern "$PATTERN_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Cognitive pattern sync complete!${NC}"
    else
        exit 1
    fi
fi

