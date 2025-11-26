---
version: 1.0.0
tool_name: github-api
tool_type: rest-api
purpose: GitHub REST API for programmatic access to GitHub resources and automation
created: 2025-11-26
last_updated: 2025-11-26
official_sources:
  - https://docs.github.com/en/rest
  - https://docs.github.com/en/rest/quickstart
  - https://docs.github.com/en/rest/overview/api-versions
---

# GitHub API - Knowledge Reference

## Quick Reference

### Common Endpoints

```bash
# Get repository information
GET /repos/{owner}/{repo}

# List repository issues
GET /repos/{owner}/{repo}/issues

# Create an issue
POST /repos/{owner}/{repo}/issues

# List pull requests
GET /repos/{owner}/{repo}/pulls

# Create a pull request
POST /repos/{owner}/{repo}/pulls

# Get repository contents
GET /repos/{owner}/{repo}/contents/{path}

# Create or update file
PUT /repos/{owner}/{repo}/contents/{path}

# List repository commits
GET /repos/{owner}/{repo}/commits

# Get user information
GET /user
```

### Common Patterns

```bash
# Authentication header
Authorization: Bearer <token>
# or
Authorization: token <token>

# API version header (recommended)
Accept: application/vnd.github+json
X-GitHub-Api-Version: 2022-11-28

# Pagination
GET /repos/{owner}/{repo}/issues?page=1&per_page=100

# Filtering and search
GET /search/issues?q=repo:owner/repo+state:open+label:bug
```

### Quick Lookup

| Task           | Endpoint                                | Method |
| -------------- | --------------------------------------- | ------ |
| Get repo       | `/repos/{owner}/{repo}`                 | GET    |
| Create issue   | `/repos/{owner}/{repo}/issues`          | POST   |
| List issues    | `/repos/{owner}/{repo}/issues`          | GET    |
| Create PR      | `/repos/{owner}/{repo}/pulls`           | POST   |
| List PRs       | `/repos/{owner}/{repo}/pulls`           | GET    |
| Get file       | `/repos/{owner}/{repo}/contents/{path}` | GET    |
| Update file    | `/repos/{owner}/{repo}/contents/{path}` | PUT    |
| List commits   | `/repos/{owner}/{repo}/commits`         | GET    |
| Create release | `/repos/{owner}/{repo}/releases`        | POST   |
| Get user       | `/user`                                 | GET    |

## Detailed Usage

### Authentication

**Description:** Authenticate API requests using tokens or OAuth

**Methods:**

1. **Personal Access Token (PAT)**

   ```bash
   Authorization: Bearer <token>
   # or
   Authorization: token <token>
   ```

2. **OAuth Token**

   ```bash
   Authorization: Bearer <oauth-token>
   ```

3. **GitHub App Installation Token**
   ```bash
   Authorization: Bearer <installation-token>
   ```

**Examples:**

```bash
# Using curl
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/user

# Using GitHub CLI
gh api /user

# Using environment variable
export GITHUB_TOKEN="your-token"
```

### Repository Operations

**Description:** Interact with GitHub repositories

**Get Repository:**

```bash
GET /repos/{owner}/{repo}
```

**Response includes:** name, full_name, description, private, fork, default_branch, etc.

**Create Repository:**

```bash
POST /user/repos
# or
POST /orgs/{org}/repos
```

**Body:**

```json
{
  "name": "repo-name",
  "description": "Repository description",
  "private": true
}
```

**List Repositories:**

```bash
GET /user/repos
GET /orgs/{org}/repos
GET /users/{username}/repos
```

**Examples:**

```bash
# Get repository details
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/owner/repo

# Create repository
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"my-repo","private":true}' \
     https://api.github.com/user/repos
```

### Issue Management

**Description:** Create, read, update, and close issues

**Create Issue:**

```bash
POST /repos/{owner}/{repo}/issues
```

**Body:**

```json
{
  "title": "Issue title",
  "body": "Issue description",
  "labels": ["bug", "priority"],
  "assignees": ["username"]
}
```

