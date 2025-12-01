---
version: 1.0.0
tool_name: github-cli
tool_type: cli-tool
purpose: Command-line interface to GitHub for terminal and script automation
created: 2025-11-26
last_updated: 2025-11-26
official_sources:
  - https://cli.github.com/manual/
  - https://github.com/cli/cli
---

# GitHub CLI - Knowledge Reference

## Quick Reference

### Common Commands

```bash
# Authenticate with GitHub
gh auth login

# View repository in browser
gh browse

# Create an issue
gh issue create --title "Title" --body "Description"

# Clone a repository
gh repo clone owner/repo

# Create a pull request
gh pr create --title "Title" --body "Description"

# Checkout a pull request by number
gh pr checkout 123

# List pull requests
gh pr list

# View pull request details
gh pr view 123

# Create a repository
gh repo create my-repo --public

# List repositories
gh repo list

# Create a release
gh release create v1.0.0 --title "Release Title" --notes "Release notes"
```

### Common Patterns

```bash
# Workflow: Create issue and open in browser
gh issue create --title "Bug: Description" --body "Details" --web

# Workflow: Create PR from current branch
gh pr create --title "Feature: Description" --body "Details" --draft

# Workflow: Check status of CI/CD
gh run list
gh run view <run-id>

# Workflow: Manage secrets
gh secret set MY_SECRET --body "value"
gh secret list

# Workflow: Execute GitHub API calls
gh api repos/owner/repo/issues --method POST --field title="Title" --field body="Body"
```

### Quick Lookup

|Task|Command/Pattern|
|Authenticate|`gh auth login`|
|Clone repo|`gh repo clone owner/repo`|
|Create issue|`gh issue create --title "Title" --body "Body"`|
|List issues|`gh issue list`|
|Create PR|`gh pr create --title "Title" --body "Body"`|
|List PRs|`gh pr list`|
|Checkout PR|`gh pr checkout <number>`|
|View PR|`gh pr view <number>`|
|Create repo|`gh repo create <name> --public/--private`|
|List repos|`gh repo list`|
|Create release|`gh release create <tag> --title "Title"`|
|View in browser|`gh browse`|
|Run API call|`gh api <endpoint> --method <method>`|
|Create gist|`gh gist create <file> --public`|
|List gists|`gh gist list`|
|Install extension|`gh extension install <extension>`|
|Set alias|`gh alias set <alias> <command>`|
|List notifications|`gh notification list`|

## Detailed Usage

### Authentication

**Description:** Authenticate with GitHub to enable CLI operations

**Syntax:**

```bash
gh auth login [flags]
```

**Options:**

- `--hostname <hostname>`: GitHub hostname (for GitHub Enterprise)
- `--git-protocol <protocol>`: Protocol to use for git operations (https/ssh)
- `--web`: Authenticate via web browser
- `--with-token`: Read token from standard input

**Examples:**

```bash
# Interactive authentication
gh auth login

# Authenticate with GitHub Enterprise
gh auth login --hostname github.example.com

# Authenticate with token from stdin
echo "token" | gh auth login --with-token
```

### Repository Operations

**Description:** Manage GitHub repositories from the command line

**Syntax:**

```bash
gh repo <command> [flags]
```

**Common Commands:**

- `gh repo clone <owner/repo>`: Clone a repository
- `gh repo create <name>`: Create a new repository
- `gh repo list`: List repositories
- `gh repo view <owner/repo>`: View repository details
- `gh repo fork <owner/repo>`: Fork a repository

**Examples:**

```bash
# Clone a repository
gh repo clone github/cli

# Create a public repository
gh repo create my-project --public --description "My project"

# Create a private repository
gh repo create my-project --private

# Fork a repository
gh repo fork owner/repo
```

### Issue Management

**Description:** Create, view, and manage GitHub issues

**Syntax:**

```bash
gh issue <command> [flags]
```

**Common Commands:**

