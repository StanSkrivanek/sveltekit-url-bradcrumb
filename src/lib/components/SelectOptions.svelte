<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { productsStore, disabledCrumb } from '$lib/stores/productsStore';

	$: showOptions = false;
	let productCategories = productCategory();

	function productCategory() {
		const productsList = $page.data?.products;
		let prodCategories: string[] = [];

		productsList.forEach((product: any) => {
			prodCategories = [...(new Set([...prodCategories, product.category]) as Set<string>)];
		});

		return prodCategories;
	}

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
	function toggleOptions() {
		showOptions = !showOptions;
	}
	function toggleOptionsByKey(e: any) {
		if (e.key === 'Enter') {
			toggleOptions();
		}
	}
</script>

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
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
</div>

<style>
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
	input[type='radio'] {
		display: none;
		width: 100%;
	}
	/* style rasdio  */
	.radio {
		border-bottom: 1px solid #e1e1e1;
		background-color: #e8e8e8;
	}
	.radio:last-child {
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
</style>
