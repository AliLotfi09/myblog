import { loadShikiTheme } from 'rehype-expressive-code';
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { A as AstroError, R as RenderUndefinedEntryError, c as createComponent, u as unescapeHTML, a as renderTemplate, U as UnknownContentCollectionError, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, r as renderComponent } from './astro/server.js';
import 'kleur/colors';
import * as devalue from 'devalue';

const config = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: "https://blog.imalixd.ir",
  // The name of your site, used in the title and for SEO.
  title: "AliXD",
  // The description of your site, used for SEO and RSS feed.
  description: "My name is Ali Lotfi, a curious mind with a passion for learning and creating. I’ve always believed that creativity has no boundaries, whether it’s in art, design, or technology. Outside of my work, I enjoy exploring new ideas, solving challenges, and sharing what I learn with others. This blog is my personal space to express my thoughts, experiences, and the little stories that make life interesting.",
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: "Ali Lotfi",
  // Keywords for SEO, used in the meta tags.
  tags: [
    "Ali Lotfi",
    "AliXD",
    "Ali Lotfi blog",
    "Ali Lotfi web designer",
    "Ali Lotfi graphic designer",
    "Ali Lotfi developer",
    "Ali Lotfi portfolio",
    "Ali Lotfi projects",
    "Ali Lotfi WordPress",
    "Ali Lotfi Photoshop",
    "Ali Lotfi Figma",
    "وبلاگ علی لطفی",
    "علی لطفی",
    "لطفی",
    "وبلاگ لطفی",
    "دیپلماسی"
  ],
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: "JetBrains Mono Variable",
  // For pagination, the number of posts to display per page.
  pageSize: 5,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: "Home",
      url: "/"
    },
    {
      name: "About",
      url: "/about"
    },
    {
      name: "Archive",
      url: "/posts"
    },
    {
      name: "GitHub",
      url: "https://github.com/Alilotfi09/",
      external: true
    }
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: "select",
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: "github-dark-default",
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    // include: [
    //   'github-light',
    //   'github-dark',
    // ]
    include: [
      "andromeeda",
      "aurora-x",
      "ayu-dark",
      "catppuccin-frappe",
      "catppuccin-latte",
      "catppuccin-macchiato",
      "catppuccin-mocha",
      "dark-plus",
      "dracula",
      "dracula-soft",
      "everforest-dark",
      "everforest-light",
      "github-dark",
      "github-dark-default",
      "github-dark-dimmed",
      "github-dark-high-contrast",
      "github-light",
      "github-light-default",
      "github-light-high-contrast",
      "gruvbox-dark-hard",
      "gruvbox-dark-medium",
      "gruvbox-dark-soft",
      "gruvbox-light-hard",
      "gruvbox-light-medium",
      "gruvbox-light-soft",
      "houston",
      "kanagawa-dragon",
      "kanagawa-lotus",
      "kanagawa-wave",
      "laserwave",
      "light-plus",
      "material-theme",
      "material-theme-darker",
      "material-theme-lighter",
      "material-theme-ocean",
      "material-theme-palenight",
      "min-dark",
      "min-light",
      "monokai",
      "night-owl",
      "nord",
      "one-dark-pro",
      "one-light",
      "plastic",
      "poimandres",
      "red",
      "rose-pine",
      "rose-pine-dawn",
      "rose-pine-moon",
      "slack-dark",
      "slack-ochin",
      "snazzy-light",
      "solarized-dark",
      "solarized-light",
      "synthwave-84",
      "tokyo-night",
      "vesper",
      "vitesse-black",
      "vitesse-dark",
      "vitesse-light"
    ]
  },
  // Social links to display in the footer.
  socialLinks: {
    github: "https://github.com/stelcodes/AliLotfi09",
    mastodon: "@lotfali@matodon.social",
    email: "me.alidev@gmail.com",
    telegram: "t.me/ImAliDes",
    rss: false
    // Set to true to include an RSS feed link in the footer
  },
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // If you don't want to use Giscus, set this to undefined.
  giscus: {
    repo: "stelcodes/multiterm-astro",
    repoId: "R_kgDOPNnBig",
    category: "Giscus",
    categoryId: "DIC_kwDOPNnBis4CteOc",
    reactionsEnabled: true
    // Enable reactions on post itself
  }
};

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content.js');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://blog.imalixd.ir", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  maxAge: z.number().optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets.js');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets.js');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets.js').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { Path: process.env.Path }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules.js');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