- `gh issue create`: Create a new issue
- `gh issue list`: List issues
- `gh issue view <number>`: View issue details
- `gh issue close <number>`: Close an issue
- `gh issue reopen <number>`: Reopen a closed issue

**Options:**

- `--title <title>`: Issue title
- `--body <body>`: Issue body/description
- `--label <label>`: Add label(s)
- `--assignee <user>`: Assign to user
- `--web`: Open in browser

**Examples:**

```bash
# Create an issue
gh issue create --title "Bug: Description" --body "Details"

# Create issue with label and assignee
gh issue create --title "Feature" --body "Details" --label "enhancement" --assignee @me

# List open issues
gh issue list --state open

# View issue in browser
gh issue view 123 --web
```

### Pull Request Operations

**Description:** Create, view, and manage pull requests

**Syntax:**

```bash
gh pr <command> [flags]
```

**Common Commands:**

- `gh pr create`: Create a pull request
- `gh pr list`: List pull requests
- `gh pr view <number>`: View pull request details
- `gh pr checkout <number>`: Checkout PR branch locally
- `gh pr merge <number>`: Merge a pull request
- `gh pr close <number>`: Close a pull request

**Options:**

- `--title <title>`: PR title
- `--body <body>`: PR description
- `--base <branch>`: Base branch
- `--head <branch>`: Head branch
- `--draft`: Create as draft PR
- `--web`: Open in browser

**Examples:**

```bash
# Create a pull request
gh pr create --title "Feature: Description" --body "Details"

# Create draft PR
gh pr create --title "WIP: Feature" --draft

# Checkout PR locally
gh pr checkout 123

# Merge PR
gh pr merge 123 --squash

# View PR in browser
gh pr view 123 --web
```

### GitHub Actions

**Description:** Interact with GitHub Actions workflows and runs

**Syntax:**

```bash
gh run <command> [flags]
gh workflow <command> [flags]
```

**Common Commands:**

- `gh run list`: List workflow runs
- `gh run view <run-id>`: View workflow run details
- `gh run watch <run-id>`: Watch workflow run progress
- `gh workflow list`: List workflows
- `gh workflow view <workflow>`: View workflow details
- `gh workflow run <workflow>`: Trigger a workflow

**Examples:**

```bash
# List recent workflow runs
gh run list

# View workflow run details
gh run view <run-id>

# Watch workflow run
gh run watch <run-id>

# Trigger a workflow
gh workflow run "CI.yml" --ref main
```

### API Access

**Description:** Execute GitHub API calls directly from CLI

**Syntax:**

```bash
gh api <endpoint> [flags]
```

**Options:**

- `--method <method>`: HTTP method (GET, POST, PUT, DELETE, PATCH)
- `--field <key=value>`: Add field to request body
- `--raw-field <key=value>`: Add raw field (JSON)
- `--header <header>`: Add custom header
- `--jq <query>`: Filter response with jq

**Examples:**

```bash
# GET request
gh api repos/owner/repo

# POST request with fields
gh api repos/owner/repo/issues --method POST \
  --field title="New Issue" \
  --field body="Description"

# POST with JSON body
gh api repos/owner/repo/issues --method POST \
  --raw-field '{"title":"Issue","body":"Description"}'

# Filter response with jq
gh api repos/owner/repo/issues --jq '.[] | .title'
```

### Secrets Management

**Description:** Manage repository and organization secrets

**Syntax:**

```bash
gh secret <command> [flags]
```

**Common Commands:**

- `gh secret set <name>`: Set a secret value
- `gh secret list`: List secrets
- `gh secret delete <name>`: Delete a secret

**Examples:**

```bash
# Set a secret
gh secret set MY_SECRET --body "secret-value"

# List secrets
gh secret list

# Delete a secret
gh secret delete MY_SECRET
```

### Releases

**Description:** Create and manage GitHub releases

**Syntax:**

```bash
gh release <command> [flags]
```

**Common Commands:**

