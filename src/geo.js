import { geoTransverseMercator, geoNaturalEarth1, geoAlbers } from 'd3-geo';
import { feature } from 'topojson-client';
import map from 'world-atlas/countries-50m.json';

const { features } = feature(map, map.objects.countries);

export const countries = new Map(features.map((d) => [d.id, d]));

export const countryList = features
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

export const projections = {
	geoTransverseMercator,
	geoNaturalEarth1,
	geoAlbers
};
