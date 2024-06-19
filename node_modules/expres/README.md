expRes
======

Middleware to add express compatible methods to your response objects.

[![build status](https://secure.travis-ci.org/cpsubrian/node-expres.png)](http://travis-ci.org/cpsubrian/node-expres)

Usage
-----

```js
var expres = require('expres'),
    server = require('http').createServer();

server.on('request', expres.middleware);

// ...
```

Response Methods Added
----------------------

### status(code)
Set status `code`.

    res.status(400);

### links(links)

Set Link header field with the given `links`.

    res.links({
      next: 'http://api.example.com/users?page=2',
      last: 'http://api.example.com/users?page=5'
    });

### type(type)

Set the Content-Type to `type`.

    res.type('application/json');

### send(body|status, [body])

Send a response.

    res.send(new Buffer('wahoo'));
    res.send({ some: 'json' });
    res.send('<p>some html</p>');
    res.send(404, 'Sorry, cant find that');
    res.send(404);

### json(obj|status, [obj])

Send JSON response.

    res.json(null);
    res.json({ user: 'tj' });
    res.json(500, 'oh noes!');
    res.json(404, 'I dont have that');

### jsonp(obj|status, [obj])

Send JSON response with JSONP callback support.

    res.jsonp(null);
    res.jsonp({ user: 'tj' });
    res.jsonp(500, 'oh noes!');
    res.jsonp(404, 'I dont have that');

### format(obj)

Respond to the Acceptable formats using an `obj`
of content-type callbacks.

Content-Type is set for you, however if you choose
you may alter this within the callback using `res.type()`
or `res.set('Content-Type', ...)`.

    res.format({
      'text/plain': function () {
        res.send('hey');
      },
      'text/html': function () {
        res.send('<p>hey</p>');
      },
      'appliation/json': function () {
        res.send({ message: 'hey' });
      }
    });

By default expres passes an `Error`
with a `.status` of 406 to `next(err)`
if a match is not made. If you provide
a `.default` callback it will be invoked
instead.

### set(field, [val])

Set header `field` to `val`, or pass
an object of header fields.

    res.set('Accept', 'application/json');
    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });

Aliased as `res.header()`.

### get(field)

Get value for header `field`.

### redirect(toUrl, [status])

Redirect to the given `url` with optional response `status`
defaulting to 302.

The given `url` can also be the name of a mapped url, for
example by default expres supports "back" which redirects
to the _Referrer_ or _Referer_ headers or "/".

    res.redirect('/foo/bar');
    res.redirect('http://example.com');
    res.redirect(301, 'http://example.com');
    res.redirect('http://example.com', 301);
    res.redirect('../login'); // /blog/post/1 -> /blog/login


Credit
------

Many of the methods and tests are copied verbatim from express, so, thanks TJ :)

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (c) 2009-2012 TJ Holowaychuk <tj@vision-media.ca>
- Copyright (C) 2012 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.