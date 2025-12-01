---
version: 1.0.0
tool_name: git
tool_type: cli-tool
purpose: Distributed version control system for tracking changes in source code
created: 2025-11-26
last_updated: 2025-11-26
official_sources:
  - https://git-scm.com/docs
  - https://git-scm.com/book
  - https://git-scm.com/docs/git
---

# Git CLI - Knowledge Reference

## Quick Reference

### Common Commands

```bash
# Initialize a repository
git init

# Clone a repository
git clone <url>

# Check status
git status

# Add files to staging
git add <file>
git add .

# Commit changes
git commit -m "Commit message"

# View commit history
git log

# Create a branch
git branch <branch-name>
git checkout -b <branch-name>

# Switch branches
git checkout <branch-name>
git switch <branch-name>

# Merge branches
git merge <branch-name>

# Push to remote
git push origin <branch-name>

# Pull from remote
git pull origin <branch-name>

# Fetch from remote
git fetch origin
```

### Common Patterns

```bash
# Workflow: Create feature branch and push
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature

# Workflow: Update from remote
git fetch origin
git merge origin/main
# or
git pull origin main

# Workflow: Undo changes
git restore <file>           # Discard working directory changes
git restore --staged <file>  # Unstage file
git reset HEAD~1             # Undo last commit (keep changes)

# Workflow: View differences
git diff                     # Working directory vs staging
git diff --staged            # Staging vs last commit
git diff HEAD                # Working directory vs last commit
```

### Quick Lookup

| Task            | Command/Pattern                        |
| --------------- | -------------------------------------- |
| Initialize repo | `git init`                             |
| Clone repo      | `git clone <url>`                      |
| Check status    | `git status`                           |
| Stage file      | `git add <file>`                       |
| Commit          | `git commit -m "message"`              |
| View log        | `git log`                              |
| Create branch   | `git checkout -b <branch>`             |
| Switch branch   | `git checkout <branch>`                |
| Merge branch    | `git merge <branch>`                   |
| Rebase branch   | `git rebase <branch>`                  |
| Push            | `git push origin <branch>`             |
| Pull            | `git pull origin <branch>`             |
| Fetch           | `git fetch origin`                     |
| Discard changes | `git restore <file>`                   |
| View diff       | `git diff`                             |
| Stash changes   | `git stash`                            |
| Apply stash     | `git stash pop`                        |
| Create tag      | `git tag v1.0.0`                       |
| Cherry-pick     | `git cherry-pick <commit>`             |
| Show commit     | `git show <commit>`                    |
| Blame file      | `git blame <file>`                     |
| Config user     | `git config --global user.name "Name"` |
| Add submodule   | `git submodule add <url>`              |

## Detailed Usage

### Repository Setup

**Initialize Repository:**

```bash
git init [directory-name]
```

**Description:** Creates a new Git repository in the current directory or specified directory.

**Options:**

- `--bare`: Create a bare repository (no working directory)
- `--template=<template-directory>`: Use template directory

**Examples:**

```bash
# Initialize in current directory
git init

# Initialize in specific directory
git init my-project

# Initialize bare repository
git init --bare my-repo.git
```

**Clone Repository:**

```bash
git clone <repository-url> [directory-name]
```

**Description:** Clones a remote repository to local machine.

**Options:**

- `--branch <branch>`: Clone specific branch
- `--depth <depth>`: Shallow clone (limited history)
- `--recursive`: Clone submodules recursively

**Examples:**

```bash
# Clone repository
git clone https://github.com/owner/repo.git

# Clone to specific directory
git clone https://github.com/owner/repo.git my-project

# Clone specific branch
git clone --branch develop https://github.com/owner/repo.git

# Shallow clone (last 10 commits)
git clone --depth 10 https://github.com/owner/repo.git
```

### Basic Workflow

**Check Status:**

```bash
git status
```

**Description:** Shows the state of the working directory and staging area.

**Options:**

- `--short`: Short format output
- `--branch`: Show branch information
- `--porcelain`: Machine-readable output

**Add Files:**

```bash
git add <file>
git add <directory>
git add .
```

**Description:** Stages files for commit.

**Options:**

- `-A` or `--all`: Stage all changes
- `-u` or `--update`: Stage only tracked files
- `-p` or `--patch`: Interactive staging
- `--dry-run`: Show what would be staged

**Examples:**

```bash
# Stage specific file
git add README.md

# Stage all files in directory
git add src/

# Stage all changes
git add .

# Interactive staging
git add -p
```

**Commit Changes:**

```bash
git commit -m "Commit message"
```

