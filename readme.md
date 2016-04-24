# if-got-cli [![Build Status](https://travis-ci.org/ragingwind/if-got-cli.svg?branch=master)](https://travis-ci.org/ragingwind/if-got-cli)

> Cli to get/find icons from iconfinder.com

![](http://g.recordit.co/Sac4lWTk2B.gif)

## Install

```
$ npm install --save if-got-cli
```

## Help

```sh
$ if-got --help
```

## Options

--json: Print out query result in JSON or not You will get a list of result in simple text format like HTTP links or names

## Examples

```sh
## Simple categories
$ if-got categories

## Simple categories with max count
if-got categories --count=30

## Categories in JSON format
$ if-got categories --json

## Search icon by query `app`
$ if-got icons search --query=app --maximum_size=512 --json --> search.json
$ if-got icons search --query=app --count=1 > search.data

## HTTP(s) Link for the icon
$ if-got icons 495310

## Open the icon with HTTP(s) Link on MAC OS
$ if-got open $(icons 495310)

## Simple iconset for romance
$ if-got iconsets romance or

## HTTP(s) Link of iconsets for romance category
$ if-got iconsets romance/icons

## Simple iconsets
$ if-got styles cartoon/iconsets
$ if-got categories romance/iconsets
$ if-got users ragingwind/iconsets
$ if-got styles cartoon/iconsets
$ if-got iconsets 28238

## Styles
$ if-got styles --count=5

## The styles
$ if-got styles/3d
$ if-got styles 3d

## The users
$ if-got users/ragingwind
```

## Errors

```sh
$ if-got users/wrong-invalid-could-be-found-user
=> HTTPError: Response code 404 (Not Found)
```

## License

MIT © [Jimmy Moon](http://ragingwind.me)
