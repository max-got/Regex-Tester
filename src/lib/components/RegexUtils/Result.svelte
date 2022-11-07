<script lang="ts">
	import type { resultObjects } from '$lib/types'
	import Valid from 'phosphor-svelte/lib/Check'
	import Invalid from 'phosphor-svelte/lib/X'
	import { fly } from 'svelte/transition'

	export let label: string
	export let results: resultObjects
	results = Object.values(results)

	// Make label ID ready for use in HTML
	const labelId = label.replace(/\s/g, '').toLowerCase()
</script>

<div id={labelId} class="{labelId} _animate my-3 flex flex-col transition-all">
	<h4 class="text-highlight">
		{label}
	</h4>

	<div class="relative flex gap-2 overflow-hidden">
		<ul class="resultList list-inside text-black">
			<div>
				{#each results as item, i}
					{#if item.result !== ''}
						<li
							in:fly={{ y: 50, duration: 300 }}
							out:fly={{ x: 50, duration: 200 }}
							data-ln={i + 1}
						>
							<span>
								{#if item.valid}
									<svelte:component this={Valid} color="green" size="1.5em" />
								{:else}
									<svelte:component this={Invalid} color="red" size="1.5em" />
								{/if}
								{item.result}
							</span>
						</li>
					{/if}
				{/each}
			</div>
		</ul>
	</div>
</div>

<style lang="postcss">
	.resultList {
		display: flex;
		flex-direction: column-reverse;
		width: 100%;
		max-height: 20rem;
		overflow: scroll;
		scrollbar-width: none;
	}

	.resultList {
		@apply rounded p-3 font-light text-black shadow-[inset_-0_-1rem_1rem_theme(colors.black.light/0.15)];
	}
	.resultList::-webkit-scrollbar {
		display: none;
	}

	.resultList li {
		@apply flex flex-col text-black transition-all before:block before:text-xs before:font-thin before:text-black-light before:content-['Zeile_'attr(data-ln)':_'];
	}
	.resultList li span {
		@apply flex items-center gap-1;
	}
</style>
