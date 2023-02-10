<script lang="ts">
	import "../app.css";
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
</script>

<nav>
	<!-- <a href="/">Home</a> -->
	<a href="/products">Products</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</nav>
<Breadcrumb />
<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		justify-content: end;
		align-items: center;
		padding: 1rem;
		background-color: #f5f5f5;
	}
	nav a {
		color: #333;
		text-decoration: none;
		margin-left: 1rem;
	}
	nav a:hover {
		color: #e38d1d;
	}
</style>
