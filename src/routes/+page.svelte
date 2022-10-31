<script lang="ts">
	import RegexCard from '$lib/components/RegexCard.svelte'
	import type { mdData, mdDatas } from '$lib/types'
	import inView from '$lib/actions/intersectionObserver'
	import TagSelect from '$lib/components/TagSelect.svelte'
	import type { SvelteComponent } from 'svelte'
	import { onMount } from 'svelte'
	import { quintOut, quadIn } from 'svelte/easing'

	import { crossfade, scale, fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import anime from 'animejs'
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quadIn,
				css: (t) => `
					transform: ${transform} scale(${t}) ;
					delay: ${t * 100}
					opacity: ${t};
				`
			}
		}
	})

	export let data: mdDatas
	const { markdown } = data

	let regexCards = markdown
	let tags: Array<string> = []
	tags = regexCards.map((item) => item.md.metadata.tags).flat()
	tags = [...new Set(tags)]
	tags.sort((a, b) => a.localeCompare(b))

	let filteredTags: Array<string> = []

	function getFilteredRegexCards(
		regexEl: Array<mdData>,
		tagToFilter: Array<string>
	) {
		let array: mdData[] = regexCards

		if (tagToFilter.length > 0)
			array = regexEl.filter((item) => {
				return tagToFilter.some((tag) => item.md.metadata.tags.includes(tag))
			})

		return array
	}

	let selectElement: SvelteComponent
	const children = {} as { [key: number]: HTMLElement }
	const animateChildren = (node: HTMLElement) => {
		if (node === undefined || node === null) return

		try {
			if (!node.getAttribute('data-animated')) {
				anime({
					targets: [node, node.querySelectorAll('._animate')],
					opacity: [0, 1],
					easing: 'easeInQuad',
					duration: 350,
					delay: anime.stagger(150),
					complete: () => {
						node.setAttribute('data-animated', 'true')
					}
				})
			}
		} catch (error) {
			//reload window
			console.log(error)
			window.location.reload()
		}
	}

	let showGrid = false
	onMount(() => {
		showGrid = true
	})
</script>

<section id="start" class="my-4 overflow-hidden p-4">
	<h1 class="text-center text-4xl font-bold">Regex Match</h1>
	<div class="ml-auto mb-2">
		<TagSelect
			{tags}
			bind:tagFilterArray={filteredTags}
			bind:this={selectElement}
		/>
	</div>

	{#if showGrid}
		<div
			id="grid"
			class="relative grid grid-cols-1 gap-5 overflow-hidden lg:grid-cols-2"
		>
			{#each getFilteredRegexCards(regexCards, filteredTags) as item, id (item.id)}
				<div
					class="_cardWrapper relative"
					out:send={{ key: item }}
					in:receive={{ key: item }}
					animate:flip={{ duration: 300 }}
					use:inView={{ top: 50 }}
					on:enter={() => animateChildren(children[id])}
				>
					<div bind:this={children[item.id]}>
						<RegexCard md={item.md} />
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
