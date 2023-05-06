import { writable } from 'svelte/store';

export const modal = writable({ id: '', open: false });
