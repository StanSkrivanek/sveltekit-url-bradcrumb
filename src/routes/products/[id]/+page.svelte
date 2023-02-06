<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	// export let data: PageData;
	import {productsStore, selectedCategoryStore} from '$lib/stores/productsStore';
	// console.log(data);
	const match = $productsStore.filter(({ id }) => id === id);
	// console.log('🚀 ~ file: +page.svelte:8 ~ match', match)

	
	const { title, description, category } = match[0] || {};
	// $productsStore = $page.data.products || selected;
</script>

<h1>Product</h1>

{#if match}
	<h2>{title}</h2>
	<h3>{category}</h3>
	<p>{description}</p>

{/if}
