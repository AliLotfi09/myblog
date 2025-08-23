import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server.js';
import 'kleur/colors';
import { b as $$PostPreview } from './PostPreview.js';

const $$Astro = createAstro("https://blog.imalixd.ir");
const $$PostPreviewsWithYear = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostPreviewsWithYear;
  const { posts, yearMarkers, class: className } = Astro2.props;
  let currentYear = 0;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(className, "class")}> ${posts.map((post) => {
    const yearPublished = post.data.published.getFullYear();
    if (yearMarkers && yearPublished !== currentYear) {
      currentYear = yearPublished;
      return renderTemplate`<div> <div class="text-2xl pb-3 my-7 text-foreground/50 border-b-4 border-dotted border-foreground/20"> ${yearPublished} </div> ${renderComponent($$result, "PostPreview", $$PostPreview, { "post": post })} </div>`;
    }
    return renderTemplate`${renderComponent($$result, "PostPreview", $$PostPreview, { "post": post })}`;
  })} </div>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/PostPreviewsWithYear.astro", void 0);

export { $$PostPreviewsWithYear as $ };
