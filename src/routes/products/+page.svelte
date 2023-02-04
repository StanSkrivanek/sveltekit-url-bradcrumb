<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	// console.log('🚀 ~ file: +page.svelte:3 ~ data', data);

	$: ({ products } = data);
</script>

<h1>Products</h1>

{#each products as { id, title, description }}
	<div>
		<h2><a href="/products/{id}">{title}</a></h2>
		<p>{description}</p>
	</div>
{/each}