- `gh release create <tag>`: Create a release
- `gh release list`: List releases
- `gh release view <tag>`: View release details
- `gh release upload <tag> <file>`: Upload asset to release
- `gh release delete <tag>`: Delete a release

**Options:**

- `--title <title>`: Release title
- `--notes <notes>`: Release notes
- `--notes-file <file>`: Release notes from file
- `--draft`: Create as draft
- `--prerelease`: Mark as prerelease
- `--target <branch>`: Target branch

**Examples:**

```bash
# Create release
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes"

# Create draft release
gh release create v1.0.0 --draft --title "Draft Release"

# Upload asset
gh release upload v1.0.0 dist/app.zip

# List releases
gh release list

# View release
gh release view v1.0.0
```

### Gists

**Description:** Create and manage GitHub Gists (code snippets)

**Syntax:**

```bash
gh gist <command> [flags]
```

**Common Commands:**

- `gh gist create <file>`: Create a gist
- `gh gist list`: List your gists
- `gh gist view <id>`: View gist
- `gh gist edit <id>`: Edit gist
- `gh gist delete <id>`: Delete gist

**Options:**

- `--public`: Make gist public
- `--secret`: Make gist secret (default)
- `--desc <description>`: Gist description
- `--web`: Open in browser

**Examples:**

```bash
# Create public gist
gh gist create script.sh --public --desc "My script"

# Create secret gist from file
gh gist create config.json

# List gists
gh gist list

# View gist
gh gist view <gist-id>

# Edit gist
gh gist edit <gist-id>
```

### Extensions

**Description:** Install and manage GitHub CLI extensions

**Syntax:**

```bash
gh extension <command> [flags]
```

**Common Commands:**

- `gh extension install <extension>`: Install extension
- `gh extension list`: List installed extensions
- `gh extension upgrade <extension>`: Upgrade extension
- `gh extension remove <extension>`: Remove extension

**Popular Extensions:**

- `gh pr checkout`: Enhanced PR checkout (built-in)
- `gh copilot`: GitHub Copilot CLI integration
- `gh-dash`: Dashboard for GitHub CLI

**Examples:**

```bash
# Install extension
gh extension install owner/extension-name

# List extensions
gh extension list

# Upgrade extension
gh extension upgrade extension-name

# Remove extension
gh extension remove extension-name
```

### Aliases

**Description:** Create custom command aliases

**Syntax:**

```bash
gh alias set <alias> <command>
gh alias list
gh alias delete <alias>
```

**Examples:**

```bash
# Create alias
gh alias set prc "pr create"
gh alias set prl "pr list"
gh alias set ic "issue create"

# Use alias
gh prc --title "Title" --body "Body"

# List aliases
gh alias list

# Delete alias
gh alias delete prc
```

### Configuration

**Description:** Configure GitHub CLI settings

**Syntax:**

```bash
gh config set <key> <value>
gh config get <key>
gh config list
```

**Common Settings:**

- `editor`: Default editor
- `git_protocol`: Git protocol (https/ssh)
- `pager`: Pager command
- `prompt`: Enable interactive prompts

**Examples:**

```bash
# Set editor
gh config set editor "code --wait"

# Set git protocol
gh config set git_protocol ssh

# Get setting
gh config get editor

# List all settings
gh config list
```

### Notifications

**Description:** View and manage GitHub notifications

**Syntax:**

```bash
gh notification <command> [flags]
```

**Common Commands:**

- `gh notification list`: List notifications
- `gh notification view <id>`: View notification
- `gh notification mark --read`: Mark as read

**Options:**

- `--repo <owner/repo>`: Filter by repository
- `--read`: Show only read notifications
- `--unread`: Show only unread notifications

**Examples:**

```bash
# List notifications
gh notification list

# View notification
gh notification view <id>

# Mark as read
gh notification mark --read
```

## Version Compatibility

**Minimum GitHub CLI Version:** 2.0.0

**Version-Specific Features:**

- Extensions: Available in all versions
- `gh browse`: Available in all versions
- `gh api`: Available in all versions
- Some newer commands may require CLI 2.20.0+

