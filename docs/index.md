---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "My Awesome Project"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

# SafeTrunk Documentation

SafeTrunk is a powerful CLI tool designed to improve trunk-based development workflows by automating quality checks and ensuring code quality standards. It helps teams maintain high code quality while working efficiently with trunk-based development practices.

## Why SafeTrunk?

- **Automated Quality Checks**: Run comprehensive pre-push checks to catch issues early
- **Smart Branch Management**: Intelligent branch synchronization and conflict prevention
- **Insightful Analysis**: Get detailed feedback about your changes and their impact
- **Developer-Friendly**: Clear, actionable feedback and suggestions
- **Extensible**: Rich plugin system to customize and extend functionality
- **Gamification**: Built-in achievement system to encourage best practices

## Quick Navigation

<div class="features">
  <div class="feature">
    <h3>📚 Getting Started</h3>
    <p>Learn how to install and set up SafeTrunk in your project.</p>
    <a href="/guide/getting-started">Get Started →</a>
  </div>

  <div class="feature">
    <h3>🔧 Configuration</h3>
    <p>Configure SafeTrunk to match your team's workflow.</p>
    <a href="/config/overview">Configure →</a>
  </div>

  <div class="feature">
    <h3>📖 CLI Reference</h3>
    <p>Explore all available commands and options.</p>
    <a href="/reference/cli">View Commands →</a>
  </div>

  <div class="feature">
    <h3>🔌 Plugins</h3>
    <p>Extend SafeTrunk with plugins or create your own.</p>
    <a href="/plugins/overview">Explore Plugins →</a>
  </div>
</div>

## Latest Updates

- 🎉 Version 0.1.0 Released
  - Initial CLI implementation with core commands
  - Basic pre-push check system
  - Configuration file support
  - Plugin system foundation

## Community

- [GitHub Repository](https://github.com/fvena/safeTrunk)
- [Issue Tracker](https://github.com/fvena/safeTrunk/issues)
- [Discussions](https://github.com/fvena/safeTrunk/discussions)

<style>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 2rem 0;
}

.feature {
  padding: 20px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 var(--vp-c-divider);
}

.feature h3 {
  margin-top: 0;
}

.feature a {
  display: inline-block;
  margin-top: 8px;
  font-weight: 500;
  text-decoration: none;
  color: var(--vp-c-brand);
}

.feature a:hover {
  text-decoration: underline;
}
</style>
