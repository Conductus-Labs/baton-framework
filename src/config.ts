import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { cwd } from 'process';
import inquirer from 'inquirer';
import { getAvailableAgents, getAvailableWorkflows } from './helpers.js';

/**
 * Collect project configuration through interactive prompts
 */
export async function collectProjectConfig(npmPackageRoot: string, packageJson: any): Promise<any> {
  const projectRoot = cwd();
  const config: any = {};
  
  // Get available agents and workflows
  const availableAgents = getAvailableAgents(npmPackageRoot);
  const availableWorkflows = getAvailableWorkflows(npmPackageRoot);
  
  // 1. Project Metadata
  // Project name and type will be determined by AI's project init workflow
  config.project = {
    name: '{project-name}',
    type: '{project-type}',
    initialized: new Date().toISOString()
  };
  
  // 2. Source Control
  // Try to auto-detect git information
  let gitBranch = 'main';
  let gitRemoteUrl = '';
  
  try {
    // Get current branch (suppress stderr to avoid error messages when HEAD doesn't exist)
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { 
      cwd: projectRoot, 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).trim();
  } catch {
    // Git not available or not a git repo, or no commits yet
  }
  
  try {
    // Get remote URL (suppress stderr)
    gitRemoteUrl = execSync('git config --get remote.origin.url', { 
      cwd: projectRoot, 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).trim();
  } catch {
    // No remote configured
  }
  
  const sourceControlAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Source control provider:',
      choices: [
        { name: 'GitHub', value: 'github' },
        { name: 'GitLab', value: 'gitlab' },
        { name: 'Bitbucket', value: 'bitbucket' },
        { name: 'None', value: 'none' }
      ]
    }
  ]);
  
  config.source_control = {
    provider: sourceControlAnswers.provider
  };
  
  if (sourceControlAnswers.provider !== 'none') {
    const repoAnswers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Repository URL:',
        default: gitRemoteUrl || '',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Repository URL cannot be empty';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'branch',
        message: 'Default branch:',
        default: gitBranch || 'main'
      }
    ]);
    config.source_control.repository_url = repoAnswers.url;
    config.source_control.default_branch = repoAnswers.branch;
  } else {
    config.source_control.repository_url = '';
    config.source_control.default_branch = gitBranch || 'main';
  }
  
  // 3. Project Management
  const pmAnswers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Project management methodology:',
      default: 'RHYTHM-Method',
      choices: [
        { name: 'RHYTHM-Method', value: 'RHYTHM-Method' },
        { name: 'Scrum', value: 'scrum' },
        { name: 'Agile', value: 'agile' },
        { name: 'Kanban', value: 'kanban' },
        { name: 'Waterfall', value: 'waterfall' },
        { name: 'None', value: 'none' }
      ]
    },
    {
      type: 'list',
      name: 'location',
      message: 'Project management location:',
      choices: [
        { name: 'GitHub Issues', value: 'github-issues' },
        { name: 'Azure DevOps', value: 'azure-devops' },
        { name: 'Jira', value: 'jira' },
        { name: 'Linear', value: 'linear' },
        { name: 'Local Files', value: 'local' },
        { name: 'None', value: 'none' }
      ]
    }
  ]);
  
  config.project_management = {
    type: pmAnswers.type,
    location: pmAnswers.location,
    url: ''
  };
  
  // URL is required for all except 'local' and 'none'
  if (pmAnswers.location !== 'local' && pmAnswers.location !== 'none') {
    // Auto-generate default URL for GitHub Issues if repository URL is provided
    let defaultUrl = '';
    if (pmAnswers.location === 'github-issues' && config.source_control.repository_url) {
      const repoUrl = config.source_control.repository_url.trim();
      // Extract GitHub account and repo from various URL formats
      // https://github.com/account/repo.git -> https://github.com/account/repo/issues
      // https://github.com/account/repo -> https://github.com/account/repo/issues
      // https://user@github.com/account/repo.git -> https://github.com/account/repo/issues
      // git@github.com:account/repo.git -> https://github.com/account/repo/issues
      // Also handle URLs with trailing slashes
      // Match pattern: (optional user@)github.com/(account)/(repo)(.git)(optional trailing slash)
      const githubMatch = repoUrl.match(/(?:https?:\/\/(?:[^@]+@)?github\.com\/|git@github\.com:)([^\/]+)\/([^\/\.]+?)(?:\.git)?\/?$/);
      if (githubMatch) {
        const account = githubMatch[1];
        const repo = githubMatch[2];
        defaultUrl = `https://github.com/${account}/${repo}/issues`;
      }
    }
    
    const pmUrlAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Project management URL:',
        default: defaultUrl,
        validate: (input: string) => {
          if (!input.trim()) {
            return 'URL cannot be empty';
          }
          return true;
        }
      }
    ]);
    config.project_management.url = pmUrlAnswer.url;
  }
  
  // 4. GenAI Platform - Auto-detect from existing folders
  const detectedPlatforms: string[] = [];
  if (existsSync(join(projectRoot, '.cursor'))) {
    detectedPlatforms.push('cursor');
  }
  if (existsSync(join(projectRoot, '.claude'))) {
    detectedPlatforms.push('claude');
  }
  if (existsSync(join(projectRoot, '.gemini'))) {
    detectedPlatforms.push('gemini');
  }
  
  const platformChoices = [
    { name: 'Cursor', value: 'cursor' },
    { name: 'Claude Desktop', value: 'claude' },
    { name: 'Gemini Desktop', value: 'gemini' }
  ];
  
  const genAiAnswers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Select GenAI platform(s):',
      choices: platformChoices,
      default: detectedPlatforms,
      validate: (input: string[]) => {
        if (input.length === 0) {
          return 'At least one platform must be selected';
        }
        return true;
      }
    }
  ]);
  
  const platformConfig: Record<string, { provider: string; integration_type: string }> = {
    cursor: { provider: 'cursor', integration_type: 'ide-native' },
    claude: { provider: 'anthropic', integration_type: 'ide-native' },
    gemini: { provider: 'google', integration_type: 'ide-native' }
  };
  
  // Create GenAI config entries - first one is primary
  config.gen_ai = genAiAnswers.platforms.map((platform: string, index: number) => ({
    name: platform,
    model: '{model-name}', // Will be determined later or by AI
    provider: platformConfig[platform].provider,
    integration_type: platformConfig[platform].integration_type,
    primary: index === 0
  }));
  
  // 5. Agents - Only baton-agent is installed (removed selection)
  // Other agents will be suggested by baton-agent's project init workflow
  config.agents = {
    enabled: [{
      name: 'baton-agent',
      path: '.baton/agents/baton-agent.md'
    }]
  };
  
  // 6. Workflows - Only mandatory workflows are installed (removed selection)
  // Other workflows will be suggested by baton-agent's project init workflow
  config.workflows = {
    enabled: [
      { name: 'agent-initialisation', path: '.baton/workflows/agent-initialisation.yml' },
      { name: 'project-initialisation', path: '.baton/workflows/project-initialisation.yml' }
    ]
  };
  
  // 7. Knowledge files (skip for now - structure under review)
  config.knowledge = [];
  
  // 7.5. Git ignore configuration
  const gitIgnoreAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add_to_gitignore',
      message: 'Add .baton to .gitignore? \x1b[1m(default: Yes)\x1b[0m',
      default: true
    }
  ]);
  config.add_to_gitignore = gitIgnoreAnswer.add_to_gitignore;

  // 8. Agent Preferences
  const prefAnswers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'auto_save_context',
      message: 'Automatically save context after each session? \x1b[1m(default: Yes)\x1b[0m',
      default: true
    },
    {
      type: 'confirm',
      name: 'verbose_logging',
      message: 'Enable verbose logging for debugging? \x1b[1m(default: No)\x1b[0m',
      default: false
    },
    {
      type: 'confirm',
      name: 'check_for_updates',
      message: 'Check for Baton Framework updates? \x1b[1m(default: Yes)\x1b[0m',
      default: true
    },
    {
      type: 'confirm',
      name: 'send_feedback',
      message: 'Send usage feedback to improve Baton Framework? \x1b[1m(default: No)\x1b[0m',
      default: false
    }
  ]);
  
  config.preferences = prefAnswers;
  
  // 9. Metadata
  config.metadata = {
    created_by: 'baton-cli',
    cli_version: packageJson.version,
    last_updated: new Date().toISOString()
  };
  
  return config;
}