**Description:** Records changes to the repository.

**Options:**

- `-m <message>`: Commit message
- `-a` or `--all`: Commit all tracked files (skip staging)
- `--amend`: Amend previous commit
- `--no-verify`: Skip hooks

**Examples:**

```bash
# Basic commit
git commit -m "Add new feature"

# Commit all tracked files
git commit -a -m "Update files"

# Amend previous commit
git commit --amend -m "Updated message"

# Commit with detailed message
git commit -m "Title" -m "Detailed description"
```

### Branching and Merging

**Create Branch:**

```bash
git branch <branch-name>
git checkout -b <branch-name>
git switch -c <branch-name>
```

**Description:** Creates a new branch.

**Examples:**

```bash
# Create branch
git branch feature/new-feature

# Create and switch to branch
git checkout -b feature/new-feature

# Modern alternative (Git 2.23+)
git switch -c feature/new-feature
```

**Switch Branches:**

```bash
git checkout <branch-name>
git switch <branch-name>
```

**Description:** Switches to a different branch.

**Examples:**

```bash
# Switch branch
git checkout main

# Modern alternative
git switch main

# Create and switch
git switch -c new-branch
```

**List Branches:**

```bash
git branch
git branch -a  # All branches (including remote)
git branch -r  # Remote branches only
```

**Merge Branches:**

```bash
git merge <branch-name>
```

**Description:** Merges changes from another branch into current branch.

**Options:**

- `--no-ff`: Create merge commit even if fast-forward possible
- `--squash`: Squash commits into single commit
- `--abort`: Abort merge in progress

**Examples:**

```bash
# Merge branch
git merge feature/new-feature

# Merge with no fast-forward
git merge --no-ff feature/new-feature

# Squash merge
git merge --squash feature/new-feature
```

### Remote Operations

**Add Remote:**

```bash
git remote add <name> <url>
```

**Description:** Adds a remote repository.

**Examples:**

```bash
# Add remote
git remote add origin https://github.com/owner/repo.git

# Add multiple remotes
git remote add upstream https://github.com/original/repo.git
```

**Push to Remote:**

```bash
git push <remote> <branch>
```

**Description:** Pushes commits to remote repository.

**Options:**

- `-u` or `--set-upstream`: Set upstream tracking
- `--force` or `--force-with-lease`: Force push (use with caution)
- `--tags`: Push tags

**Examples:**

```bash
# Push to remote
git push origin main

# Push and set upstream
git push -u origin feature/new-feature

# Push all branches
git push --all origin

# Push tags
git push --tags origin
```

**Pull from Remote:**

```bash
git pull <remote> <branch>
```

**Description:** Fetches and merges changes from remote.

**Options:**

- `--rebase`: Rebase instead of merge
- `--ff-only`: Only fast-forward

**Examples:**

```bash
# Pull from remote
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

**Fetch from Remote:**

```bash
git fetch <remote>
```

**Description:** Downloads changes from remote without merging.

**Examples:**

```bash
# Fetch all remotes
git fetch

# Fetch specific remote
git fetch origin

# Fetch specific branch
git fetch origin main
```

### Viewing History and Changes

**View Commit History:**

```bash
git log
```

**Options:**

- `--oneline`: One line per commit
- `--graph`: Show branch graph
- `--all`: Show all branches
- `--decorate`: Show refs
- `-n <number>`: Limit number of commits
- `--since=<date>`: Show commits since date
- `--author=<name>`: Filter by author

**Examples:**

```bash
# Basic log
git log

# One line format
git log --oneline

# Graph view
git log --oneline --graph --all --decorate

# Last 10 commits
git log -10

# Since date
git log --since="2024-01-01"
```

**View Differences:**

```bash
git diff
```

**Description:** Shows differences between working directory, staging area, and commits.

**Options:**

- `--staged` or `--cached`: Show staged changes
- `HEAD`: Compare with last commit
- `<commit1> <commit2>`: Compare two commits
- `--stat`: Show statistics

**Examples:**

```bash
# Working directory vs staging
git diff

# Staging vs last commit
git diff --staged

# Working directory vs last commit
git diff HEAD

# Compare commits
git diff commit1 commit2

# Statistics
git diff --stat
```

### Undoing Changes

**Discard Working Directory Changes:**

```bash
git restore <file>
```

**Description:** Restores file to last committed state.

**Examples:**

```bash
# Discard changes to file
git restore README.md

# Discard all changes
git restore .

