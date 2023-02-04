<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
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

