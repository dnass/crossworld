import { geoTransverseMercator, geoNaturalEarth1, geoAlbers, geoConicEquidistant } from 'd3-geo';
import { feature } from 'topojson-client';
import map from 'world-atlas/countries-50m.json';

const { features } = feature(map, map.objects.countries);

export const countries = new Map(
	features.map((feature) => {
		let mainPath, restPath;

		if (feature.geometry.type === 'MultiPolygon') {
			feature.geometry.coordinates.sort(([a], [b]) => b.length - a.length);
			const [firstSegment, ...rest] = feature.geometry.coordinates;
			mainPath = { type: 'Feature', geometry: { type: 'Polygon', coordinates: firstSegment } };
			restPath = { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: rest } };
		} else {
			mainPath = feature.geometry;
		}

		return [
			feature.id,
			{
				id: feature.id,
				name: feature.properties.name,
				mainPath,
				restPath,
				wholePath: feature,
			},
		];
	})
);

const replacements = {
	'Is.': 'Islands',
	'I.': 'Island',
	'N.': 'North',
	'W.': 'West',
	'E.': 'East',
	'S. Sudan': 'South Sudan',
	'Barb.': 'Barbuda',
	'Herz.': 'Herzegovina',
	'Dem. Rep.': 'Democratic Republic of the',
	'Rep.': 'Republic',
	'Fr.': 'French',
	'St. Vin. and Gren.': 'St. Vincent and the Grenadines',
	'Eq.': 'Equatorial',
	'Ter.': 'Territory',
};

export const countryList = features
	.map((country) => {
		const name = Object.entries(replacements).reduce(
			(name, [string, sub]) => name.replace(string, sub),
			country.properties.name
		);

		const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');

		return { id: country.id, name, cleanName };
	})
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
	geoAlbers,
	geoConicEquidistant,
};
