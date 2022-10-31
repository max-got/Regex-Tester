<script lang="ts">
	import type { mdData, resultObjects } from '$lib/types'
	import Input from './RegexUtils/Input.svelte'
	import Result from './RegexUtils/Result.svelte'
	import Description from './RegexUtils/Description.svelte'
	import Code from './RegexUtils/Code.svelte'
	import anime from 'animejs'

	import { onMount, SvelteComponent } from 'svelte'
	import Tags from './RegexUtils/Tags.svelte'

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

	let regexValid: any

	$: regexValid = new RegExp(regex).test(stringToTest)
	$: stringToTest, regexNewLine()

	//textarea value
	let arr: Array<string> = []
	//Für Matches from arr
	let resultObj: resultObjects = [
		{
			index: 0,
			result: arr,
			valid: false
		}
	]
	onMount(async () => {
		arr = stringToTest.split(/\r?\n/)
		regexNewLine()
	})

	const regexNewLine = (): void => {
		//Textarea Input to Array in Array split by new line
		arr = stringToTest.split(/\r?\n/u)

		arr.forEach((item: string, index: number) => {
			let regexResult = item.match(regex)
			//Item darf nicht leer sein -> bspw. textarea ist leer
			if (item !== '') {
				//MATCH
				//Item muss ein Match haben -> bspw. item ist 'abc' und regex ist /[abc]/g
				if (regexResult !== null) {
					//add item to test
					if (item) {
						resultObj[index] = {
							index: index,
							result: [regexResult[0]],
							valid: true
						}
					}
				}
				//NO MATCH
				else {
					resultObj[index] = {
						index: index,
						result: [[item][0]],
						valid: false
					}
				}
			} else {
				resultObj[index] = {
					index: index,
					result: null,
					valid: false
				}
			}
		})

		//If item is empty and resultObj is longer than arr, delete the item with that index - vice versa
		if (arr.length !== resultObj.length) {
			resultObj.splice(arr.length, resultObj.length - arr.length)
		}

		//If last item is empty, delete it
		if (arr[0] !== '' && arr[arr.length - 1] === '') {
			resultObj.splice(arr.length - 1, 1)
		}

		resultObj.forEach((item, index) => {
			if (item.result === null && arr.length > resultObj.length) {
				resultObj.splice(index, 1)
				arr.splice(index, 1)
			}
		})
	}
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
	<Result label="Matches" value={resultObj} />
</div>
