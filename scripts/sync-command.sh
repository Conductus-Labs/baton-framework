#!/bin/bash

# sync-command.sh
# Syncs command files from src/core/commands/ to platform-specific command directories
# Usage:
#   --all              : Sync all commands for specified platform
#   --name <command-name>: Sync specific command
#   --ai <platform>   : Platform (cursor|claude|gemini|all) - required

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

# Parse arguments
MODE=""
COMMAND_NAME=""
AI_PLATFORM=""

# Parse all arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            MODE="all"
            shift
            ;;
        --name)
            if [ -z "$2" ]; then
                echo -e "${RED}Error: --name requires a command name${NC}"
                echo "Usage: $0 [--all|--name <command-name>] --ai <cursor|claude|gemini|all>"
                exit 1
            fi
            MODE="name"
            COMMAND_NAME="$2"
            shift 2
            ;;
        --ai)
            if [ -z "$2" ]; then
                echo -e "${RED}Error: --ai requires a platform${NC}"
                echo "Usage: $0 [--all|--name <command-name>] --ai <cursor|claude|gemini|all>"
                exit 1
            fi
            AI_PLATFORM="$2"
            shift 2
            ;;
        *)
            echo -e "${RED}Error: Unknown argument: $1${NC}"
            echo "Usage: $0 [--all|--name <command-name>] --ai <cursor|claude|gemini|all>"
            exit 1
            ;;
    esac
done

# Validate AI platform
if [ -z "$AI_PLATFORM" ]; then
    echo -e "${RED}Error: --ai platform is required${NC}"
    echo "Usage: $0 [--all|--name <command-name>] --ai <cursor|claude|gemini|all>"
    echo ""
    echo "Platforms:"
    echo "  cursor  - Sync Markdown commands to .cursor/commands/baton/"
    echo "  claude  - Sync Markdown commands to .claude/commands/baton/"
    echo "  gemini  - Sync TOML commands to .gemini/commands/baton/"
    echo "  all     - Sync to all platforms"
    exit 1
fi

if [[ ! "$AI_PLATFORM" =~ ^(cursor|claude|gemini|all)$ ]]; then
    echo -e "${RED}Error: Invalid platform '$AI_PLATFORM'${NC}"
    echo "Valid platforms: cursor, claude, gemini, all"
    exit 1
fi

# Source directories
SOURCE_MARKDOWN_DIR="src/core/commands/markdown/baton-agent"
SOURCE_TOML_DIR="src/core/commands/toml/baton-agent"

# Function to sync a command to a specific platform
sync_command_to_platform() {
    local command_name="$1"
    local platform="$2"
    local source_file=""
    local dest_file=""
    
    if [ "$platform" = "cursor" ] || [ "$platform" = "claude" ]; then
        # Markdown commands
        source_file="$SOURCE_MARKDOWN_DIR/${command_name}.md"
        dest_file=".$platform/commands/baton/${command_name}.md"
    elif [ "$platform" = "gemini" ]; then
        # TOML commands
        source_file="$SOURCE_TOML_DIR/${command_name}.toml"
        dest_file=".$platform/commands/baton/${command_name}.toml"
    fi
    
    # Check if source file exists
    if [ ! -f "$source_file" ]; then
        echo -e "${RED}✗ Command not found: $source_file${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest_file")"
    
    # Copy file
    cp "$source_file" "$dest_file"
    echo -e "${GREEN}✓ Synced: $command_name → $platform${NC}"
}

# Function to sync a single command
sync_command() {
    local command_name="$1"
    
    if [ "$AI_PLATFORM" = "all" ]; then
        # Sync to all platforms
        sync_command_to_platform "$command_name" "cursor"
        sync_command_to_platform "$command_name" "claude"
        sync_command_to_platform "$command_name" "gemini"
    else
        # Sync to specific platform
        sync_command_to_platform "$command_name" "$AI_PLATFORM"
    fi
}

# Execute based on mode
if [ "$MODE" = "all" ]; then
    echo -e "${BLUE}🔄 Syncing all commands for platform: $AI_PLATFORM${NC}"
    echo ""
    
    # Find all command files in source directories
    count=0
    
    if [ "$AI_PLATFORM" = "all" ] || [ "$AI_PLATFORM" = "cursor" ] || [ "$AI_PLATFORM" = "claude" ]; then
        # Sync Markdown commands
        if [ -d "$SOURCE_MARKDOWN_DIR" ]; then
            for cmd_file in "$SOURCE_MARKDOWN_DIR"/*.md; do
                if [ -f "$cmd_file" ]; then
                    cmd_name=$(basename "$cmd_file" .md)
                    if [ "$AI_PLATFORM" = "all" ]; then
                        sync_command_to_platform "$cmd_name" "cursor"
                        sync_command_to_platform "$cmd_name" "claude"
                        ((count+=2))
                    else
                        sync_command_to_platform "$cmd_name" "$AI_PLATFORM"
                        ((count++))
                    fi
                fi
            done
        fi
    fi
    
    if [ "$AI_PLATFORM" = "all" ] || [ "$AI_PLATFORM" = "gemini" ]; then
        # Sync TOML commands
        if [ -d "$SOURCE_TOML_DIR" ]; then
            for cmd_file in "$SOURCE_TOML_DIR"/*.toml; do
                if [ -f "$cmd_file" ]; then
                    cmd_name=$(basename "$cmd_file" .toml)
                    if [ "$AI_PLATFORM" = "all" ]; then
                        sync_command_to_platform "$cmd_name" "gemini"
                        ((count++))
                    else
                        sync_command_to_platform "$cmd_name" "$AI_PLATFORM"
                        ((count++))
                    fi
                fi
            done
        fi
    fi
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}⚠ No command files found${NC}"
    else
        echo ""
        echo -e "${GREEN}✅ Synced $count command(s)${NC}"
    fi
    
elif [ "$MODE" = "name" ]; then
    echo -e "${BLUE}🔄 Syncing command: $COMMAND_NAME for platform: $AI_PLATFORM${NC}"
    echo ""
    
    sync_command "$COMMAND_NAME"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Command sync complete!${NC}"
    else
        exit 1
    fi
fi

