# miti-console
npm module : Tools for console scripts

> Simple command line scripts

Use nodejs for writing command line scripts manipulating files.

## Table of Contents

* [What is it](#what-is-it)
* [Examples](#examples)
* [Usage](#usage)
* [Support](#support)
* [Thanks](#thanks)

## What is it

I created this module for helping writing command line scripts manipulating files.
These scripts will work on iOs & Windows.

## Examples

Check out the [miti-console examples](docs/examples.md) to see what it can help you do.

## Usage

Just add...

```sh
try {
    mc = require('miti-console')
} catch (error) {
    console.log("")
    console.log("miti-console not installed. (please run 'npm install miti-console')")
    process.exit(2)
}
```

... in your js header.

[Apache Licence 2.0]: https://www.apache.org/licenses/LICENSE
[contributors]: http://github.com/egroise/miti-console/contributors