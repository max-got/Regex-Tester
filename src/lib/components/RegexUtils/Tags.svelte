<script lang="ts">
	export let tags: Array<string>
	import Tag from 'phosphor-svelte/lib/Tag'
	import XCircle from 'phosphor-svelte/lib/XCircle'

	import { tagFilter } from '$lib/stores/tagFilter'

	let tagParent: HTMLElement

	let tagFilterArray: Array<string> = []
	tagFilter.subscribe((value) => {
		tagFilterArray = value
	})

	function addTag(tag: string) {
		tagFilter.update((value) => {
			if (!value.includes(tag)) {
				value.push(tag)
			} else {
				value = value.filter((t) => t !== tag)
			}

			return value
		})
	}
</script>

{#if tags.length > 0}
	<div
		class="_animate mt-[-1em] ml-auto flex gap-2 font-semibold uppercase text-white"
		bind:this={tagParent}
	>
		{#each tags as tag}
			<button
				class="group m-0 flex items-center rounded bg-black px-2 py-1 text-xs shadow transition-colors hover:bg-black-light"
				aria-label="Add {tag} to filter"
				on:click={() => addTag(tag)}
				><span
					class="mr-1 text-highlight transition-colors group-hover:text-third-light"
				>
					{#if tagFilterArray.includes(tag)}
						<XCircle weight="fill" />
					{:else}
						<Tag weight="fill" />
					{/if}
				</span>{tag}</button
			>
		{/each}
	</div>
{/if}
