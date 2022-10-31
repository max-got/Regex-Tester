<script lang="ts">
	import robot from '$lib/assets/robot3.jpg'
	import { onMount } from 'svelte'
	import anime from 'animejs'

	let robotImg: HTMLImageElement
	let text: HTMLDivElement
	let links: HTMLDivElement

	onMount(async () => {
		let tl = anime.timeline({
			easing: 'easeInQuint',
			duration: 450
		})
		tl.add({
			targets: [robotImg, text],
			translateY: [100, 0],
			opacity: [0, 1]
		})

		tl.add({
			targets: [text.children],
			opacity: [0, 1],
			delay: anime.stagger(anime.random(150, 300))
		})
		tl.add({
			targets: links.children,
			opacity: [0, 1],
			delay: 200
		})
	})
</script>

<div
	class="relative my-4 mx-auto px-4 pt-2 sm:max-w-xl md:max-w-full md:px-8 lg:py-32 xl:px-20"
>
	<div class="mx-auto max-w-xl lg:max-w-screen-xl">
		<div class="mb-16 lg:mb-0 lg:max-w-lg">
			<div class="mb-6 max-w-xl" bind:this={text} style="opacity:0">
				<div>
					<p
						class="mb-4 inline-block rounded-full bg-second px-3 py-px text-xs font-semibold uppercase tracking-wider text-white"
					>
						Theorie der Informatik
					</p>
				</div>
				<h1
					class="text-gray-900 mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none"
				>
					Praxis<br class="hidden md:block" />
					<span class="inline-block text-third">regulärer Ausdrücke</span>
				</h1>
				<p class="text-white-dark md:text-lg">
					Hier habt ihr die Möglichkeit zu testen wie Regex bzw. RegExp
					funktioniert. <span class="text-third/30">*</span>
					<br class="mb-4 block" />
					<span class="text-white-dark/25"
						><span class="text-third/30">*</span> in Javascript</span
					>
				</p>
			</div>
			<div class="flex items-center" bind:this={links}>
				<a
					href="#start"
					style="opacity:0"
					class="focus:shadow-outline mr-6 inline-flex h-12 items-center justify-center rounded bg-highlight px-6 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-third-light focus:outline-none"
				>
					Jetzt testen
				</a>
				<a
					href="https://github.com/schietegal/Regex-Tester"
					aria-label="Github Link"
					style="opacity:0"
					class="inline-flex items-center font-semibold text-highlight transition-colors duration-200 hover:text-third-light"
					>Github</a
				>
			</div>
		</div>
	</div>
	<div
		class="flex h-full justify-center overflow-hidden lg:absolute lg:bottom-0 lg:right-0 lg:w-2/3 lg:items-end lg:justify-start xl:w-1/2"
	>
		<img
			src={robot}
			id="img"
			class="-mb-16 h-72 w-full max-w-xl rounded object-cover object-top shadow-2xl lg:ml-64 lg:-mb-24 lg:h-auto lg:max-w-screen-md  xl:ml-8 xl:-mb-28"
			alt="robot"
			style="opacity: 0;"
			bind:this={robotImg}
		/>
	</div>
</div>