function dateString(date) {
  return date.toISOString().split("T")[0];
}
function pick(obj, keys) {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]])
  );
}
function flattenThemeColors(theme) {
  const scopedThemeSettings = theme.settings.reduce(
    (acc, item) => {
      const { scope, settings } = item;
      const { foreground } = settings;
      if (scope && foreground) {
        for (const s of scope) {
          acc[s] = foreground.toLowerCase().trim();
        }
      }
      return acc;
    },
    {}
  );
  return { ...theme.colors, ...scopedThemeSettings };
}
const unresolvedStyles = {
  // VSCode Command: Inspect Editor Tokens And Scopes
  foreground: ["editor.foreground"],
  background: ["editor.background"],
  accent: [
    "heading.1.markdown entity.name",
    "heading.1.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h1: [
    "heading.1.markdown entity.name",
    "heading.1.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h2: [
    "heading.2.markdown entity.name",
    "heading.2.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h3: [
    "heading.3.markdown entity.name",
    "heading.3.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h4: [
    "heading.4.markdown entity.name",
    "heading.4.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h5: [
    "heading.5.markdown entity.name",
    "heading.5.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  h6: [
    "heading.6.markdown entity.name",
    "heading.6.markdown",
    "markup.heading.markdown",
    "markup.heading",
    "editor.foreground"
  ],
  li: [
    "markup.list.bullet",
    "punctuation.definition.list.begin.markdown",
    "editor.foreground"
  ],
  italic: [
    "markup.italic.markdown",
    "markup.italic",
    "punctuation.definition.italic.markdown",
    "editor.foreground"
  ],
  a: ["string.other.link.title.markdown", "markup.link", "editor.foreground"],
  hr: ["meta.separator.markdown", "meta.separator", "editor.foreground"],
  blue: ["terminal.ansiBlue", "terminal.ansiBrightBlue"],
  green: ["terminal.ansiGreen", "terminal.ansiBrightGreen"],
  red: ["terminal.ansiRed", "terminal.ansiBrightRed"],
  yellow: ["terminal.ansiYellow", "terminal.ansiBrightYellow"],
  magenta: ["terminal.ansiMagenta", "terminal.ansiBrightMagenta"],
  cyan: ["terminal.ansiCyan", "terminal.ansiBrightCyan"],
  // For Giscus syntax highlighting
  comment: ["comment", "punctuation.definition.comment", "foreground"],
  constant: ["constant.language.boolean", "constant.language", "foreground"],
  entity: ["entity.name.function", "support.function", "function", "foreground"],
  entityTag: [
    "entity.name.tag",
    "punctuation.definition.tag",
    "punctuation.definition.tag.html",
    "meta.tag",
    "foreground"
  ],
  keyword: [
    "keyword",
    "punctuation.definition.keyword",
    "keyword.operator",
    "foreground"
  ],
  string: ["string", "string.quoted", "string.value", "string variable", "foreground"],
  variable: [
    "variable",
    "variable.language",
    "variable.other",
    "support.variable",
    "foreground"
  ],
  regexp: [
    "string.regexp",
    "string.regexp.source",
    "constant.other.character-class.regexp",
    "string",
    "foreground"
  ]
};
async function resolveThemeColorStyles(themes, overrides) {
  const resolvedThemes = themes.map(async (theme) => {
    const loadedTheme = await loadShikiTheme(theme);
    const flattenedTheme = flattenThemeColors(loadedTheme);
    const result = {};
    for (const el of Object.keys(unresolvedStyles)) {
      {
        for (const group of unresolvedStyles[el]) {
          if (flattenedTheme[group]) {
            result[el] = flattenedTheme[group];
            break;
          }
        }
      }
    }
    return [theme, result];
  });
  return Object.fromEntries(await Promise.all(resolvedThemes));
}
async function getSortedPosts() {
  const allPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const sortedPosts = allPosts.sort((a, b) => {
    return a.data.published > b.data.published ? -1 : 1;
  });
  return sortedPosts;
}

export { DEFAULT_HASH_PROPS as D, VALID_SUPPORTED_FORMATS as V, renderEntry as a, getSortedPosts as b, config as c, dateString as d, DEFAULT_OUTPUT_FORMAT as e, getCollection as g, pick as p, resolveThemeColorStyles as r };
