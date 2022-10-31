<script>
	import thbLogo from '$lib/assets/thb_logo.svg'
</script>

<header>
	<nav class="border-gray-200 bg-black px-6 py-5">
		<div class="mx-auto flex max-w-screen-xl items-center justify-between ">
			<img
				src={thbLogo}
				class="mr-3 h-12 sm:h-16"
				alt="THBrandenburg"
				draggable="false"
			/>
			<div class="text-highlight flex flex-col items-center text-center text-xs">
				<p class="mb-0">Theorie der Informatik<br />"Praxis regulärer Ausdrücke"</p>
				<p class="text-highlight">von Max Gottschalk</p>
			</div>
		</div>
	</nav>
</header>

<style lang="postcss">
	nav {
		@apply border-third border-b-[1.333px];
	}
</style>
