const __ASTRO_IMAGE_IMPORT_Z1Glz99 = new Proxy({"src":"/avatar.jpg","width":1280,"height":1280,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/AliLotfi/Desktop/myblog/src/content/avatar.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/AliLotfi/Desktop/myblog/src/content/avatar.jpg");
							return target[name];
						}
					});

const __ASTRO_IMAGE_IMPORT_Z190lSx = new Proxy({"src":"/PixelatedGreenTreeSide.png","width":287,"height":304,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/AliLotfi/Desktop/myblog/src/content/posts/showing-off-blog-features/PixelatedGreenTreeSide.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/AliLotfi/Desktop/myblog/src/content/posts/showing-off-blog-features/PixelatedGreenTreeSide.png");
							return target[name];
						}
					});

const __ASTRO_IMAGE_IMPORT_1W6MYL = new Proxy({"src":"/cover.jpg","width":640,"height":676,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/AliLotfi/Desktop/myblog/src/content/posts/showing-off-blog-features/cover.jpg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/AliLotfi/Desktop/myblog/src/content/posts/showing-off-blog-features/cover.jpg");
							return target[name];
						}
					});

const contentAssets = new Map([["./avatar.jpg?astroContentImageFlag=&importer=src%2Fcontent%2Faddendum.md", __ASTRO_IMAGE_IMPORT_Z1Glz99], ["PixelatedGreenTreeSide.png?astroContentImageFlag=&importer=src%2Fcontent%2Fposts%2Fshowing-off-blog-features%2Findex.md", __ASTRO_IMAGE_IMPORT_Z190lSx], ["./cover.jpg?astroContentImageFlag=&importer=src%2Fcontent%2Fposts%2Fshowing-off-blog-features%2Findex.md", __ASTRO_IMAGE_IMPORT_1W6MYL]]);

export { contentAssets as default };
