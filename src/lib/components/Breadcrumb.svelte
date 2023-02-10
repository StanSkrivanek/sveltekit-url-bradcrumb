<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { productsStore, disabledCrumb } from '$lib/stores/productsStore';
	import SelectOptions from './SelectOptions.svelte';

	const bc = writable([] as { href: string; text: string }[]);

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);
	$: selected = 'all';
	$productsStore = $page.data.products || selected;

	$: console.log('🚀 ~ file: Breadcrumb.svelte:19 ~ disabledCrumb', $disabledCrumb);
	
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
			{#if i === $bc.length - 1 && $disabledCrumb === true}
				<li>
					{crumb?.text}
				</li>
			{:else}
				<li>
					<a href={crumb?.href} on:click={resetPath}>{crumb?.text}</a>
					{#if crumb?.text === 'products'}
						<SelectOptions />
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
		display: flex;
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
