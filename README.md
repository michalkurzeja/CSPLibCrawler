# CSPLibCrawler

This library crawls [CSPLib] page, downloads all the data of problems and saves them into DokuWiki installation (along with some semantic annotations).

# Installation

## Npm

```bash
$ npm install -g csplib-crawler
```

## Manual installation

```bash
$ git clone https://github.com/michalkurzeja/CSPLibCrawler.git
$ npm install
```


# Configuration

The library requires the host name of you designated DokuWiki installation.
You must provide the parameter in `params.json` file, found in the installation directory: `config/params.json`.

# Usage

## Npm installation

Simply run the command:

```bash
$ csplib-crawler [--user] [--password]
```

## Manual installation

Run in project directory:

```bash
$ node bin/crawl.js [--user] [--password]
```

# Options

You can override any parameter from `params.json` file via cli-interface, e.g.

```bash
$ csplib-crawler --dokuwiki.host=http://my-dokuwiki-host.com/
```

This will override the default host and cause the crawler to upload the CSPLib content to `http://my-dokuwiki-host.com/`

[CSPLib]: http://www.csplib.org/