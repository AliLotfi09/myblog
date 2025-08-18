const contentModules = new Map([
["src/content/home.mdx", () => import('./home.js')]]);

export { contentModules as default };
