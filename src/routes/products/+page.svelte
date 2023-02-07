<script lang="ts">
	import { productsStore, disabledCrumb } from '$lib/stores/productsStore';

	function disableCrumbLink() {
		$disabledCrumb = true;
	}
</script>

<h1>Products</h1>

{#each $productsStore as { id, title, description }}
	<div>
		<!-- TODO: onclick make generated crumb disabled -->
		<h2><a href="/products/{id}" on:click={disableCrumbLink}>{title}</a></h2>
		<p>{description}</p>
	</div>
{/each}
