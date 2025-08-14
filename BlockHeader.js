import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate, F as Fragment, d as renderSlot } from './astro/server.js';
import 'kleur/colors';
import { a as $$Icon } from './Layout.js';

const $$Astro = createAstro("https://blog.imalixd.ir");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { prevLink, prevText, nextLink, nextText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="my-5 flex flex-row flex-wrap gap-3 justify-center"> ${prevLink && renderTemplate`<a${addAttribute(prevLink, "href")} aria-label="Previous Page" class="button flex-row items-center justify-center w-full sm:w-min"> ${renderComponent($$result, "Icon", $$Icon, { "name": "chevrons-left", "class": "mr-2 text-xl" })} ${prevText || "Previous"} </a>`} ${nextLink && renderTemplate`<a${addAttribute(nextLink, "href")} aria-label="Next Page"${addAttribute([
    "button flex-row items-center justify-center w-full sm:w-min",
    prevLink && "ml-auto"
  ], "class:list")}> ${nextText || "Next"} ${renderComponent($$result, "Icon", $$Icon, { "name": "chevrons-right", "class": "ml-2 text-xl" })} </a>`} </div>`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/Pagination.astro", void 0);

const $$BlockHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 class="text-accent text-2xl pb-2.5 pl-1 mt-4 md:mt-7 font-semibold">${renderSlot($$result2, $$slots["default"])}</h1><div class="border-1 border-accent/30 rounded-xl h-1 w-full mb-2"></div>` })}`;
}, "C:/Users/AliLotfi/Desktop/myblog/src/components/BlockHeader.astro", void 0);

export { $$BlockHeader as $, $$Pagination as a };
