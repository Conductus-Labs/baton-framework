#!/bin/bash

# reset-local-baton.sh
# Resets the local .baton directory
# Usage:
#   --full              : Complete reset (delete everything, recreate from core)
#   --pre-project-init : Reset only project files (keeps agent context, workflows, etc.)

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
MANIFEST_FILE="$PROJECT_ROOT/src/config/core-init.json"

# Platform (default to cursor for baton-framework repo)
PLATFORM="${PLATFORM:-cursor}"

# Parse arguments
MODE=""
if [ "$1" = "--full" ]; then
    MODE="full"
elif [ "$1" = "--pre-project-init" ]; then
    MODE="pre-project-init"
else
    echo -e "${BLUE}Usage: $0 [--full|--pre-project-init]${NC}"
    echo ""
    echo "Options:"
    echo "  --full              Complete reset: Delete everything and recreate from core"
    echo "  --pre-project-init  Reset project files only: Reset project.config.md, project.manifest.md,"
    echo "                      and project-boundaries.md to template state (keeps agent context,"
    echo "                      workflows, cognitive patterns, etc.)"
    echo ""
    exit 1
fi

# Change to project root
cd "$PROJECT_ROOT"

# Function to copy a file if source exists (shared by both modes)
copy_file() {
    local source="$1"
    local destination="$2"
    local file_type="${3:-exact_copy}"
    
    # Check if source file exists
    if [ ! -f "$source" ]; then
        echo -e "${RED}✗ Source file not found: $source${NC}"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    local dest_dir=$(dirname "$destination")
    mkdir -p "$dest_dir"
    
    # Copy file
    cp "$source" "$destination"
    
    if [ "$file_type" = "template" ]; then
        echo -e "${GREEN}✓ Copied template: $destination${NC}"
    else
        echo -e "${GREEN}✓ Copied: $destination${NC}"
    fi
}

