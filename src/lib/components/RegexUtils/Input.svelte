<script lang="ts">
	export let label: string
	export let disabled: boolean = false
	export let textarea: string = ''

	// Make label ID ready for use in HTML
	const labelId = label.replace(/\s/g, '').toLowerCase()
</script>

<div id={labelId} class="{labelId} _animate my-4 flex flex-col">
	<label class="" for={labelId}>
		{label}:<br />
	</label>
	<div class="flex flex-col gap-2">
		<textarea
			name={labelId}
			type="text"
			{disabled}
			bind:value={textarea}
			spellcheck="false"
			rows="5"
		/>
		<span class="w-fit text-center text-[10px] text-offwhite-light"
			>"Enter" um eine neue Zeile zu testen</span
		>
	</div>
</div>

<style lang="postcss">
	label {
		margin-bottom: 0.5rem;
	}

	textarea {
		@apply rounded border border-third p-1 font-light text-black;
	}

	textarea:focus {
		@apply p-1 shadow-md shadow-highlight outline-third;
	}
	textarea:focus-visible {
		@apply outline-none;
	}

	textarea:disabled {
		@apply cursor-not-allowed border-black-light bg-offwhite bg-opacity-20 text-offwhite-dark text-opacity-50;
	}
</style>
