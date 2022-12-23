import { minify } from 'html-minifier';
import { building } from '$app/environment';
 
const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  // ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true, // some hydration code needs comments, so leave them in
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};
 

/**@type {import("@sveltejs/kit").Handle} */
export const handle = async ({ resolve, event }) => {
	const response = await resolve(event);

	if (response.headers.get("Content-Type") === "text/html") {
		return new Response(minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
};