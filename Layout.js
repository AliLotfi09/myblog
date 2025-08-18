import { b as createAstro, c as createComponent, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, a as renderTemplate, r as renderComponent, F as Fragment, u as unescapeHTML, f as renderScript, g as defineStyleVars, h as renderHead, d as renderSlot } from './astro/server.js';
/* empty css      */
import 'kleur/colors';
import { c as config, r as resolveThemeColorStyles, p as pick } from './utils.js';
import { getIconData, iconToSVG } from '@iconify/utils';
import 'clsx';
import crypto from 'crypto';

const icons = {"local":{"prefix":"local","lastModified":1755534026,"icons":{"bluesky":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6.335 5.144C4.681 3.945 2 3.017 2 5.97c0 .59.35 4.953.556 5.661C3.269 14.094 5.686 14.381 8 14c-4.045.665-4.889 3.208-2.667 5.41C6.363 20.428 7.246 21 8 21c2 0 3.134-2.769 3.5-3.5q.5-1 .5-1.5 0 .5.5 1.5c.366.731 1.5 3.5 3.5 3.5.754 0 1.637-.571 2.667-1.59C20.889 17.207 20.045 14.664 16 14c2.314.38 4.73.094 5.444-2.369.206-.708.556-5.072.556-5.661 0-2.953-2.68-2.025-4.335-.826C15.372 6.806 12.905 10.192 12 12c-.905-1.808-3.372-5.194-5.665-6.856\"/>"},"chevron-up":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m18 15-6-6-6 6\"/>"},"chevrons-left":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m11 17-5-5 5-5m7 10-5-5 5-5\"/>"},"chevrons-right":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m6 17 5-5-5-5m7 10 5-5-5-5\"/>"},"circle-x":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6m0-6 6 6\"/></g>"},"email":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"/><rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/></g>"},"github":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4\"/><path d=\"M9 18c-4.51 2-5-2-7-2\"/></g>"},"linkedin":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/></g>"},"mastodon":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15.5 21.5C5 24 3 19 3 13v-3c0-6 2.5-7 7-7h4c4.5 0 7 1.5 7 5.5v4c0 6.5-10 4-13.5 4-1 0-1.5 7 8 5\"/><path d=\"M7 13.5V8s.5-2 2.5-2S12 8 12 8v2.5V8s.5-2 2.5-2S17 8 17 8v5.5\"/></g>"},"moon":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9\"/>"},"palette":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\"/><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/></g>"},"rss":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16\"/><circle cx=\"5\" cy=\"19\" r=\"1\"/></g>"},"search":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"m21 21-4.34-4.34\"/><circle cx=\"11\" cy=\"11\" r=\"8\"/></g>"},"sun":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41\"/></g>"},"sun-moon":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 2v2m1 4.129A4 4 0 0 1 15.873 11M19 5l-1.256 1.256M20 12h2M9 8a5 5 0 1 0 7 7 7 7 0 1 1-7-7\"/>"},"telegram":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m26.67 38.57-.82 11.54A2.88 2.88 0 0 0 28.14 49l5.5-5.26 11.42 8.35c2.08 1.17 3.55.56 4.12-1.92l7.49-35.12h0c.66-3.09-1.08-4.33-3.16-3.55l-44 16.85C6.47 29.55 6.54 31.23 9 32l11.26 3.5 25.33-14.79c1.23-.83 2.36-.37 1.44.44Z\"/>","width":64,"height":64},"twitter":{"body":"<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m26.67 38.57-.82 11.54A2.88 2.88 0 0 0 28.14 49l5.5-5.26 11.42 8.35c2.08 1.17 3.55.56 4.12-1.92l7.49-35.12h0c.66-3.09-1.08-4.33-3.16-3.55l-44 16.85C6.47 29.55 6.54 31.23 9 32l11.26 3.5 25.33-14.79c1.23-.83 2.36-.37 1.44.44Z\"/>","width":64,"height":64}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$3 = createAstro("https://blog.imalixd.ir");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
      this.hint = "";
    }
  }
  const req = Astro2.request;
  const { name = "", title, desc, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  const { viewBox } = normalizedProps;
  if (includeSymbol) {
    delete normalizedProps.viewBox;
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${desc && renderTemplate`<desc>${desc}</desc>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}${addAttribute(viewBox, "viewBox")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "href")}></use> ` })}`} </svg>`;
}, "C:/Users/AliLotfi/Desktop/myblog/node_modules/astro-icon/components/Icon.astro", void 0);

