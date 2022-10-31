<script>
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import Intro from '$lib/components/Intro.svelte'

	import '../app.css'
</script>

<noscript>
	<div id="wrapper">
		<h1>JavaScript is disabled</h1>
		<p>
			This app won't work properly without JavaScript enabled. Please enable it to
			continue.
		</p>
	</div>

	<style>
		#wrapper {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			background-color: #000;
			padding: 1rem;
		}
	</style>
</noscript>

<Header />
<Intro />

<main class="m-auto w-auto max-w-screen-xl">
	<slot />
</main>
<Footer />
