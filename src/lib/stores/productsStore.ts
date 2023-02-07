import { writable } from 'svelte/store';

const productsStore = writable([]);
const selectedCategoryStore = writable('all');
const disabledCrumb = writable(false);
export { productsStore, selectedCategoryStore, disabledCrumb };


