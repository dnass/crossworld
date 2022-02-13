export const smartquotes = (str) =>
	str
		.replace(/(^|[-\u2014\s(\["])'/g, '$1\u2018')
		.replace(/'/g, '\u2019')
		.replace(/(^|[-\u2014/\[(\u2018\s])"/g, '$1\u201c')
		.replace(/"/g, '\u201d')
		.replace(/--/g, '\u2014');
