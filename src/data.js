import { feature } from 'topojson-client';
import map from 'world-atlas/countries-50m.json';

export const countries = feature(map, map.objects.countries).features;

export const countryList = countries
	.map((country) => ({
		id: country.id,
		name: country.properties.name
	}))
	.sort((a, b) =>
		a.name.toLowerCase() > b.name.toLowerCase()
			? 1
			: a.name.toLowerCase() < b.name.toLowerCase()
			? -1
			: 0
	);
