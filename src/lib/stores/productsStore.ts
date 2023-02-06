import { writable } from 'svelte/store';

const productsStore = writable([]);
const selectedCategoryStore = writable('all');

export  {productsStore, selectedCategoryStore};