**List Issues:**

```bash
GET /repos/{owner}/{repo}/issues
```

**Query Parameters:**

- `state`: open, closed, all (default: open)
- `labels`: comma-separated label names
- `assignee`: username or "none" or "\*"
- `creator`: username
- `milestone`: milestone number or "none" or "\*"
- `sort`: created, updated, comments (default: created)
- `direction`: asc, desc (default: desc)
- `since`: ISO 8601 timestamp
- `per_page`: 1-100 (default: 30)
- `page`: page number

**Update Issue:**

```bash
PATCH /repos/{owner}/{repo}/issues/{issue_number}
```

**Body:**

```json
{
  "title": "Updated title",
  "body": "Updated description",
  "state": "closed",
  "state_reason": "completed"
}
```

**Examples:**

```bash
# Create issue
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title":"Bug","body":"Description"}' \
     https://api.github.com/repos/owner/repo/issues

# List open issues
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/repos/owner/repo/issues?state=open"

# Close issue
curl -X PATCH \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"state":"closed"}' \
     https://api.github.com/repos/owner/repo/issues/123
```

### Pull Request Operations

**Description:** Create, read, update, and merge pull requests

**Create Pull Request:**

```bash
POST /repos/{owner}/{repo}/pulls
```

**Body:**

```json
{
  "title": "PR title",
  "body": "PR description",
  "head": "branch-name",
  "base": "main",
  "draft": false
}
```

**List Pull Requests:**

```bash
GET /repos/{owner}/{repo}/pulls
```

**Query Parameters:** Similar to issues (state, head, base, sort, direction, etc.)

**Merge Pull Request:**

```bash
PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge
```

**Body:**

```json
{
  "commit_title": "Merge PR #123",
  "commit_message": "Description",
  "merge_method": "merge" // merge, squash, or rebase
}
```

**Examples:**

```bash
# Create PR
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title":"Feature","head":"feature-branch","base":"main"}' \
     https://api.github.com/repos/owner/repo/pulls

# List PRs
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/repos/owner/repo/pulls?state=open"

# Merge PR
curl -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"merge_method":"squash"}' \
     https://api.github.com/repos/owner/repo/pulls/123/merge
```

### File Operations

**Description:** Read, create, update, and delete files in repositories

**Get File Contents:**

```bash
GET /repos/{owner}/{repo}/contents/{path}
```

**Query Parameters:**

- `ref`: branch, tag, or commit SHA

**Create or Update File:**

```bash
PUT /repos/{owner}/{repo}/contents/{path}
```

**Body:**

```json
{
  "message": "Commit message",
  "content": "base64-encoded-content",
  "branch": "branch-name",
  "sha": "file-sha" // Required for updates
}
```

**Delete File:**

```bash
DELETE /repos/{owner}/{repo}/contents/{path}
```

**Body:**

```json
{
  "message": "Delete file",
  "sha": "file-sha",
  "branch": "branch-name"
}
```

**Examples:**

```bash
# Get file
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/owner/repo/contents/path/to/file

# Create/update file (content must be base64 encoded)
CONTENT=$(echo "file content" | base64)
curl -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     -d "{\"message\":\"Update file\",\"content\":\"$CONTENT\"}" \
     https://api.github.com/repos/owner/repo/contents/path/to/file
```

### Search API

**Description:** Search repositories, issues, pull requests, users, and code

**Search Repositories:**

```bash
GET /search/repositories?q={query}
```

**Search Issues:**

```bash
GET /search/issues?q={query}
```

**Search Code:**

```bash
GET /search/code?q={query}
```

**Query Syntax:**

- `repo:owner/repo`: Search in specific repository
- `language:javascript`: Filter by language
- `state:open`: Filter by state
- `label:bug`: Filter by label
- `user:username`: Filter by user
- Combine with `+`: `repo:owner/repo+state:open+label:bug`

**Examples:**

```bash
# Search repositories
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/search/repositories?q=language:python+stars:>100"

# Search issues
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/search/issues?q=repo:owner/repo+state:open+label:bug"
```

