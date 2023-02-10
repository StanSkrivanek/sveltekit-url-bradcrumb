<script lang="ts">
	import "../app.css";
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	// export let data: any;
	// console.log('🚀 ~ file: +layout.svelte:4 ~ data', data)
	// $: ({ products } = data);
	// $: console.log('🚀 ~ file: +layout.svelte:6 ~  products', products);
</script>

<nav>
	<!-- <a href="/">Home</a> -->
	<a href="/products">Products</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</nav>
<Breadcrumb />
<main>
	<slot />
</main>

<style>
	body {
		font-family: 'Lato', sans-serif;
		font-size: 1.2rem;
		line-height: 1.5;
		color: #333;
		background: #f4f4f4;
	}
</style>
