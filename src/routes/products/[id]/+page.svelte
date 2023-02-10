<script lang="ts">
	import { productsStore } from '$lib/stores/productsStore';

	const match = $productsStore.filter(({ id }) => id === id);
	const { title, description, category, thumbnail } = match[0] || {};
</script>

<h1>Product</h1>

{#if match}
	<div class="conatiner">
		<div class="image">
			<img src={thumbnail} alt={title} />
		</div>
		<div class="info">
			<h2>{title}</h2>
			<p><span>Category:</span> {category}</p>
			<p><span>Description:</span> {description}</p>
		</div>
	</div>
{/if}

<style>
	.conatiner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}

	.image {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.info {
		display: flex;
		flex-direction: column;
	}

	.info p {
		margin-bottom: 0.5rem;
	}

	.info p span {
		font-weight: bold;
	}
</style>