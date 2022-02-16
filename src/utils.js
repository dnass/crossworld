import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const smartquotes = (str) =>
	str
		.replace(/(^|[-\u2014\s(\["])'/g, '$1\u2018')
		.replace(/'/g, '\u2019')
		.replace(/(^|[-\u2014/\[(\u2018\s])"/g, '$1\u201c')
		.replace(/"/g, '\u201d')
		.replace(/--/g, '\u2014');

export const localStore = (key, initialValue) => {
	const localValue = browser ? JSON.parse(localStorage.getItem(key)) : null;
	const store = writable(localValue || initialValue);

	store.subscribe((value) => {
		if (!browser) return;
		localStorage.setItem(key, JSON.stringify(value));
	});

	return store;
};

export const filledArray = (length, value) => new Array(length).fill(value);

export const trackEvent = (name, event_label) => {
	if (typeof gtag !== 'undefined') {
		gtag('event', name, { event_label });
	}
};
