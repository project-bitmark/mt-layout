
# Simple Sharing API

This document (1 of 2) details the Simple Marking API used to power "MarkThis" Buttons on the web.

The API has semantics similar to Facebook and Twitter's "Share Button APIs".

The forthcoming API document (2 of 2) has semantics similar to Facebook's "Like Button".

Primary difference between the two, is that one submits a marking without leaving the page on which the markthis button is found, whilst this share based API submits partially complete marking (notably missing source and amount) to a page similar to the following:

![Submit Marking Page](http://i.imgur.com/A7lQgcm.png?1)

Both APIs will be developed seperately, then the functionality merged in to a single 'marking' API with common functionality.

It is currently unclear whether the difference between partially submitting a marking, and fully submitting a marking, will be down to configuration of the button, or down to user preference.

## Functional Purpose

The API is called by submitting data by either GET or POST.  The HTML API detailed below allows variables to be specified in HTML, and also defaults to using common variables from markup which can be found on the majority of pages on the web.

Specifying the API in this manner allows third party scripts to submit via GET or POST, custom buttons to be created, and drop in javascript to turn links with `class="markthis-button"` in to actionable and familiar "markthis" buttons.

## Variables

* query string | data param | default
* `url` | `data-url` | `rel=canonical` or `document.location.href`
* `destination` | `data-destination` | `rel=me` or *other authorship tokens we may understand*
* `title` | `data-title` | `<title>`
* `lang` | `data-lang` | `<html lang=x>` or `en`
* `canonical` | `data-canonical` | `?url`
* `tags` | `data-tags` | `none`
* `size` | `data-size` | `medium`
* `layout` | `data-layout` | `horizontal`

## GET

All values passed url encoded within a query string

`//markthis.org/share?url=x&destination=x&title=x&lang=x`


## POST

A JSON encoded object POSTed to `//markthis.org/share`

```
{
  url: "https://github.com/project-bitmark/?smid=tw-share",
  destination: "https://twitter.com/ProjectBitmark",
  title: "Project Bitmark on GitHub",
  lang: "en",
  canonical: "https://github.com/project-bitmark/",
  tags: "bitmark, cryptocurrency, github",
  size: "small",
  layout: "vertical"
}
```

## HTML 5

Full Example

```
  <a href="//markthis.org/share" class="markthis-button"
     data-url="https://github.com/project-bitmark/?smid=tw-share",
     data-destination="https://twitter.com/ProjectBitmark",
     data-title="Project Bitmark on GitHub",
     data-lang="en",
     data-canonical="https://github.com/project-bitmark/",
     data-tags="bitmark, cryptocurrency, github",
     data-size="small",
     data-layout="vertical">
   MarkThis
  </a>
```

Simple Template

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>MarkThis Share API Documentation</title>
    <link rel="canonical" href="https://markthis.org/documentation/shareapi">
  </head>
  <body>
    <h1>Simple Demo Button</h1>
    <a href="//markthis.org/share" data-destination="https://twitter.com/ProjectBitmark"  class="markthis-button">MarkThis</a>
    <script src="//api.markthis.org/mt.js"></script>
  </body>
</html>
```
