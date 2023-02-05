<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	// console.log($page);
	const match = data?.products?.filter(({ id }) => id.toString() === $page.params.id);
	const { title, description, category } = match[0] || {};
</script>

<h1>Product</h1>

{#if match}
	<h2>{title}</h2>
	<h3>{category}</h3>
	<p>{description}</p>

{/if}