# Function for full reset
full_reset() {
    echo -e "${BLUE}🔄 Full Reset: Resetting local .baton directory${NC}"
    echo ""

    # Warning and confirmation
    echo -e "${RED}⚠️  WARNING: HARD RESET TO CORE${NC}"
    echo ""
    echo -e "${YELLOW}This script will:${NC}"
    echo "  • Delete ALL files and folders in .baton/"
    echo "  • Delete ALL platform-specific command directories (.cursor/commands/baton, .claude/commands/baton, .gemini/commands/baton)"
    echo "  • Recreate .baton/ from core templates and files"
    echo "  • This is a DESTRUCTIVE operation - all local changes will be lost"
    echo ""
    echo -e "${RED}This will permanently delete:${NC}"
    echo "  • All agent context files"
    echo "  • All project configuration files (project.config.md, project.manifest.md, project-boundaries.md)"
    echo "  • Any custom boundaries or knowledge files"
    echo "  • Any other files in .baton/ directory"
    echo ""
    read -p "$(echo -e ${RED}Are you sure you want to proceed? [y/N]: ${NC})" -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Reset cancelled. No files were modified.${NC}"
        exit 0
    fi

    echo ""
    echo -e "${BLUE}Proceeding with hard reset...${NC}"
    echo ""

    # Step 1: Delete .baton directory
    echo -e "${YELLOW}Step 1: Removing existing .baton directory...${NC}"
    if [ -d ".baton" ]; then
        rm -rf .baton
        echo -e "${GREEN}✓ Deleted .baton directory${NC}"
    else
        echo -e "${YELLOW}⚠ .baton directory does not exist (nothing to delete)${NC}"
    fi

    # Step 2: Delete platform-specific command directories
    echo -e "${YELLOW}Step 2: Removing platform-specific command directories...${NC}"
    for platform in cursor claude gemini; do
        if [ -d ".$platform/commands/baton" ]; then
            rm -rf ".$platform/commands/baton"
            echo -e "${GREEN}✓ Deleted .$platform/commands/baton${NC}"
        fi
    done

    # Step 3: Create directories
    echo ""
    echo -e "${YELLOW}Step 3: Creating directory structure...${NC}"

    # Directories from manifest
    mkdir -p .baton/agents
    mkdir -p .baton/boundaries
    mkdir -p .baton/cognitive
    mkdir -p .baton/context
    mkdir -p .baton/knowledge
    mkdir -p .baton/messages/user-messages/workflows
    mkdir -p .baton/messages/agent-messages
    mkdir -p .baton/workflows/sub-flows
    mkdir -p .cursor/commands/baton
    mkdir -p .claude/commands/baton
    mkdir -p .gemini/commands/baton

    echo -e "${GREEN}✓ Created all directories${NC}"

    # Step 4: Copy files from manifest
    echo ""
    echo -e "${YELLOW}Step 4: Copying files from manifest...${NC}"

    # Check if jq is available
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}✗ jq is required but not found${NC}"
        echo -e "${YELLOW}Please install jq: https://stedolan.github.io/jq/download/${NC}"
        exit 1
    fi

    # Check if JSON manifest exists
    if [ ! -f "$MANIFEST_FILE" ]; then
        echo -e "${RED}✗ Manifest file not found: $MANIFEST_FILE${NC}"
        exit 1
    fi

    # Parse JSON manifest and copy files using jq
    # Temporarily disable exit on error for better error handling
    set +e
    
    files_copied=0
    files_skipped=0

    # Get number of files in manifest
    file_count=$(jq '.files | length' "$MANIFEST_FILE" 2>&1)
    jq_exit_code=$?
    
    if [ $jq_exit_code -ne 0 ] || [ -z "$file_count" ]; then
        echo -e "${RED}✗ Error reading manifest file: $file_count${NC}"
        set -e
        exit 1
    fi
    
    if [ "$file_count" -eq 0 ]; then
        echo -e "${RED}✗ No files found in manifest${NC}"
        set -e
        exit 1
    fi

    echo -e "${BLUE}Found $file_count file(s) in manifest${NC}"

    # Process each file entry using jq to iterate
    # Use a temporary file to avoid process substitution issues on some shells
    temp_file=$(mktemp)
    jq -c '.files[]' "$MANIFEST_FILE" > "$temp_file" 2>&1
    jq_exit=$?
    
    if [ $jq_exit -ne 0 ]; then
        echo -e "${RED}✗ Error extracting files from manifest${NC}"
        cat "$temp_file"
        rm -f "$temp_file"
        set -e
        exit 1
    fi

    # Process each line from temp file
    while IFS= read -r file_entry || [ -n "$file_entry" ]; do
        # Skip empty lines
        [ -z "$file_entry" ] && continue
        
        # Parse JSON entry
        source_file=$(echo "$file_entry" | jq -r '.source // empty' 2>/dev/null)
        dest_file=$(echo "$file_entry" | jq -r '.destination // empty' 2>/dev/null)
        file_type=$(echo "$file_entry" | jq -r '.type // "exact_copy"' 2>/dev/null)
        file_platform=$(echo "$file_entry" | jq -r '.platform // ""' 2>/dev/null)
        
        # Skip if jq parsing failed
        if [ -z "$source_file" ] || [ -z "$dest_file" ] || [ "$source_file" = "null" ] || [ "$dest_file" = "null" ]; then
            echo -e "${YELLOW}⚠ Skipping invalid entry${NC}"
            files_skipped=$((files_skipped + 1))
            continue
        fi

        # Skip template files (handled separately)
        if [ "$file_type" = "template" ]; then
            continue
        fi

        # Check platform match
        if [ -n "$file_platform" ] && [ "$file_platform" != "$PLATFORM" ] && [ "$PLATFORM" != "all" ]; then
            continue
        fi

        # Check if source file exists
        if [ -f "$source_file" ]; then
            if copy_file "$source_file" "$dest_file" "$file_type"; then
                files_copied=$((files_copied + 1))
            else
                files_skipped=$((files_skipped + 1))
            fi
        else
            echo -e "${YELLOW}⚠ Skipping (not found): $source_file${NC}"
            files_skipped=$((files_skipped + 1))
        fi
    done < "$temp_file"
    
    # Clean up temp file
    rm -f "$temp_file"

    # Re-enable exit on error
    set -e

    echo ""
    echo -e "${GREEN}✅ Copied $files_copied file(s) from manifest${NC}"
    if [ $files_skipped -gt 0 ]; then
        echo -e "${YELLOW}⚠ Skipped $files_skipped file(s)${NC}"
    fi

    # Template files (with placeholders) - these are not in manifest as exact_copy
    echo ""
    echo -e "${YELLOW}Copying template files...${NC}"

