<script lang="ts">
	import { page } from '$app/stores';
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
