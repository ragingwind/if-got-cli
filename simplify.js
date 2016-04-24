'use strict';

function extractSize(icon, max) {
	return max ? icon.raster_sizes.reduce((p, c) => {
		if (max === c.size) {
			return c;
		} else if (max > c.size) {
			p = c;
			return p;
		}

		return p;
	}) : icon.raster_sizes.pop();
}

function map(arr, exp) {
	return arr.map(e => exp(e)).join('\n');
}

function mapByName(arr) {
	return map(arr, e => {
		return e.name;
	});
}

const Parser = {
	categories: res => {
		return mapByName(res.categories);
	},
	icons: (res, opts) => {
		return map(res.icons || [res], i => {
			return extractSize(i, opts.maximum_size).formats.pop().preview_url;
		});
	},
	iconsets: res => {
		return map(res.iconsets || [res], (i) => {
			return `${i.name}(${i.iconset_id}) by ${i.author.name}`;
		});
	},
	styles: res => {
		return mapByName(res.styles || [res]);
	},
	users: res => {
		return mapByName(res.users || [res]);
	}
};

function detectType(p) {
	if (/^(icons\/|iconsets.*icons$)/.test(p)) {
		return 'icons';
	} else if (/iconsets$/.test(p)) {
		return 'iconsets';
	}

	return p.split('/')[0];
}

module.exports = function (res, path, opts) {
	const t = detectType(path);
	return Parser[t] ? Parser[t](res, opts) : '';
};