**Checking Version:**

```bash
gh --version
```

**Recommendation:** Use GitHub CLI 2.30.0 or later for best compatibility and latest features.

## Troubleshooting

### Common Errors and Solutions

**Authentication Errors:**

```bash
# Check authentication status
gh auth status

# Re-authenticate if needed
gh auth login

# Use token from environment
export GITHUB_TOKEN="your-token"
```

**Rate Limit Exceeded:**

```bash
# Check rate limit
gh api /rate_limit

# Wait and retry, or use authenticated requests
gh auth login
```

**Command Not Found:**

```bash
# Verify GitHub CLI is installed
gh --version

# Check if extension is needed
gh extension list
```

**Repository Not Found:**

```bash
# Verify repository exists and you have access
gh repo view owner/repo

# Check authentication
gh auth status
```

**Permission Denied:**

```bash
# Verify you have required permissions
gh auth status

# Check repository permissions
gh repo view owner/repo --json permissions
```

## Best Practices for AI Agents

### Authentication and Security

- Always use `gh auth login` before performing operations that require authentication
- For automation, use `GITHUB_TOKEN` environment variable instead of interactive login
- Never commit tokens or credentials to repositories
- Use fine-grained personal access tokens with minimal required permissions

### Error Handling

- Check authentication status with `gh auth status` before operations
- Handle rate limiting by checking `X-RateLimit-Remaining` headers in API responses
- Use `--json` flag for structured output that's easier to parse programmatically
- Always validate repository ownership and permissions before operations

### Workflow Automation

- Use `gh api` for complex operations not covered by standard commands
- Prefer `gh pr create --draft` for automated PR creation to allow review before merging
- Use `gh run watch` to monitor CI/CD workflows and wait for completion
- Combine `gh issue create` with `gh pr create` for linked PRs

### Output Parsing

- Use `--json` flag for machine-readable output
- Combine with `jq` for complex filtering: `gh pr list --json number,title | jq '.[] | .number'`
- Use `--limit` to control pagination for large result sets
- Prefer structured output over parsing human-readable text

### Performance Optimization

- Use `--limit` flag to reduce API calls when listing resources
- Cache authentication status to avoid repeated checks
- Batch operations when possible (e.g., create multiple issues in a loop)
- Use `gh api` for bulk operations instead of multiple CLI commands

### Anti-Patterns to Avoid

**❌ Don't:**

```bash
# Hardcoding credentials in scripts
gh auth login --with-token <<< "hardcoded-token"

# Not checking authentication before operations
gh repo create my-repo  # May fail silently if not authenticated

# Parsing human-readable output
gh pr list | grep "draft"  # Fragile, use --json instead
```

**✅ Do:**

```bash
# Use environment variables for tokens
export GITHUB_TOKEN="token"
gh auth status  # Verify authentication

# Use structured output
gh pr list --json number,title,isDraft | jq '.[] | select(.isDraft == true)'

# Check authentication first
gh auth status || gh auth login
```

**Why:** Hardcoded credentials are security risks. Human-readable output parsing is fragile and breaks with UI changes. Structured output is reliable and maintainable.

## Related Knowledge Files

- `github-api.md` - GitHub REST API for programmatic access
- `git-cli.md` - Git CLI for version control operations

## Notes

- GitHub CLI requires authentication for most operations (except public read operations)
- Rate limits apply: 5,000 requests/hour for authenticated requests, 60/hour for unauthenticated
- Use `gh config set editor <editor>` to configure your preferred editor
- GitHub CLI supports extensions via `gh extension install <extension>`
- For GitHub Enterprise, set `GH_HOST` environment variable or use `--hostname` flag
- The `gh api` command provides direct access to GitHub REST API endpoints
- Use `gh browse` to quickly open repositories, issues, or PRs in your browser
- All commands support `--help` flag for detailed usage information
- Aliases can simplify frequently used commands
- Extensions add additional functionality beyond core commands