### Pagination

**Description:** Handle paginated responses

**Link Header:**

```
Link: <https://api.github.com/resource?page=2>; rel="next",
      <https://api.github.com/resource?page=5>; rel="last"
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `per_page`: Items per page (1-100, default: 30)

**Examples:**

```bash
# First page
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     "https://api.github.com/repos/owner/repo/issues?page=1&per_page=100"

# Follow Link header for next page
# Or manually increment page number
```

### GraphQL API

**Description:** GitHub's GraphQL API for flexible, efficient queries

**Endpoint:**
```bash
POST https://api.github.com/graphql
```

**Authentication:**
```bash
Authorization: Bearer <token>
```

**When to Use:**
- Complex queries requiring multiple related resources
- Need to fetch only specific fields (reduces payload size)
- Want to combine multiple REST API calls into one request
- Need to query nested relationships efficiently

**Basic Query:**
```json
{
  "query": "query { viewer { login } }"
}
```

**Examples:**

```bash
# Simple query
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"query { viewer { login } }"}' \
  https://api.github.com/graphql

# Query repository with issues
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { repository(owner:\"owner\", name:\"repo\") { name issues(first:10) { nodes { title } } } }"
  }' \
  https://api.github.com/graphql

# Query with variables
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query($owner: String!, $repo: String!) { repository(owner:$owner, name:$repo) { name } }",
    "variables": {"owner": "owner", "repo": "repo"}
  }' \
  https://api.github.com/graphql
```

**GraphQL vs REST:**
- **Use GraphQL when:** You need specific fields, complex nested queries, or want to reduce API calls
- **Use REST when:** Simple operations, following standard REST patterns, or using existing REST libraries

### Webhooks

**Description:** Receive real-time notifications about repository events

**Creating Webhooks:**
```bash
POST /repos/{owner}/{repo}/hooks
```

**Body:**
```json
{
  "name": "web",
  "active": true,
  "events": ["push", "pull_request"],
  "config": {
    "url": "https://example.com/webhook",
    "content_type": "json",
    "secret": "webhook-secret"
  }
}
```

**Webhook Events:**
- `push`: Code pushed to repository
- `pull_request`: Pull request opened, closed, or synchronized
- `issues`: Issue opened, closed, or edited
- `release`: Release published
- `workflow_run`: GitHub Actions workflow run completed

**Payload Structure:**
```json
{
  "action": "opened",
  "repository": { "name": "repo", "full_name": "owner/repo" },
  "sender": { "login": "username" },
  "issue": { "number": 123, "title": "Issue title" }
}
```

**Security:**
- Always verify webhook signatures using `X-Hub-Signature-256` header
- Use HTTPS for webhook URLs
- Validate webhook payloads before processing

**Examples:**

```bash
# Create webhook
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "web",
    "active": true,
    "events": ["push"],
    "config": {
      "url": "https://example.com/webhook",
      "content_type": "json"
    }
  }' \
  https://api.github.com/repos/owner/repo/hooks

# List webhooks
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo/hooks
```

### Rate Limit Handling

**Description:** Check and handle API rate limits

**Check Rate Limit:**
```bash
GET /rate_limit
```

**Response:**
```json
{
  "resources": {
    "core": {
      "limit": 5000,
      "remaining": 4999,
      "reset": 1234567890
    }
  }
}
```

**Exponential Backoff Implementation:**
```bash
#!/bin/bash
# Example rate limit handling with exponential backoff

