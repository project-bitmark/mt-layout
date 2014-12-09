
# Simple Sharing API

* query | data param | default
* `url` | `data-url` | `rel=canonical` *required*
* `destination` | `data-destination` | `rel=me`
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
  <a href="//markthis.org/share"
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
    <a href="//markthis.org/share" data-destination="https://twitter.com/ProjectBitmark">MarkThis</a>
    <script src="//api.markthis.org/mt.js"></script>
  </body>
</html>
```