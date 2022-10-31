<script lang="ts">
	import { onMount } from 'svelte'
	import RegexColorizer from '$lib/components/utils/regex/regexColorizer'

	export let regex: string

	const regexExp = new RegExp(regex, 'g')

	onMount(() => {
		RegexColorizer.colorizeAll()
	})
</script>

<div class="code _animate w-full">
	<h3 class="uppercase text-highlight">Regulärer Ausdruck:</h3>
	<div class="flex w-full flex-col gap-2">
		<pre
			class="line-numbers scrollbar-thin overflow-x-auto rounded bg-black text-lg text-white"><code
				class="regex m-auto flex min-h-[5rem] items-center rounded-sm p-2"
				>{regexExp}</code
			></pre>
	</div>
</div>

<style lang="postcss" global>
	.code {
		opacity: 1;
	}
	pre {
		scrollbar-width: thin;
		scrollbar-width: none;
	}
	pre::-webkit-scrollbar {
		width: 0.5rem;
	}
	.regex {
		font-family: Monospace;
	}
	.regex b {
		@apply text-codeMetasequence;
	} /* metasequence */
	.regex i {
		@apply text-codeCharClass;
	} /* char class */
	.regex i b {
		@apply text-codeCharClassMetaSequence;
	} /* char class: metasequence */
	.regex i u {
		@apply text-codeRangeHyphen;
	} /* char class: range-hyphen */
	.regex b.g1 {
		@apply text-codeDepth1;
	} /* group: depth 1 */
	.regex b.g2 {
		@apply text-codeDepth2;
	} /* group: depth 2 */
	.regex b.g3 {
		@apply text-codeDepth3;
	} /* group: depth 3 */
	.regex b.g4 {
		@apply text-codeDepth4;
	} /* group: depth 4 */
	.regex b.g5 {
		@apply text-codeDepth5;
	} /* group: depth 5 */
	.regex b.err {
		@apply text-codeError;
	} /* error */
	.regex b,
	.regex i,
	.regex u {
		font-weight: normal;
		font-style: normal;
		text-decoration: none;
	}
</style>
