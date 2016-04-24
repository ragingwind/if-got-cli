#!/usr/bin/env node

'use strict';

const meow = require('meow');
const got = require('if-got');
const mapObj = require('map-obj');
const decamelize = require('decamelize');
const simplify = require('./simplify');

const cli = meow([`
  Usage,
    $ if-got [path] <subpath> <options>

  Options,
    --json: Print out query result in JSON

  Examples,
    $ if-got categories
    $ if-got categories --count=30 --json
    $ if-got icons search --query=app --maximum_size=512 --json --> search.json
    $ if-got icons 495310
    $ if-got iconsets romance
    $ if-got iconsets 28238
    $ if-got styles --count=5
    $ if-got styles/3d
    $ if-got users/ragingwind
`]);

const path = cli.input[0];
const subpath = cli.input[1];
const resource = `${path}${subpath ? `/${subpath}` : ''}`;
const opts = {
	query: mapObj(cli.flags, (o, v) => [decamelize(o, '_'), v])
};

if (!path || subpath && subpath === 'search' && !cli.flags.query) {
	cli.showHelp();
}

got(resource, opts).then(r => {
	console.log(cli.flags.json ? JSON.stringify(r.body, '', 2) : simplify(r.body, resource, opts.query));
}).catch(e => {
	console.log(e.toString());
});
