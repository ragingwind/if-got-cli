'use strict';

const path = require('path');
const fs = require('fs');
const got = require('got');

module.exports = function (dest, limit, max, res) {
	return new Promise((resolve, reject) => {
		const report = {
			total: () => report.images.length,
			download: 0,
			images: []
		};

		if (!res.total_count && !res.icons) {
			resolve(report);
		}

		const total = limit === 'all' ? res.icons.length : (limit <= res.icons.length ? limit : res.icons.length);
		let handler = res => {
			report.download++;

			if (!res) {
				reject();
			} else if (report.download === report.total()) {
				resolve(report);
			}
		};

		for (let i = 0; i < total; ++i) {
			const image = max ? res.icons[i].raster_sizes.reduce((p, c) => {
				if (max === c.size) {
					return c;
				} else if (max > c.size) {
					p = c;
					return p;
				}

				return p;
			}) : res.icons[i].raster_sizes.pop().formats.pop();

			if (image && image.preview_url) {
				let filename = path.join(dest, path.basename(image.preview_url));
				report.images.push(filename);

				got.stream(image.preview_url).pipe(
					fs.createWriteStream(filename)
						.on('error', () => handler(false))
						.on('end', () => handler(true))
					);
			}
		}
	});
};