# Unstage file
git restore --staged <file>
```

**Reset Commits:**

```bash
git reset [mode] [commit]
```

**Description:** Moves HEAD and optionally index and working directory.

**Modes:**

- `--soft`: Keep changes staged
- `--mixed` (default): Keep changes in working directory
- `--hard`: Discard all changes

**Examples:**

```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard <commit-hash>
```

**Revert Commit:**

```bash
git revert <commit>
```

**Description:** Creates a new commit that undoes changes from specified commit.

**Examples:**

```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert <commit-hash>
```

### Advanced Operations

**Rebase:**

```bash
git rebase <branch>
git rebase -i <commit>
```

**Description:** Reapplies commits on top of another base tip, creating a linear history.

**Options:**

- `-i` or `--interactive`: Interactive rebase (edit, reorder, squash commits)
- `--abort`: Abort rebase in progress
- `--continue`: Continue rebase after resolving conflicts
- `--skip`: Skip current commit

**Examples:**

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Abort rebase
git rebase --abort

# Continue after resolving conflicts
git rebase --continue
```

**Stash:**

```bash
git stash
git stash list
git stash pop
git stash apply
```

**Description:** Temporarily saves uncommitted changes.

**Options:**

- `save <message>`: Save with message
- `list`: List all stashes
- `pop`: Apply and remove most recent stash
- `apply`: Apply stash but keep it in list
- `drop`: Delete stash
- `clear`: Delete all stashes

**Examples:**

```bash
# Save current changes
git stash

# Save with message
git stash save "WIP: feature in progress"

# List stashes
git stash list

# Apply and remove most recent stash
git stash pop

# Apply but keep stash
git stash apply

# Apply specific stash
git stash apply stash@{1}
```

**Tags:**

```bash
git tag <name>
git tag -a <name> -m "Message"
git push --tags
```

**Description:** Creates tags to mark specific points in history (typically releases).

**Options:**

- `-a`: Create annotated tag
- `-m <message>`: Tag message
- `-d <name>`: Delete tag
- `-l <pattern>`: List tags matching pattern

**Examples:**

```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# List tags
git tag

# Push tags to remote
git push --tags

# Delete tag
git tag -d v1.0.0
```

**Cherry-pick:**

```bash
git cherry-pick <commit>
```

**Description:** Applies changes from specific commit(s) to current branch.

**Options:**

- `-n` or `--no-commit`: Apply changes without committing
- `-x`: Append commit message with original commit hash
- `--abort`: Abort cherry-pick

**Examples:**

```bash
# Cherry-pick single commit
git cherry-pick <commit-hash>

# Cherry-pick range
git cherry-pick <commit1>..<commit2>

# Cherry-pick without committing
git cherry-pick -n <commit-hash>
```

**Show:**

```bash
git show <commit>
```

**Description:** Shows commit details including changes.

**Options:**

- `<commit>`: Commit hash, branch, or tag
- `--stat`: Show statistics
- `--name-only`: Show only file names

**Examples:**

```bash
# Show last commit
git show

# Show specific commit
git show <commit-hash>

# Show with statistics
git show --stat <commit-hash>
```

**Blame:**

```bash
git blame <file>
```

**Description:** Shows who last modified each line of a file.

**Options:**

- `-L <start>,<end>`: Show specific line range
- `-w`: Ignore whitespace changes
- `-M`: Detect moved lines

**Examples:**

```bash
# Blame entire file
git blame README.md

# Blame specific lines
git blame -L 10,20 README.md
```

**Configuration:**

```bash
git config --global user.name "Name"
git config --global user.email "email@example.com"
git config --list
```

**Description:** Configure Git settings.

**Options:**

- `--global`: Set for current user (all repositories)
- `--local`: Set for current repository (default)
- `--system`: Set for all users
- `--list`: List all settings
- `--get <key>`: Get specific setting
- `--unset <key>`: Remove setting

**Examples:**

```bash
# Set user name and email
git config --global user.name "John Doe"
git config --global user.email "john@example.com"

# Set editor
git config --global core.editor "code --wait"

# List all settings
git config --list

# Get specific setting
git config --get user.name

# Set alias
git config --global alias.st status
git config --global alias.co checkout
```

**Submodules:**

```bash
git submodule add <url> <path>
git submodule update
git submodule init
```

**Description:** Include one Git repository as a subdirectory of another.

**Options:**

- `add <url> <path>`: Add submodule
- `init`: Initialize submodules
- `update`: Update submodules
- `sync`: Synchronize submodule URLs

**Examples:**

```bash
# Add submodule
git submodule add https://github.com/owner/repo.git libs/repo

# Initialize submodules (after clone)
git submodule init

# Update submodules
git submodule update

# Clone repository with submodules
git clone --recursive <url>

# Update submodules to latest
git submodule update --remote
```

