<script lang="ts">
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	const bc = writable([] as { href: string; text: string }[]);

	$: path = $page.url.pathname;
	$: $bc = getBreadCrumbs(path);

	function getBreadCrumbs(path: string) {
		const pathParts = path.split('/').filter((part) => part?.trim() !== '');

		const refs = pathParts.map((item, idx) => {
			// check if item is a number
			if (parseInt(item)) {
				// if true replace it with product title
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

	function productTitle() {
		const match = $page.data?.products?.filter(
			({ id }: any) => id?.toString() === $page.params?.id
		)[0];
		return match.title;
	}
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