make_request() {
  response=$(curl -s -w "\n%{http_code}" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    "$1")
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" = "403" ]; then
    # Check if rate limited
    remaining=$(echo "$body" | jq -r '.rate.remaining // empty')
    if [ -z "$remaining" ] || [ "$remaining" = "0" ]; then
      reset_time=$(echo "$body" | jq -r '.rate.reset // empty')
      if [ -n "$reset_time" ]; then
        wait_time=$((reset_time - $(date +%s)))
        if [ $wait_time -gt 0 ]; then
          echo "Rate limited. Waiting $wait_time seconds..."
          sleep $wait_time
          make_request "$1"
          return
        fi
      fi
    fi
  fi
  
  # Exponential backoff for 5xx errors
  if [ "$http_code" -ge 500 ]; then
    retry_count=${2:-0}
    if [ $retry_count -lt 3 ]; then
      wait_time=$((2 ** retry_count))
      echo "Server error. Retrying in $wait_time seconds..."
      sleep $wait_time
      make_request "$1" $((retry_count + 1))
      return
    fi
  fi
  
  echo "$body"
}
```

### Conditional Requests

**Description:** Use ETags and Last-Modified headers for efficient caching

**ETag Usage:**
```bash
# First request
response=$(curl -s -i \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo)

etag=$(echo "$response" | grep -i "ETag:" | cut -d' ' -f2 | tr -d '\r')

# Subsequent request with If-None-Match
response=$(curl -s -i \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "If-None-Match: $etag" \
  https://api.github.com/repos/owner/repo)

# If 304 Not Modified, use cached data
# If 200 OK, data has changed, use new response
```

**Last-Modified Usage:**
```bash
# First request
response=$(curl -s -i \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo)

last_modified=$(echo "$response" | grep -i "Last-Modified:" | cut -d' ' -f2- | tr -d '\r')

# Subsequent request with If-Modified-Since
response=$(curl -s -i \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "If-Modified-Since: $last_modified" \
  https://api.github.com/repos/owner/repo)
```

### Error Response Formats

**Description:** Understanding API error responses

**Error Response Structure:**
```json
{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "Issue",
      "field": "title",
      "code": "missing_field"
    }
  ],
  "documentation_url": "https://docs.github.com/rest/issues/issues#create-an-issue"
}
```

**Common HTTP Status Codes:**
- `200-299`: Success
- `400`: Bad Request (invalid parameters)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (rate limited or insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `422`: Unprocessable Entity (validation failed)
- `500-599`: Server errors (retry with backoff)

**Error Handling Example:**
```bash
response=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo/issues)

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -ge 400 ]; then
  error_message=$(echo "$body" | jq -r '.message // "Unknown error"')
  echo "Error $http_code: $error_message"
  
  # Check for detailed errors
  errors=$(echo "$body" | jq -r '.errors[]? | "\(.field): \(.code)"')
  if [ -n "$errors" ]; then
    echo "Details:"
    echo "$errors"
  fi
  
  exit 1
fi
```

## Version Compatibility

**API Version:** 2022-11-28 (current as of 2025-11-26)

**Version Header:**
```bash
X-GitHub-Api-Version: 2022-11-28
```

**Versioning:**
- GitHub API uses date-based versioning (YYYY-MM-DD format)
- Always specify API version header for stability
- Breaking changes are announced in advance
- Check [API changelog](https://docs.github.com/en/rest/overview/api-versions) for updates

**Recommendation:** Always specify the API version header. Update to newer versions after testing.

## Troubleshooting

### Common Errors and Solutions

**401 Unauthorized:**
```bash
# Check token is valid
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user

# Verify token has required permissions
# Check token scopes in GitHub settings
```

**403 Forbidden (Rate Limited):**
```bash
# Check rate limit status
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/rate_limit

# Wait until reset time or use authenticated requests
# Implement exponential backoff
```

**404 Not Found:**
```bash
# Verify repository exists
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo

# Check you have access to private repositories
# Verify owner/repo name is correct
```

**422 Unprocessable Entity:**
```bash
# Check error details in response
# Common causes:
# - Missing required fields
# - Invalid field values
# - Validation errors