## Version Compatibility

**Minimum Git Version:** 2.23.0

**Version-Specific Features:**

- `git restore` and `git switch`: Git 2.23.0+
- `git switch -c`: Git 2.23.0+
- Older versions use `git checkout` for both switching and creating branches

**Checking Version:**

```bash
git --version
```

**Recommendation:** Use Git 2.30.0 or later for best compatibility and security features.

## Troubleshooting

### Common Errors and Solutions

**Merge Conflicts:**

```bash
# Check status to see conflicted files
git status

# Resolve conflicts in files, then:
git add <resolved-file>
git commit

# Or abort merge
git merge --abort
```

**Detached HEAD:**

```bash
# Create branch from detached HEAD
git checkout -b new-branch

# Or return to branch
git checkout main
```

**Push Rejected:**

```bash
# Remote has changes you don't have
git pull origin main
# Resolve conflicts if any
git push origin main
```

**Accidentally Committed to Wrong Branch:**

```bash
# Move last commit to correct branch
git reset HEAD~1
git checkout correct-branch
git cherry-pick <commit-hash>
```

**Lost Commit:**

```bash
# Use reflog to find lost commit
git reflog
# Recover using commit hash
git checkout <commit-hash>
git checkout -b recovered-branch
```

**Large File in History:**

```bash
# Remove file from history (use with caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch large-file" \
  --prune-empty --tag-name-filter cat -- --all
```

## Best Practices for AI Agents

### Commit Messages

- Use clear, descriptive commit messages
- Follow conventional commit format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep first line under 50 characters
- Add detailed description if needed (separate with blank line)

### Branch Management

- Use descriptive branch names: `feature/`, `bugfix/`, `hotfix/`
- Keep branches focused on single feature or fix
- Delete merged branches to keep repository clean
- Use `git branch -d` for safe delete, `-D` for force delete

### Workflow Patterns

- Always pull latest changes before starting work: `git pull origin main`
- Create feature branches from main/master: `git checkout -b feature/name`
- Commit frequently with meaningful messages
- Push branches regularly: `git push -u origin feature/name`
- Use `git fetch` to check for updates without merging

### Error Handling

- Check repository status before operations: `git status`
- Verify branch exists before switching: `git branch -a`
- Handle merge conflicts gracefully
- Use `--dry-run` flags when available to preview changes
- Always verify remote URLs before pushing

### Performance Optimization

- Use shallow clones for large repositories: `git clone --depth 1`
- Use `git fetch` instead of `git pull` when you only need to check updates
- Limit log output: `git log -n 10` instead of full history
- Use `--stat` for summary instead of full diff when possible

### Anti-Patterns to Avoid

**❌ Don't:**

```bash
# Committing everything without review
git add .
git commit -m "changes"

# Force pushing to shared branches
git push --force origin main

# Not pulling before pushing
git push origin feature  # May fail if remote has updates

# Vague commit messages
git commit -m "fix"
git commit -m "update"

# Working directly on main/master
git checkout main
# Make changes and commit directly
```

**✅ Do:**

```bash
# Review changes before committing
git status
git diff
git add specific-files
git commit -m "feat: add user authentication"

# Use force-with-lease for safety
git push --force-with-lease origin feature

# Pull before pushing
git pull origin main
git push origin feature

# Descriptive commit messages
git commit -m "fix(auth): resolve token expiration issue"
git commit -m "feat(api): add user profile endpoint"

# Work on feature branches
git checkout -b feature/user-auth
# Make changes
git commit -m "feat: add authentication"
git push -u origin feature/user-auth
```

**Why:** Force pushing can overwrite others' work. Vague messages make history useless. Working on main causes conflicts. Always pull before push to avoid conflicts.

## Related Knowledge Files

- `github-cli.md` - GitHub CLI for repository management
- `github-api.md` - GitHub REST API for programmatic access

## Notes

- Git is a distributed version control system - every clone is a full repository
- Use `.gitignore` to exclude files from version control
- Git tracks content, not files - moving/renaming is detected automatically
- Use `git config` to set user name, email, and other preferences
- Hooks (`.git/hooks/`) can automate tasks on commit, push, etc.
- Use `git stash` to temporarily save uncommitted changes
- Tags mark specific points in history: `git tag v1.0.0`
- Submodules allow including other repositories: `git submodule add <url>`
- Always verify you're on the correct branch before committing
- Use `git reflog` to recover "lost" commits
- `git restore` requires Git 2.23.0+ (use `git checkout` on older versions)