/**
 * Generate project.config.yml from template and config
 */
export async function generateProjectConfig(config: any, npmPackageRoot: string, batonDir: string): Promise<void> {
  // Load template
  const templatePath = join(npmPackageRoot, 'src', 'core', 'templates', 'project-file-templates', 'project.config-template.yml');
  
  if (!existsSync(templatePath)) {
    console.error(`\n❌ Error: project.config-template.yml not found at ${templatePath}\n`);
    process.exit(1);
  }
  
  let template = readFileSync(templatePath, 'utf-8');
  
  // Replace placeholders
  template = template.replace(/{project-name}/g, config.project.name);
  template = template.replace(/{project-type}/g, config.project.type);
  template = template.replace(/{YYYY-MM-DDTHH:MM:SSZ}/g, config.project.initialized);
  
  template = template.replace(/{provider}/g, config.source_control.provider);
  template = template.replace(/{repository-url}/g, config.source_control.repository_url);
  template = template.replace(/{branch-name}/g, config.source_control.default_branch);
  
  template = template.replace(/{methodology}/g, config.project_management.type);
  template = template.replace(/{location-type}/g, config.project_management.location);
  template = template.replace(/{optional-url}/g, config.project_management.url);
  
  // Replace GenAI platform section
  const genAiSection = config.gen_ai.map((platform: any) => 
    `  - name: ${platform.name}\n    model: ${platform.model}\n    provider: ${platform.provider}\n    integration_type: ${platform.integration_type}\n    primary: ${platform.primary}`
  ).join('\n');
  template = template.replace(/# GenAI platform configurations[\s\S]*?primary: { true\/false }/g, 
    `# GenAI platform configurations\ngen_ai:\n${genAiSection}`);
  
  // Replace agents section
  const agentsSection = config.agents.enabled.map((agent: any) => 
    `    - name: ${agent.name}\n      path: ${agent.path}`
  ).join('\n');
  // Match from "# Enabled agents" to the last agent entry
  template = template.replace(/# Enabled agents[\s\S]*?path: "\.baton\/agents\/\{agent-name-3\}\.md"/g,
    `# Enabled agents\nagents:\n  enabled:\n${agentsSection}`);
  
  // Replace workflows section
  const workflowsSection = config.workflows.enabled.map((workflow: any) => 
    `    - name: ${workflow.name}\n      path: ${workflow.path}`
  ).join('\n');
  // Match from "# Enabled workflows" to the last workflow entry
  template = template.replace(/# Enabled workflows[\s\S]*?path: "\.baton\/workflows\/\{workflow-name-2\}\.yml"/g,
    `# Enabled workflows\nworkflows:\n  enabled:\n${workflowsSection}`);
  
  // Replace preferences (match the comment lines too)
  template = template.replace(/auto_save_context: true # Automatically save context after each session \(default: true\)/g, 
    `auto_save_context: ${config.preferences.auto_save_context} # Automatically save context after each session (default: true)`);
  template = template.replace(/verbose_logging: false # Enable verbose logging for debugging \(default: false\)/g, 
    `verbose_logging: ${config.preferences.verbose_logging} # Enable verbose logging for debugging (default: false)`);
  template = template.replace(/check_for_updates: true # Check for Baton Framework updates \(default: true\)/g, 
    `check_for_updates: ${config.preferences.check_for_updates} # Check for Baton Framework updates (default: true)`);
  template = template.replace(/send_feedback: false # Send usage feedback to improve Baton Framework \(default: false\)/g, 
    `send_feedback: ${config.preferences.send_feedback} # Send usage feedback to improve Baton Framework (default: false)`);
  
  // Replace metadata
  template = template.replace(/{creator}/g, config.metadata.created_by);
  template = template.replace(/{version}/g, config.metadata.cli_version);
  // Handle the last_updated field (there might be multiple {YYYY-MM-DDTHH:MM:SSZ} placeholders)
  const lastUpdatedMatches = template.match(/{YYYY-MM-DDTHH:MM:SSZ}/g);
  if (lastUpdatedMatches) {
    // Replace all remaining date placeholders with the last_updated value
    template = template.replace(/{YYYY-MM-DDTHH:MM:SSZ}/g, config.metadata.last_updated);
  }
  
  // Replace knowledge section placeholder (empty for now)
  // Match from "# Installed knowledge files" through all the example entries until "# Enabled workflows"
  // Use a more specific pattern that matches the entire section
  template = template.replace(/# Installed knowledge files \(tools, resources, technology\)[\s\S]*?primary: { true\/false }\n\n/g,
    `# Installed knowledge files (tools, resources, technology)\nknowledge: []\n\n`);
  
  // Write the populated config file
  const configPath = join(batonDir, 'project.config.yml');
  writeFileSync(configPath, template, 'utf-8');
  console.log('\n✅ Generated project.config.yml\n');
}