# Template files (with placeholders)
copy_file "src/core/templates/project-file-templates/project.config-template.yml" ".baton/project.config.md" "template"
copy_file "src/core/templates/project-file-templates/project-manifest-template.md" ".baton/project.manifest.md" "template"
copy_file "src/core/templates/boundaries-templates/project-boundaries-template.md" ".baton/boundaries/project-boundaries.md" "template"

    # Step 5: Verification
    echo ""
    echo -e "${YELLOW}Step 5: Verifying installation...${NC}"

    # Count files
    agent_count=$(find .baton/agents -type f 2>/dev/null | wc -l)
    workflow_count=$(find .baton/workflows -name "*.yml" -type f 2>/dev/null | wc -l)
    cognitive_count=$(find .baton/cognitive -name "*.yml" -type f 2>/dev/null | wc -l)
    command_count=$(find .cursor/commands/baton -type f 2>/dev/null | wc -l)
    template_count=$(find .baton -name "project.config.md" -o -name "project.manifest.md" -o -name "project-boundaries.md" 2>/dev/null | wc -l)

    echo -e "${GREEN}✓ Agent files: $agent_count${NC}"
    echo -e "${GREEN}✓ Workflow files: $workflow_count${NC}"
    echo -e "${GREEN}✓ Cognitive pattern files: $cognitive_count${NC}"
    echo -e "${GREEN}✓ Command files (Cursor): $command_count${NC}"
    echo -e "${GREEN}✓ Template files: $template_count${NC}"

    echo ""
    echo -e "${GREEN}✅ Full reset complete!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. Run /init-baton-agent to initialize baton-agent"
    echo "  2. Run /project-init to initialize project configuration"
    echo ""
}

# Function for pre-project-init reset
pre_project_init_reset() {
    echo -e "${BLUE}🔄 Pre-Project-Init Reset: Resetting project configuration files${NC}"
    echo ""

    # Warning and confirmation
    echo -e "${YELLOW}This will reset project configuration files to template state:${NC}"
    echo "  • .baton/project.config.md → template with placeholders"
    echo "  • .baton/project.manifest.md → template with placeholders"
    echo "  • .baton/boundaries/project-boundaries.md → template with placeholders"
    echo ""
    echo -e "${GREEN}This will KEEP:${NC}"
    echo "  • Agent context files (.baton/context/)"
    echo "  • Agent definitions (.baton/agents/)"
    echo "  • Workflows and sub-flows (.baton/workflows/)"
    echo "  • Cognitive patterns (.baton/cognitive/)"
    echo "  • Knowledge files (.baton/knowledge/)"
    echo "  • Command files (.cursor/commands/baton/, etc.)"
    echo ""
    read -p "$(echo -e ${YELLOW}Are you sure you want to proceed? [y/N]: ${NC})" -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Reset cancelled. No files were modified.${NC}"
        exit 0
    fi

    echo ""
    echo -e "${BLUE}Proceeding with project files reset...${NC}"
    echo ""

    # Step 1: Reset project configuration files
    echo -e "${YELLOW}Step 1: Resetting project configuration files...${NC}"
    
    copy_file "src/core/templates/project-file-templates/project.config-template.yml" ".baton/project.config.md" "template"
    copy_file "src/core/templates/project-file-templates/project-manifest-template.md" ".baton/project.manifest.md" "template"
    copy_file "src/core/templates/boundaries-templates/project-boundaries-template.md" ".baton/boundaries/project-boundaries.md" "template"

    echo ""
    echo -e "${GREEN}✅ Project files reset complete!${NC}"
    echo ""
    echo -e "${BLUE}Note:${NC} Agent context files were preserved. The baton-agent is still initialized."
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. Run /project-init to initialize project configuration with your values"
    echo ""
}

# Execute based on mode
if [ "$MODE" = "full" ]; then
    full_reset
elif [ "$MODE" = "pre-project-init" ]; then
    pre_project_init_reset
fi

