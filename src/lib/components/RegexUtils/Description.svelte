<script lang="ts">
	import type { mdData } from '$lib/types'
	import { onMount } from 'svelte'
	import CaretUp from 'phosphor-svelte/lib/CaretUp'
	import CaretDown from 'phosphor-svelte/lib/CaretDown'

	import { slide } from 'svelte/transition'

	import Prism from 'prismjs'
	import 'prismjs/themes/prism.css'
	import 'prismjs/components/prism-javascript'
	import 'prismjs/components/prism-typescript'

	export let md: mdData['md']
	let description: HTMLDivElement
	let showDescription: boolean = false
	let showDescriptionIcon: any = CaretDown

	function toggleDescription() {
		showDescription = !showDescription
		if (showDescription) {
			showDescriptionIcon = CaretUp
		} else {
			showDescriptionIcon = CaretDown
		}
	}

	onMount(() => {
		Prism.highlightAll()
	})
</script>

<div class="_animate relative">
	<h2 class="ss text-2xl text-second">
		{md?.metadata?.title}
	</h2>
	<span id="line" class="absolute left-0 bottom-0 h-[2px] w-full bg-black" />
	<div>
		<h3>Beschreibung:</h3>
		<p>{md?.metadata?.description}</p>
	</div>
	{#if md?.compiled}
		<div class="flex items-center">
			<h4>Mehr Informationen:</h4>
			<button
				on:click={toggleDescription}
				class="m-0 mb-3 w-fit bg-transparent p-0 px-1 text-lg font-semibold text-third focus:outline-none"
			>
				<div
					style="transition: all 300ms ease; transform: rotate({showDescription
						? '180deg'
						: '0deg'});"
				>
					<svelte:component this={CaretDown} weight="bold" size="1.25em" />
				</div>
			</button>
		</div>
		{#if showDescription}
			<div
				class="desc w-full  overflow-hidden transition-[height]"
				bind:this={description}
				transition:slide
			>
				{@html md?.compiled}
			</div>
		{/if}
	{/if}
</div>

<style lang="postcss">
	:global(.desc blockquote) {
		@apply my-4 border-l-4 border-third-light bg-black-light/10 p-4;
	}

	:global(.desc blockquote p) {
		@apply mb-0 text-base font-medium italic leading-relaxed text-black-light;
	}

	:global(.desc blockquote p a) {
		@apply text-highlight-dark;
	}

	:global(.desc p code) {
		@apply rounded bg-black-light/10 p-1 px-1 text-third;
	}
</style>
