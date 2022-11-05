<script lang="ts">
	import { tagFilter } from '$lib/stores/tagFilter'
	import Select from 'svelte-select'
	import Tag from 'phosphor-svelte/lib/Tag'
	import XCircle from 'phosphor-svelte/lib/XCircle'
	import X from 'phosphor-svelte/lib/X'
	import anime from 'animejs'
	import { fade } from 'svelte/transition'

	export let tags: Array<string> = []
	export let tagFilterArray: Array<string> = []

	let showButton = false
	let selectEl: HTMLDivElement

	function hideAndShow() {
		let currentOpacity = anime.get(selectEl, 'opacity')
		let wantedOpacity = currentOpacity === 0 ? 1 : 0
		//work with translate to hide and show the element
		if (currentOpacity == 1) {
			anime({
				targets: selectEl,
				translateY: [0, 10],
				opacity: wantedOpacity,
				duration: 200,
				easing: 'easeInOutQuad',
				complete: () => {
					anime.set(selectEl, { display: 'none' })
				}
			})
		} else {
			anime.set(selectEl, { display: 'block' })
			anime.set(selectEl, { zIndex: 10 })
			anime({
				targets: selectEl,
				translateY: [-10, 0],
				translateX: [0, 0],
				opacity: [0, 1],
				duration: 200,
				easing: 'easeInOutQuad'
			})
		}

		showButton = !showButton
	}

	tagFilter.subscribe((value) => {
		tagFilterArray = value
	})
	//Change +/- if one tag is selected
	$: if (tagFilterArray.length > 0) {
		showButton = true
	}
	//Show the select element, if min. 1 tag is selected
	//Check if SelectElement is already visible
	$: if (tagFilterArray.length > 0) {
		if (selectEl.style.opacity == '0' || selectEl.style.opacity == '') {
			anime.set(selectEl, { display: 'block' })
			anime.set(selectEl, { zIndex: 10 })
			anime({
				targets: selectEl,
				translateY: [-10, 0],
				translateX: [0, 0],
				opacity: [0, 1],
				duration: 200,
				easing: 'easeInOutQuad'
			})
		}
	}
	$: selectValue = tagFilterArray.length > 0 ? tagFilterArray : null

	const handleSelect = (e: CustomEvent) => {
		let eTagArray: Array<{ index: number; label: string; value: string }> =
			e.detail
		tagFilter.update(() => {
			return [...eTagArray.map((e) => e.value)]
		})
	}

	const handleClear = (e: CustomEvent) => {
		let clickedTag: { label: string; value: string } = e.detail
		if (e.detail === null) tagFilter.set([])
		tagFilter.update((tagFilterArray) => {
			return tagFilterArray.filter((tag) => tag !== clickedTag.value)
		})
	}
</script>

<div
	class="selectTags relative mr-auto grid w-full grid-rows-2 gap-2 lg:grid-cols-2 lg:grid-rows-1"
>
	<button
		class="row-start-2 row-end-2  max-w-[10rem] lg:col-start-1 lg:col-end-1 lg:row-span-1 lg:ml-0"
		on:click={hideAndShow}
		transition:fade={{ delay: 500 }}>Filter {showButton ? '-' : '+'}</button
	>
	<div
		class="z-10 row-span-2 hidden w-full opacity-0 lg:col-start-2 lg:col-end-2 lg:row-span-1 lg:self-center"
		bind:this={selectEl}
	>
		<Select
			items={tags}
			class="z-index-10 border-black bg-black-dark text-black transition-all"
			multiple
			placeholder="Tags auswählen"
			value={selectValue}
			searchable={false}
			on:select={handleSelect}
			on:clear={handleClear}
		>
			<div slot="prepend" class="mr-2 text-highlight">
				<Tag weight="fill" />
			</div>
			<div slot="empty" class="p-4 text-center text-white-dark">
				Keine weiteren Tags verfügbar
			</div>
			<div slot="multi-clear-icon" class="text-highlight">
				<XCircle weight="fill" />
			</div>
			<div slot="clear-icon" class="text-white"><X size="1.2em" /></div>
		</Select>
	</div>
</div>

<style lang="postcss">
	.selectTags {
		--multi-item-bg: theme(colors.black.DEFAULT);
		--multi-item-clear-icon-color: theme(colors.highlight.DEFAULT);
		--clear-icon-width: theme(fontSize.sm);
		--item-color: theme(colors.white.DEFAULT);
		--multi-item-border-radius: theme(borderRadius.DEFAULT);
		--border-radius: theme(borderRadius.DEFAULT);
		--background: theme(colors.black.light);
		--list-background: theme(colors.black.light);
		--item-hover-bg: theme(colors.black.light);
		--item-hover-color: theme(colors.highlight.DEFAULT);
	}

	:global(.selectTags .svelte-select) {
		border: var(--border, 1px solid theme(colors.second.DEFAULT)) !important ;
	}

	:global(.selectTags .svelte-select .multi-item) {
		cursor: pointer !important;
		outline-color: transparent !important;
	}
</style>
