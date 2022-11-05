<script lang="ts">
	import type { mdData, resultObjects } from '$lib/types'
	import Input from './RegexUtils/Input.svelte'
	import Result from './RegexUtils/Result.svelte'
	import Description from './RegexUtils/Description.svelte'
	import Code from './RegexUtils/Code.svelte'
	import anime from 'animejs'

	import { onMount } from 'svelte'
	import type { SvelteComponent } from 'svelte'
	import Tags from './RegexUtils/Tags.svelte'
	import matchTextAreaValue from '$lib/utils/regex/matchTextAreaValue'

	export let md: mdData['md']

	export let stringToTest = md?.metadata?.testString
	export let regex: string = md?.metadata?.regex ? md?.metadata?.regex : 'abc'

	let tags = md?.metadata?.tags ? md?.metadata?.tags : []

	let parent: HTMLElement
	let description: SvelteComponent
	let tagComponent: SvelteComponent

	let animated = false
	export const fadeIn = () => {
		if (!animated) {
			tagComponent.fadeInTags()
			anime({
				targets: parent.children,
				opacity: [0, 1],
				duration: 800,
				easing: 'easeInCubic',
				delay: anime.stagger(anime.random(100, 300)),
				complete: () => {
					animated = true
				}
			})
		}
	}

	$: results = matchTextAreaValue(stringToTest, new RegExp(regex, 'g'))

	let regexValid: any
	$: regexValid = new RegExp(regex).test(stringToTest)
</script>

<div
	id="parent"
	class="relative flex flex-col gap-4 overflow-hidden rounded bg-white p-8 text-black md:flex-col"
	bind:this={parent}
>
	<Tags {tags} bind:this={tagComponent} />
	<Description {md} bind:this={description} />
	<Code {regex} />
	<Input label="Eingabe" bind:textarea={stringToTest} />
	<Result label="Matches" {results} />
</div>
