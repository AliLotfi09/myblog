import { n as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server.js';
import 'clsx';

const frontmatter = {
  "description": "My name is Ali Lotfi, a curious mind with a passion for learning and creating. I’ve always believed that creativity has no boundaries, whether it’s in art, design, or technology. Outside of my work,…",
  "minutesRead": "1 min read"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return createVNode(_components.p, {
    children: "My name is Ali Lotfi, a curious mind with a passion for learning and creating. I’ve always believed that creativity has no boundaries, whether it’s in art, design, or technology. Outside of my work, I enjoy exploring new ideas, solving challenges, and sharing what I learn with others. This blog is my personal space to express my thoughts, experiences, and the little stories that make life interesting."
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const url = "src/content/home.mdx";
const file = "C:/Users/AliLotfi/Desktop/myblog/src/content/home.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/AliLotfi/Desktop/myblog/src/content/home.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