# Example: Check error details
response=$(curl -s \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":""}' \
  https://api.github.com/repos/owner/repo/issues)

echo "$response" | jq '.errors'
```

**500-599 Server Errors:**
```bash
# Implement retry logic with exponential backoff
# Check GitHub Status: https://www.githubstatus.com/
# Wait and retry - these are usually temporary
```

**Pagination Issues:**
```bash
# Verify you're handling Link header correctly
# Check per_page doesn't exceed 100
# Ensure you're following all pages, not just first
```

## Best Practices for AI Agents

### Authentication and Security

- Always use environment variables for tokens, never hardcode them
- Use fine-grained personal access tokens with minimal required permissions
- Rotate tokens regularly and revoke unused tokens
- For GitHub Apps, use installation tokens with appropriate permissions
- Store tokens securely and never commit them to repositories

### Rate Limiting

- Check rate limit status: `GET /rate_limit`
- Unauthenticated: 60 requests/hour
- Authenticated: 5,000 requests/hour
- GitHub Apps: Based on installation count
- Use exponential backoff when rate limited
- Cache responses when possible to reduce API calls

### API Versioning

- Always specify API version header: `X-GitHub-Api-Version: 2022-11-28`
- Use `Accept: application/vnd.github+json` header
- Monitor API changelog for breaking changes
- Test API version updates before deploying

### Error Handling

- Check HTTP status codes (200-299 success, 400-499 client errors, 500-599 server errors)
- Handle rate limiting (403 with `X-RateLimit-Remaining: 0`)
- Retry on 5xx errors with exponential backoff
- Validate request payloads before sending
- Handle pagination properly to avoid missing data

### Pagination

- Always check `Link` header for pagination
- Use `per_page` parameter to reduce number of requests (max 100)
- Implement proper pagination handling in loops
- Consider using GraphQL API for complex queries requiring multiple pages

### Request Optimization

- Use conditional requests with `If-None-Match` (ETag) or `If-Modified-Since` headers
- Batch operations when possible
- Use search API instead of multiple individual requests
- Cache responses appropriately based on data volatility

### Anti-Patterns to Avoid

**❌ Don't:**

```bash
# Hardcoding tokens
curl -H "Authorization: Bearer hardcoded-token" ...

# Ignoring rate limits
for i in {1..1000}; do
  curl https://api.github.com/repos/owner/repo/issues
done

# Not handling pagination
curl https://api.github.com/repos/owner/repo/issues  # Only gets first 30

# Not checking errors
response=$(curl ...)
# Process response without checking status code
```

**✅ Do:**

```bash
# Use environment variables
curl -H "Authorization: Bearer $GITHUB_TOKEN" ...

# Check rate limits and implement backoff
rate_limit=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/rate_limit | jq '.rate.remaining')
if [ "$rate_limit" -lt 100 ]; then
  sleep 3600  # Wait if low
fi

# Handle pagination
page=1
while true; do
  response=$(curl ... "?page=$page&per_page=100")
  # Process response
  # Check Link header for next page
  page=$((page + 1))
done

# Check HTTP status
status=$(curl -s -o /dev/null -w "%{http_code}" ...)
if [ "$status" -ne 200 ]; then
  echo "Error: HTTP $status"
  exit 1
fi
```

**Why:** Hardcoded tokens are security risks. Ignoring rate limits causes API failures. Missing pagination loses data. Not checking errors leads to silent failures.

## Related Knowledge Files

- `github-cli.md` - GitHub CLI for command-line operations
- `git-cli.md` - Git CLI for version control operations

## Notes

- Base URL: `https://api.github.com` (or `https://github.example.com/api/v3` for Enterprise)
- API versioning: Always specify `X-GitHub-Api-Version` header (currently 2022-11-28)
- Rate limits: Check `/rate_limit` endpoint for current status
- Pagination: Use `Link` header or `page`/`per_page` query parameters
- Authentication: Required for most operations (except public read)
- Content-Type: Use `application/json` for request bodies
- Response format: JSON by default, specify `Accept` header for different formats
- Conditional requests: Use ETags and Last-Modified headers for caching
- Webhooks: Use webhooks for real-time event notifications instead of polling
- GraphQL API: Available at `https://api.github.com/graphql` for complex queries
- Always check HTTP status codes and handle errors appropriately
- Use GraphQL for complex queries requiring multiple related resources
- Implement exponential backoff for rate limits and server errors
