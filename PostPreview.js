import { b as createAstro, c as createComponent, m as maybeRenderHead, d as renderSlot, e as addAttribute, a as renderTemplate, r as renderComponent } from './astro/server.js';
import 'kleur/colors';
import { a as $$Icon } from './Layout.js';
import { a as renderEntry, d as dateString } from './utils.js';
import 'clsx';

const $$Astro$2 = createAstro("https://blog.imalixd.ir");
const $$Tags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Tags;
  const { tags } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap gap-3 text-sm"> ${renderSlot($$result, $$slots["default"])} ${tags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${encodeURIComponent(tag)}`, "href")} class="py-1 px-3 bg-accent/1 hover:bg-accent/8 border-1 border-accent/20 text-accent/90 rounded-2xl transition-colors"> ${tag} </a>`)} </div>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/Tags.astro", void 0);

const $$Astro$1 = createAstro("https://blog.imalixd.ir");
const $$PostInfo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostInfo;
  const { post, class: className } = Astro2.props;
  const { remarkPluginFrontmatter } = await renderEntry(post);
  const { minutesRead } = remarkPluginFrontmatter;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([className, "text-foreground/80"], "class:list")}> <time>${dateString(post.data.published)}</time> ${post.data.author && renderTemplate`<span class="before:content-['::'] before:inline-block before:mx-0.5"> ${post.data.author} </span>`} ${minutesRead && renderTemplate`<span class="before:content-['::'] before:inline-block before:mx-0.5"> ${minutesRead} </span>`} </div>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/PostInfo.astro", void 0);

const $$Astro = createAstro("https://blog.imalixd.ir");
const $$PostPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostPreview;
  const { post } = Astro2.props;
  const { remarkPluginFrontmatter } = await renderEntry(post);
  const description = remarkPluginFrontmatter.description || post.data.description;
  return renderTemplate`${maybeRenderHead()}<article class="w-full py-5 my-1 md:my-4 border-accent/10"> <h1 class="mb-3 text-2xl text-[var(--theme-h1)] font-semibold"> <a${addAttribute(`/posts/${post.id}`, "href")}># ${post.data.title}</a> </h1> ${renderComponent($$result, "PostInfo", $$PostInfo, { "post": post, "class": "my-3" })} ${description && renderTemplate`<p class="my-4 text-base/7 text-foreground">${description}</p>`} ${post.data.tags && renderTemplate`<div class="mb-6"> ${renderComponent($$result, "Tags", $$Tags, { "tags": post.data.tags })} </div>`} <div> <a class="button flex items-center"${addAttribute(`/posts/${post.id}`, "href")}>
Read
${renderComponent($$result, "Icon", $$Icon, { "name": "chevrons-right", "class": "size-5 ml-2" })} </a> </div> </article>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/PostPreview.astro", void 0);

export { $$PostInfo as $, $$Tags as a, $$PostPreview as b };
