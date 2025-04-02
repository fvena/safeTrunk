import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/safeTrunk/",
  description: "A powerful CLI tool for improving trunk-based development workflows",
  head: [
    ["link", { href: "/logo.svg", rel: "icon", type: "image/svg+xml" }],
    ["meta", { content: "#3eaf7c", name: "theme-color" }],
    ["meta", { content: "website", name: "og:type" }],
    ["meta", { content: "SafeTrunk", name: "og:title" }],
    [
      "meta",
      {
        content: "A powerful CLI tool for improving trunk-based development workflows",
        name: "og:description",
      },
    ],
  ],
  themeConfig: {
    footer: {
      copyright: "Copyright © 2024-present Francisco Vena",
      message: "Released under the MIT License.",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { link: "/guide/getting-started", text: "Guide" },
      { link: "/reference/cli", text: "Reference" },
      { link: "/config/overview", text: "Config" },
      { link: "/plugins/overview", text: "Plugins" },
      {
        items: [
          { link: "/changelog", text: "Changelog" },
          { link: "/contributing", text: "Contributing" },
        ],
        text: "v0.1.0",
      },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/config/": [
        {
          items: [
            { link: "/config/overview", text: "Overview" },
            { link: "/config/branch-config", text: "Branch Configuration" },
            { link: "/config/pre-push-steps", text: "Pre-Push Steps" },
            { link: "/config/feedback-options", text: "Feedback Options" },
          ],
          text: "Configuration",
        },
      ],
      "/guide/": [
        {
          items: [
            { link: "/guide/what-is-safetrunk", text: "What is SafeTrunk?" },
            { link: "/guide/getting-started", text: "Getting Started" },
            { link: "/guide/quick-start", text: "Quick Start" },
          ],
          text: "Introduction",
        },
        {
          items: [
            { link: "/guide/trunk-based-development", text: "Trunk-Based Development" },
            { link: "/guide/pre-push-checks", text: "Pre-Push Checks" },
            { link: "/guide/branch-management", text: "Branch Management" },
          ],
          text: "Core Concepts",
        },
        {
          items: [
            { link: "/guide/custom-plugins", text: "Custom Plugins" },
            { link: "/guide/gamification", text: "Gamification" },
            { link: "/guide/ci-cd-integration", text: "CI/CD Integration" },
          ],
          text: "Advanced Topics",
        },
      ],
      "/plugins/": [
        {
          items: [
            { link: "/plugins/overview", text: "Overview" },
            { link: "/plugins/creating-plugins", text: "Creating Plugins" },
            { link: "/plugins/official-plugins", text: "Official Plugins" },
            { link: "/plugins/plugin-api", text: "Plugin API" },
          ],
          text: "Plugins",
        },
      ],
      "/reference/": [
        {
          items: [
            { link: "/reference/cli", text: "Overview" },
            { link: "/reference/cli-run", text: "run" },
            { link: "/reference/cli-check", text: "check" },
          ],
          text: "CLI",
        },
        {
          items: [
            { link: "/reference/safetrunk-class", text: "SafeTrunk Class" },
            { link: "/reference/plugin-system", text: "Plugin System" },
            { link: "/reference/events", text: "Events" },
          ],
          text: "API Reference",
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/fvena/safeTrunk" }],
  },
  title: "SafeTrunk",
});
