import { visit } from 'unist-util-visit';

/**
 * Remark plugin that escapes characters problematic for Svelte/mdsvex in text nodes.
 * - { and } are Svelte expression delimiters
 * - < and > in text can be parsed as HTML/component tags
 */
export function remarkEscapeSvelte() {
	return (tree) => {
		visit(tree, 'text', (node) => {
			node.value = node.value
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/\{/g, '&lbrace;')
				.replace(/\}/g, '&rbrace;');
		});
	};
}
