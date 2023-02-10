<script lang="ts">
	import { productsStore, disabledCrumb } from '$lib/stores/productsStore';

	function disableCrumbLink() {
		$disabledCrumb = true;
	}
</script>

<h1>Products</h1>
<div class="product-grid">
	{#each $productsStore as { id, title, description, thumbnail }}
		<div class="product-row">
			<div class="img__w">
				<img src={thumbnail} alt="" />
			</div>
			<div class="product-info">
				<h2><a href="/products/{id}" on:click={disableCrumbLink}>{title}</a></h2>
				<p>{description}</p>
			</div>
		</div>
	{/each}
</div>

<style>

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		grid-gap: 1rem;
	}
	.product-row {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		border: 1px solid #ddd;
	}

	.img__w {
		min-width: 200px;
		height: 200px;
		overflow: hidden;
		padding: 0.5rem;
	}

	.img__w img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.product-info {
		margin-left: 2rem;
	}

	.product-info h2 {
		margin-bottom: 0.5rem;
	}

	.product-info p {
		margin-bottom: 0;
	}
</style>
