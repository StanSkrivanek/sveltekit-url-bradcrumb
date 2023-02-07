<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { productsStore, selectedCategoryStore, disabledCrumb } from '$lib/stores/productsStore';
	import { writable } from 'svelte/store';

	const bc = writable([] as { href: string; text: string }[]);
	let productCategories = productCategory();

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);
	$: selected = 'all';

	// Stores
	$productsStore = $page.data.products || selected;
	$selectedCategoryStore = selected;

	// $: console.log('🚀 ~ file: Breadcrumb.svelte:168 ~ productsStore', $productsStore);
	$: console.log('🚀 ~ file: Breadcrumb.svelte:19 ~ disabledCrumb', $disabledCrumb);
	// ctrate breadcrumbs array from path
	function getBreadCrumbs(path: string) {
		const pathParts = path.split('/').filter((part) => part?.trim() !== '');

		const refs = pathParts.map((item, idx) => {
			// if parsing from number to string is successfull then it's a product id
			// so we need to get the product title and use it as a crumb text instead of id
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
		$disabledCrumb = false;
		goto('/products');
	}

	function resetPath() {
		selected = 'all';
		$productsStore = $page.data.products;
		$disabledCrumb = false;
	}
</script>

<nav aria-label="breadcrumbs">
	<ol class="breadcrumbs">
		<li>
			<a href="/"> Home </a>
		</li>
		{#each $bc as crumb, i}
		<!-- display only text if it is final link to product -->
			{#if i === $bc.length - 1 && $disabledCrumb === true}
				<li>
					{crumb?.text}
				</li>
			{:else}
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
			{/if}
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
