# Tick@Lab scripts

This is a bunch of scripts used to automate data entry into the lab software called Tick@Lab.

https://www.a-tune.com/products-services-software/animal-research-facility-software/

No warranty provided, use at own risk.

## Setup

Currently these scripts are used as bookmarklets in chrome.

- Take the minified scripts under `minified/`
- Go to chrome -> right click bookmark bar -> bookmarks manager -> add new bookmark
- Name: (Script Name)
- URL: (Minified code for script)

This will load javascript scripts that run when clicked.

## How to use

### Experiment loader

- Run the 'Load CSV' script, select source file
- Run 'Load Form'

## Development

- Write code under each of the bookmarklet scripts
- Run scripts/minify.sh
- All scripts will be minified and written to the minified output dir
- Deploy minified code to the browser to test

### Testing Target

- Install http service (I use node serve)
- Test page can be run with `servce src/`

The index.html file is a rough approximation for forms found in the Tick@Lab software, should not be considered an exact replica, it's just a test target when we don't want to run it against the real software.