createComponent(($$result, $$props, $$slots) => {
  let lightTheme = config.themes.include[0];
  let darkTheme = config.themes.include[1];
  return renderTemplate`${maybeRenderHead()}<button id="theme-change-button" class="block ml-auto"${addAttribute(lightTheme, "data-light")}${addAttribute(darkTheme, "data-dark")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "sun", "id": "icon-light", "class": "hidden size-6 text-[var(--theme-accent)]" })} ${renderComponent($$result, "Icon", $$Icon, { "name": "moon", "id": "icon-dark", "class": "hidden size-6 text-[var(--theme-accent)]" })} ${renderComponent($$result, "Icon", $$Icon, { "name": "sun-moon", "id": "icon-auto", "class": "hidden size-6 text-[var(--theme-accent)]" })} </button> ${renderScript($$result, "C:/Users/AliLotfi/Desktop/myblog/src/components/LightDarkAutoButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/LightDarkAutoButton.astro", void 0);

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "site-search", "site-search", { "class": "ms-auto", "id": "search" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button class="hover:text-accent flex cursor-pointer items-center justify-center rounded-md" aria-keyshortcuts="Control+K Meta+K" data-open-modal disabled> ${renderComponent($$result, "Icon", $$Icon, { "name": "search", "class": "size-6 text-accent" })} <span class="sr-only">Open Search</span> </button> <dialog aria-label="search" class="text-foreground! bg-background max-h-5/6 min-h-48 w-7/8 sm:w-5/6 max-w-xl border-double! border-4 border-accent/30 shadow-sm backdrop:backdrop-blur-sm open:flex mx-auto mt-10 sm:mt-16 mb-auto rounded-xl"> <div class="dialog-frame flex grow flex-col gap-4 p-6 pt-6 max-w-full"> <button class="cursor-pointer fixed top-2 right-2 rounded-full" data-close-modal> ${renderComponent($$result, "Icon", $$Icon, { "name": "circle-x", "class": "size-6 text-accent/50" })} </button> ${renderTemplate`<div class="search-container"> <div id="pagefind-search" class="max-w-full"></div> </div>`} </div> </dialog> ` })}  ${renderScript($$result, "C:/Users/AliLotfi/Desktop/myblog/src/components/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/Search.astro", void 0);

const $$SelectTheme = createComponent(($$result, $$props, $$slots) => {
  function kebabToTitleCase(str) {
    return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  return renderTemplate`${renderComponent($$result, "select-theme", "select-theme", { "class": "ms-auto", "id": "search", "data-astro-cid-kbsdsqc5": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button class="hover:text-accent flex cursor-pointer items-center justify-center rounded-md" aria-keyshortcuts="Control+K Meta+K" data-open-modal disabled data-astro-cid-kbsdsqc5> ${renderComponent($$result, "Icon", $$Icon, { "name": "palette", "class": "size-6 text-accent", "data-astro-cid-kbsdsqc5": true })} <span class="sr-only" data-astro-cid-kbsdsqc5>Select Theme</span> </button> <dialog aria-label="select-theme" class="text-foreground! bg-background max-h-5/6 max-w-5/6 border-double! border-4 border-accent/30 shadow-sm backdrop:backdrop-blur-sm open:flex mx-auto mt-16 mb-auto rounded-xl" data-astro-cid-kbsdsqc5> <div class="dialog-frame flex grow flex-col gap-4 px-10 py-1 max-w-full" data-astro-cid-kbsdsqc5> <button aria-roledescription="close" class="cursor-pointer fixed top-2 right-2 rounded-full" data-close-modal data-astro-cid-kbsdsqc5> ${renderComponent($$result, "Icon", $$Icon, { "name": "circle-x", "class": "size-6 text-accent/50", "data-astro-cid-kbsdsqc5": true })} </button> <ul id="theme-change-list" class="flex flex-col bg-background text-accent m-0 p-2 rounded-xl" data-astro-cid-kbsdsqc5> ${config.themes.include.map((theme) => renderTemplate`<li data-astro-cid-kbsdsqc5> <button class="w-full rounded-lg py-1 px-2"${addAttribute(theme, "data-theme")} data-astro-cid-kbsdsqc5> ${kebabToTitleCase(theme)} </button> </li>`)} </ul> </div> </dialog> ` })}  ${renderScript($$result, "C:/Users/AliLotfi/Desktop/myblog/src/components/SelectTheme.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/SelectTheme.astro", void 0);

const $$Astro$2 = createAstro("https://blog.imalixd.ir");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="underline"${addAttribute(link.external ? "noopener noreferrer" : void 0, "rel")}${addAttribute(link.external ? "_blank" : void 0, "target")}${addAttribute(link.url, "href")}> ${link.name} </a>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/NavLink.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const lightDarkAutoTheme = config.themes.mode === "light-dark-auto";
  const selectTheme = config.themes.include.length > 1;
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div class="relative flex items-center justify-between bg-accent/10 rounded-xl" data-astro-cid-3ef6ksr2> <a id="logo" href="/" class="block px-4 py-1.5 max-w-full no-underline items-center bg-accent text-background font-bold rounded-xl" data-astro-cid-3ef6ksr2> ${config.title} </a> <div class="flex items-center gap-3 sm:mr-3" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "Search", $$Search, { "data-astro-cid-3ef6ksr2": true })} ${lightDarkAutoTheme} ${selectTheme && renderTemplate`${renderComponent($$result, "SelectTheme", $$SelectTheme, { "data-astro-cid-3ef6ksr2": true })}`} <nav id="nav-mobile" aria-label="Menu" class="p-0 text-accent sm:hidden" data-astro-cid-3ef6ksr2> <button id="nav-mobile-button" class="px-3 py-1 h-full cursor-pointer border-2 rounded-xl bg-background" type="button" aria-expanded="false" aria-controls="nav-menu-list" data-astro-cid-3ef6ksr2>
▾
</button> <ul id="nav-mobile-list" class="invisible absolute flex flex-col bg-background shadow text-accent border-2 m-0 p-2.5 top-11.5 left-auto right-0 z-50 rounded-xl" data-astro-cid-3ef6ksr2> ${config.navLinks.map((link) => renderTemplate`<li class="p-1" aria-expanded="false" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "NavLink", $$NavLink, { "link": link, "data-astro-cid-3ef6ksr2": true })} </li>`)} </ul> </nav> </div> </div> <nav aria-label="Menu" class="p-0 mt-4 ml-0.5 text-accent hidden sm:block" data-astro-cid-3ef6ksr2> <ul class="flex flex-row text-accent mb-2.5" data-astro-cid-3ef6ksr2> ${config.navLinks.map((link) => renderTemplate`<li class="mr-5" aria-expanded="true" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "NavLink", $$NavLink, { "link": link, "data-astro-cid-3ef6ksr2": true })} </li>`)} </ul> </nav> </header>  ${renderScript($$result, "C:/Users/AliLotfi/Desktop/myblog/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://blog.imalixd.ir");
const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialLinks;
  const { socialLinks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full max-w-md items-center justify-between"> ${socialLinks.github && renderTemplate`<a${addAttribute(socialLinks.github, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">GitHub</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "github", "class": "size-7" })} </a>`} ${socialLinks.mastodon && renderTemplate`<a${addAttribute(socialLinks.mastodon, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">Mastodon</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "mastodon", "class": "size-7" })} </a>`} ${socialLinks.twitter && renderTemplate`<a${addAttribute(socialLinks.twitter, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">Telegram</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "telegram", "class": "size-7" })} </a>`} ${socialLinks.linkedin && renderTemplate`<a${addAttribute(socialLinks.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">LinkedIn</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "linkedin", "class": "size-7" })} </a>`} ${socialLinks.bluesky && renderTemplate`<a${addAttribute(socialLinks.bluesky, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">Bluesky</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "bluesky", "class": "size-7" })} </a>`} ${socialLinks.email && renderTemplate`<a${addAttribute(`mailto:${socialLinks.email}`, "href")} target="_blank" rel="noopener noreferrer" class="social-link"> <span class="sr-only">Email</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "email", "class": "size-7" })} </a>`} ${socialLinks.rss && renderTemplate`<a href="/rss.xml" class="social-link"> <span class="sr-only">RSS</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "rss", "class": "size-7" })} </a>`} </div>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/SocialLinks.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto pt-12 grow-0 flex flex-col gap-6 items-center justify-between max-w-full text-foreground/80"> ${config.socialLinks && renderTemplate`${renderComponent($$result, "SocialLinks", $$SocialLinks, { "socialLinks": config.socialLinks })}`} <div class="flex flex-col md:flex-row flex-wrap flex-1 items-center justify-center"> <span class="mx-5 hidden md:block"> :: </span> <span class="my-1"> ${config.author} © 2025
</span> <span class="mx-5 hidden md:block"> :: </span> <span class="my-1"></span> </div> </footer>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>\n  ;(function loadTheme() {\n    const pageDefaultTheme = document.documentElement.getAttribute('data-theme')\n    const pageDarkTheme = document.documentElement.getAttribute('data-dark-theme')\n    const pageLightTheme = document.documentElement.getAttribute('data-light-theme')\n    const pageThemeHash = document.documentElement.getAttribute('data-theme-hash')\n    if (!pageDefaultTheme || !pageDarkTheme || !pageLightTheme || !pageThemeHash) {\n      throw new Error('Theme attributes are required.')\n    }\n    const getStoredTheme = () => localStorage.getItem('data-theme')\n    let storedTheme = getStoredTheme()\n    const storedThemeHash = localStorage.getItem('data-theme-hash')\n    const themeHashMatches = storedThemeHash === pageThemeHash\n\n    if (!storedTheme || !storedThemeHash || !themeHashMatches) {\n      // Should be the first time loading the website\n      localStorage.setItem('data-theme', pageDefaultTheme)\n      localStorage.setItem('data-theme-hash', pageThemeHash)\n    }\n\n    if (\n      themeHashMatches &&\n      storedTheme &&\n      storedTheme !== 'auto' &&\n      storedTheme !== pageDefaultTheme\n    ) {\n      // The stored theme is different from the default theme, apply it\n      document.documentElement.setAttribute('data-theme', storedTheme)\n    } else if (pageDefaultTheme === 'auto' || storedTheme === 'auto') {\n      // If the default or stored theme is 'auto', apply the system preference\n      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')\n      document.documentElement.setAttribute(\n        'data-theme',\n        prefersDarkScheme.matches ? pageDarkTheme : pageLightTheme,\n      )\n      prefersDarkScheme.addEventListener('change', (e) => {\n        if (getStoredTheme() === 'auto') {\n          const newTheme = e.matches ? pageDarkTheme : pageLightTheme\n          document.documentElement.setAttribute('data-theme', newTheme)\n        }\n      })\n    }\n  })()\n<\/script>"])));
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/LightDarkAutoThemeLoader.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$SelectThemeLoader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<script>\n  ;(function loadTheme() {\n    const pageDefaultTheme = document.documentElement.getAttribute('data-theme')\n    const pageThemeHash = document.documentElement.getAttribute('data-theme-hash')\n    if (!pageDefaultTheme || !pageThemeHash) {\n      throw new Error('Theme attributes are required.')\n    }\n    const storedTheme = localStorage.getItem('data-theme')\n    const storedThemeHash = localStorage.getItem('data-theme-hash')\n    const themeHashMatches = storedThemeHash === pageThemeHash\n    if (!storedTheme || !storedThemeHash || !themeHashMatches) {\n      // Should be the first time loading the website\n      localStorage.setItem('data-theme', pageDefaultTheme)\n      localStorage.setItem('data-theme-hash', pageThemeHash)\n    }\n    if (themeHashMatches && storedTheme && storedTheme !== pageDefaultTheme) {\n      // The stored theme is different from the default theme, apply it\n      document.documentElement.setAttribute('data-theme', storedTheme)\n    }\n  })()\n<\/script>"])));
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/SelectThemeLoader.astro", void 0);

const $$Astro = createAstro("https://blog.imalixd.ir");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, tags, author } = Astro2.props;
  const pageUrl = new URL(Astro2.url.pathname, Astro2.site).href.replace(/\/$/, "");
  const pageType = Astro2.url.pathname.startsWith("/posts") ? "article" : "website";
  const pageTitle = title ? `${title} - ${config.title}` : config.title;
  const pageDescription = description || config.description;
  const pageAuthor = author || config.author;
  const pageImage = pageType === "article" ? Astro2.url.origin + Astro2.url.pathname.replace(/\/posts\//, "/social-cards/") + ".png" : `${Astro2.url.origin}/social-cards/__default.png`;
  const pageKeywords = [
    ...new Set(config.tags.concat(tags || []).map((word) => word.toLowerCase()))
  ].join(", ");
  const baseCssVars = {
    "theme-font": config.font,
    "ec-frm-frameBoxShdCssVal": "none",
    "ec-frm-edTabBrdRad": "0",
    "ec-frm-edTabBarBrdCol": "color-mix(in srgb, var(--theme-foreground), 10%, transparent)",
    "ec-brdCol": "color-mix(in srgb, var(--theme-foreground), 10%, transparent)"
  };
  let themeMode = config.themes.mode;
  if (config.themes.include.length < 1) {
    throw new Error("No themes defined in site.config. Please add at least one theme.");
  }
  let defaultTheme = config.themes.default;
  let includedThemes = config.themes.include;
  const themeNotIncluded = !includedThemes.includes(defaultTheme);
  if (themeNotIncluded || themeMode === "light-dark-auto") {
    console.warn(
      `Default theme "${defaultTheme}" not found in themes. Using first theme: "${config.themes.include[0]}".`
    );
    defaultTheme = config.themes.include[0];
  }
  let lightTheme = void 0;
  let darkTheme = void 0;
  const themeHash = crypto.createHash("md5").update(themeMode + defaultTheme + includedThemes.join("")).digest("hex").slice(0, 8);
  const resolvedThemes = await resolveThemeColorStyles(config.themes.include);
  let cssLines = [];
  for (const [themeId, themeStyles] of Object.entries(resolvedThemes)) {
    const relevantStyles = pick(themeStyles, [
      "foreground",
      "background",
      "accent",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "italic",
      "a",
      "hr",
      "blue",
      "green",
      "red",
      "yellow",
      "magenta",
      "cyan"
    ]);
    cssLines.push(`:root[data-theme="${themeId}"] {`);
    for (const [key, value] of Object.entries(relevantStyles)) {
      cssLines.push(`--theme-${key}: ${value};`);
    }
    cssLines.push(`}`);
  }
  let generatedCss = cssLines.join("\n");
  const $$definedVars = defineStyleVars([baseCssVars]);
  return renderTemplate`<html lang="en"${addAttribute(defaultTheme, "data-theme")}${addAttribute(darkTheme, "data-dark-theme")}${addAttribute(lightTheme, "data-light-theme")}${addAttribute(themeMode, "data-theme-mode")}${addAttribute(themeHash, "data-theme-hash")} data-astro-cid-sckkx6r4${addAttribute($$definedVars, "style")}> <head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="title"${addAttribute(pageTitle, "content")}><meta name="description"${addAttribute(pageDescription, "content")}><meta name="author"${addAttribute(pageAuthor, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta property="og:url"${addAttribute(pageUrl, "content")}><meta property="og:type"${addAttribute(pageType, "content")}>${pageImage && renderTemplate`<meta property="og:image"${addAttribute(pageImage, "content")}>`}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(pageDescription, "content")}>${pageImage && renderTemplate`<meta name="twitter:image"${addAttribute(pageImage, "content")}>`}<meta name="keywords"${addAttribute(pageKeywords, "content")}><link rel="canonical"${addAttribute(pageUrl, "href")}><link rel="sitemap" href="/sitemap-index.xml"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="alternate" type="application/rss+xml"${addAttribute(config.title, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><title>${pageTitle}</title><style>${unescapeHTML(generatedCss)}</style>${themeMode === "light-dark-auto"}${renderTemplate`${renderComponent($$result, "SelectThemeLoader", $$SelectThemeLoader, { "data-astro-cid-sckkx6r4": true })}`}<meta name="google-site-verification" content="a5Bdh50bfgRup5t45jfjPXAGv1Qd0F-8k_NYpy6Z_Mo">${renderHead()}</head> <body class="w-full h-full m-0 bg-background text-foreground" data-astro-cid-sckkx6r4${addAttribute($$definedVars, "style")}> <div class="flex flex-col max-w-3xl min-h-screen border-accent/10 m-auto py-5 px-4 sm:px-6 md:px-8 md:py-10" data-astro-cid-sckkx6r4${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} <main class="flex flex-col" data-astro-cid-sckkx6r4${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true })} </div>  </body> </html>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$Icon as a };
