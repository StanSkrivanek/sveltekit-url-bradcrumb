<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { productsStore, selectedCategoryStore, disabledCrumb } from '$lib/stores/productsStore';
	// import ChevronDown from '$lib/components/icons/ChevronDown.svelte';

	const bc = writable([] as { href: string; text: string }[]);
	let productCategories = productCategory();

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);
	$: selected = 'all';
	$: showOptions = false;
	// Stores
	$productsStore = $page.data.products || selected;
	// $selectedCategoryStore = selected;

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
		toggleOptions();
		goto('/products');
	}

	function resetPath() {
		selected = 'all';
		$productsStore = $page.data.products;
		$disabledCrumb = false;
	}

	function toggleOptions() {
		// const options = document.querySelector('.select-options');
		// options?.classList.toggle('show');
		showOptions = !showOptions;
	}
	function toggleOptionsByKey(e: any) {
		if (e.key === 'Enter') {
			toggleOptions();
		}
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
						<div class="select-holder">
							<div class="select-icon" on:click={toggleOptions} on:keyup={toggleOptionsByKey}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#ffffff"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
							{#if showOptions}
								<div class="select-options">
									{#each productCategories as category}
										<div class="radio">
											<label for={category}>
												<input
													type="radio"
													name="category"
													id={category}
													value={category}
													on:change={() => filterProducts(category)}
												/>
												{category}
											</label>
										</div>
									{/each}
								</div>
							{/if}
							<!-- <div class="select-options">
								{#each productCategories as category}
									<div class="radio">
										<label for={category}>
											<input
												type="radio"
												name="category"
												id={category}
												value={category}
												on:change={() => filterProducts(category)}
											/>
											{category}
										</label>
									</div>
								{/each}
							</div> -->
						</div>
					{/if}
				</li>
			{/if}
		{/each}
	</ol>
</nav>
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
	.select-holder {
		position: relative;
		/* background-color: #000; */
		/* min-width: 400px; */
	}
	.select-options {
		position: absolute;
		top: 32px;
		left: -120%;
		background-color: #e8e8e8;
		box-shadow: #00000041 3px 6px 9px 0;
		border-top: none;
		border-radius: 0.5rem;
		overflow: hidden;
		/* z-index: 1; */
	}
	/* hide radio */
	.breadcrumbs input[type='radio'] {
		display: none;
		width: 100%;
	}
	/* style rasdio  */
	.breadcrumbs .radio {
		border-bottom: 1px solid #e1e1e1;
		background-color: #e8e8e8;
	}
	.breadcrumbs .radio:last-child {
		border-bottom: none;
	}
	.breadcrumbs .radio label {
		display: block;
		padding: 12px 24px;
		min-width: 240px;
		background-color: #fefefe;
		word-wrap: none;
		white-space: nowrap;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}
	.breadcrumbs .radio label:hover {
		background-color: #efefef;
		color: #151515;
	}
	.select-icon {
		padding: 0 0.2rem;
		margin-left: 0.5rem;
		background: #959595;
		width: 16px;
		height: 100%;
		cursor: pointer;
	}
	.show {
		display: block;
	}
</style>
