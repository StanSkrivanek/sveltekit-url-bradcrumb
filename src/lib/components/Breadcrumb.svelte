<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	console.log($page);
	const bc = writable([] as { href: string; text: string }[]);

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);

	let productCategories = productCategory();

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
	// get product title
	function productTitle() {
		const currProduct = $page.data?.products?.filter(
			({ id }: any) => id?.toString() === $page.params?.id
		)[0];

		return currProduct.title;
	}

	// create a new array of products categories as new Set to remove duplicates
	function productCategory() {
		const products = $page.data?.products;
		let prodCats: string[] = [];

		products.forEach((product: any) => {
			prodCats = [...(new Set([...prodCats, product.category]) as Set<string>)];
		});

		return prodCats;
	}
	
	// console.log('productCategories: ', productCategories);

	// TODO: create select element with product categories as options in breadcrumb
</script>

<nav aria-label="breadcrumbs">
	<ol class="breadcrumbs">
		<li><a href="/">HOME</a></li>
		{#each $bc as crumb}
			<li><a href={crumb?.href}>{crumb?.text}</a></li>
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
