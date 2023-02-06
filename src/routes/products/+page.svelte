<script lang="ts">
	// import type { PageData } from './$types';
	import {productsStore, selectedCategoryStore} from '$lib/stores/productsStore';
	// export let data: PageData;
	// console.log('🚀 ~ file: +page.svelte:3 ~ data', data);

// interface Product {
//     id:                 number;
//     title:              string;
//     description:        string;
//     price:              number;
//     discountPercentage: number;
//     rating:             number;
//     stock:              number;
//     brand:              string;
//     category:           string;
//     thumbnail:          string;
//     images:             string[];
// }

	// $productsStore = data.products as Product[];

	// function changeSelect(e: any) {
	// 	e.preventDefault();
	// 	// const id = e.target.href.split('/').pop();
	// 	// $productsStore = $productsStore.filter(({ id: prodId }) => prodId === id);
	// }

</script>

<h1>Products</h1>

{#each $productsStore as { id, title, description }}
	<div>
		<h2><a href="/products/{id}" >{title}</a></h2>
		<p>{description}</p>
	</div>
{/each}
