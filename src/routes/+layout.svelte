<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { writable } from 'svelte/store';
	// $: console.log('LAYOUT', $page);

	// set Store that will hold array of objects with `href` and `text` properties
	const bc = writable([] as { href: string; text: string }[]);

	// reactive path will change on each page change
	$: path = $page.url.pathname;
	// when reactive path is send to getBreadCrumbs function it will return array of objects with href and text properties for each breadcrumb. Because of  we set $:bc also to be reactive it will be change on each patch change.
	$: $bc = getBreadCrumbs(path);

	// function that will return array of objects with href and text properties for each breadcrumb
	function getBreadCrumbs(path: string) {
		// split path by / and filter out empty strings
		const pathParts = path.split('/').filter((part) => part?.trim() !== '');
		// map over pathParts and return `Object` with `href` and `text` properties
		const refs = pathParts.map((item, idx) => {
			return {
				href: `/${pathParts.slice(0, idx + 1).join('/')}`,
				text: item
			};
		});
		// return array of objects
		return refs;
	}
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
	<a href="/products">Products</a>
</nav>
<Breadcrumb />
<main>
	<slot />
</main>

