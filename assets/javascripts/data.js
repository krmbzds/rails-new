// Skip options data structure
const skipOptionsData = {
  "Initial Setup": {
    icon: "fas fa-rocket",
    options: [
      {
        name: "Git",
        description: "Skip creating a Git repository",
        icon: "fab fa-git-alt",
        value: "skip-git",
      },
      {
        name: "Bundle Install",
        description: "Skip running bundle install",
        icon: "fas fa-box",
        value: "skip-bundle",
      },
    ],
  },
  "Core Rails Components": {
    icon: "fas fa-layer-group",
    options: [
      {
        name: "Active Record",
        description: "Skip ActiveRecord files",
        icon: "fas fa-database",
        value: "skip-active-record",
      },
      {
        name: "Asset Pipeline",
        description: "Skip Sprockets files",
        icon: "fas fa-images",
        value: "skip-asset-pipeline",
      },
      {
        name: "Test Framework",
        description: "Skip test files",
        icon: "fas fa-vial",
        value: "skip-test",
      },
    ],
  },
  "Rails Framework Features": {
    icon: "fas fa-puzzle-piece",
    options: [
      {
        name: "Action Cable",
        description: "Skip Action Cable files",
        icon: "fas fa-bolt",
        value: "skip-action-cable",
      },
      {
        name: "Action Mailbox",
        description: "Skip Action Mailbox gem",
        icon: "fas fa-inbox",
        value: "skip-action-mailbox",
      },
      {
        name: "Action Mailer",
        description: "Skip Action Mailer files",
        icon: "fas fa-envelope",
        value: "skip-action-mailer",
      },
      {
        name: "Action Text",
        description: "Skip Action Text gem",
        icon: "fas fa-font",
        value: "skip-action-text",
      },
      {
        name: "Active Job",
        description: "Skip Active Job files",
        icon: "fas fa-tasks",
        value: "skip-active-job",
      },
      {
        name: "Active Storage",
        description: "Skip Active Storage files",
        icon: "fas fa-cloud-upload-alt",
        value: "skip-active-storage",
      },
    ],
  },
  "Frontend and UI": {
    icon: "fas fa-palette",
    options: [
      {
        name: "Hotwire",
        description: "Skip Hotwire integration",
        icon: "fas fa-bolt",
        value: "skip-hotwire",
      },
      {
        name: "Solid",
        description: "Skip Solid cache",
        icon: "fas fa-gem",
        value: "skip-solid",
      },
    ],
  },
  "API and Serialization": {
    icon: "fas fa-code",
    options: [
      {
        name: "Jbuilder",
        description: "Skip jbuilder gem",
        icon: "fas fa-cube",
        value: "skip-jbuilder",
      },
    ],
  },
  "Development and Testing Tools": {
    icon: "fas fa-tools",
    options: [
      {
        name: "Bootsnap",
        description: "Skip bootsnap gem",
        icon: "fas fa-rocket",
        value: "skip-bootsnap",
      },
      {
        name: "Brakeman",
        description: "Skip brakeman scanner",
        icon: "fas fa-shield-alt",
        value: "skip-brakeman",
      },
      {
        name: "Bundler Audit",
        description: "Skip bundler-audit gem",
        icon: "fas fa-search",
        value: "skip-bundler-audit",
      },
      {
        name: "CI Files",
        description: "Skip GitHub CI files",
        icon: "fas fa-code-branch",
        value: "skip-ci",
      },
      {
        name: "Dev Gems",
        description: "Skip development gems",
        icon: "fas fa-gem",
        value: "skip-dev-gems",
      },
      {
        name: "System Test",
        description: "Skip system test files",
        icon: "fas fa-laptop-code",
        value: "skip-system-test",
      },
      {
        name: "RuboCop",
        description: "Skip RuboCop linter",
        icon: "fas fa-gavel",
        value: "skip-rubocop",
      },
    ],
  },
  "Deployment and Production Tools": {
    icon: "fas fa-server",
    options: [
      {
        name: "Decrypted Diffs",
        description: "Skip encrypted secrets",
        icon: "fas fa-eye-slash",
        value: "skip-decrypted-diffs",
      },
      {
        name: "Docker",
        description: "Skip Docker files",
        icon: "fab fa-docker",
        value: "skip-docker",
      },
      {
        name: "Kamal",
        description: "Skip Kamal deployment",
        icon: "fas fa-ship",
        value: "skip-kamal",
      },
      {
        name: "Thruster",
        description: "Skip Thruster proxy",
        icon: "fas fa-rocket",
        value: "skip-thruster",
      },
    ],
  },
};
