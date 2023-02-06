<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { productsStore, selectedCategoryStore } from '$lib/stores/productsStore';
	import { writable } from 'svelte/store';

	const bc = writable([] as { href: string; text: string }[]);
	let productCategories = productCategory();

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);
	$: selected = 'all';

	// Stores
	$productsStore = $page.data.products || selected;
	$selectedCategoryStore = selected;

	$: console.log('🚀 ~ file: Breadcrumb.svelte:16 ~ productsStore', $productsStore);

	// ctrate breadcrumbs array from path
	function getBreadCrumbs(path: string) {
		const pathParts = path.split('/').filter((part) => part?.trim() !== '');

		const refs = pathParts.map((item, idx) => {
			if (parseInt(item)) {
				let title = productTitle();
				item = title;
			}
			return {
				href: `/${pathParts.slice(0, idx + 1).join('/')}`,
				text: item
			};
		});
		return refs;
	}
	// get current product title
	function productTitle() {
		const currProduct = $page.data?.products?.filter(
			({ id }: any) => id?.toString() === $page.params?.id
		)[0];

		return currProduct.title;
	}
	// create a new array of products categories as new Set to remove duplicates
	function productCategory() {
		const productsList = $page.data?.products;
		let prodCategories: string[] = [];

		productsList.forEach((product: any) => {
			prodCategories = [...(new Set([...prodCategories, product.category]) as Set<string>)];
		});

		return prodCategories;
	}

	// filter products by category

	function filterProducts(selected: any) {
		if (selected === 'all') {
			return ($productsStore = $page.data.products);
		}
		$productsStore = $page.data.products.filter((product: any) => {
			if (product.category === selected) {
				return product;
			}
		});
		goto('/products');
	}

	// TODO:
	// DONE: 1. on crumb (anchor) click reset the selected value to 'all' and show all products
	// DONE 2. on select change remove single product (last crumb) [goto ???]
	// 3. on product link click change selet option

	function resetPath() {
		selected = 'all';
		$productsStore = $page.data.products;
	}
</script>

<nav aria-label="breadcrumbs">
	<ol class="breadcrumbs">
		<li>
			<a href="/"> Home </a>
		</li>
		{#each $bc as crumb}
			<li>
				<a href={crumb?.href} on:click={resetPath}>{crumb?.text}</a>
				{#if crumb?.text === 'products'}
					<select bind:value={selected} on:change={() => filterProducts(selected)}>
						<option value="all">all</option>
						{#each productCategories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	ol {
		padding: 0;
	}
	.breadcrumbs {
		display: flex;
		background-color: #ddd;
		padding: 8px 16px;
	}

	.breadcrumbs li {
		list-style: none;
	}

	.breadcrumbs li:not(:first-child):before {
		content: '/';
		display: inline-flex;
		margin-right: 8px;
	}

	.breadcrumbs li:not(:last-child) {
		margin-right: 8px;
	}
	.breadcrumbs li a {
		color: #757575;
		text-decoration: none;
	}

	.breadcrumbs li a:hover {
		color: #000;
		text-decoration: underline;
	}
</style>
