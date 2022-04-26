# undent
Remove indentation from multi-line strings.

[![build status](https://img.shields.io/github/workflow/status/twitchbronbron/undent/build.svg?logo=github)](https://github.com/twitchbronbron/undent/actions?query=workflow%3Abuild)
[![coverage status](https://img.shields.io/coveralls/github/TwitchBronBron/undent?logo=coveralls)](https://coveralls.io/github/TwitchBronBron/undent?branch=master)
[![monthly downloads](https://img.shields.io/npm/dm/undent.svg?sanitize=true&logo=npm&logoColor=)](https://npmcharts.com/compare/undent?minimal=true)
[![npm version](https://img.shields.io/npm/v/undent.svg?logo=npm)](https://www.npmjs.com/package/undent)
[![license](https://img.shields.io/npm/l/undent.svg)](LICENSE)


## Installation

### npm

```bash
npm install undent -g
```

## Usage
```javascript
import undent from 'undent';
//use as a function
const first = undent(`multi-line\n\tindented\nstring`); // "multi-line\n\t\nstring"

//use as a template literal tag
const second = undent`
    multi-line
        indented
    string
`; // "multi-line\n    indented\nstring"
```

## The algorithm
undent finds the line with the least amount of indentation (excluding whitespace-only lines), and then removes that amount of indentation from every line.

For example:

```
const text = undent`
        two levels in
    one level in
                three levels in
`;
console.log(text);
```
prints
```
    two levels in
one level in
            three levels in
```


## Features
 - remove leading indentation based on the smallest indentation found for all lines (excluding whitespace-only lines)
 - trim the end of every line
 - remove leading/trailing newlines
 - retain existing newline characters (`\r` or `\r\n`)


## Changelog
[Click here](CHANGELOG.md) to view the changelog.

