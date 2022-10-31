import { writable, type Writable } from 'svelte/store';


export const tagFilter = writable([]) as Writable<Array<string>>;
