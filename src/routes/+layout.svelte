<script lang="ts">
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
