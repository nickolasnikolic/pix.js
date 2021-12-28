# px.js
Px.js is a tiny library for HTML5 Canvas. It reads image data into Javascript.

2kb at the time of this writing, the library does just one thing: load image data into JS.

You will find in px.js:
- 2kb file size unminified
- self-documenting with 3 functions
- a simple approach that gives you an array of pixel objects

Pixel objects give you:
- an x and y
- rgba values

---
- usage: `var p = new Px(imageUrl);`
- retrieving image data: `p.get();`
---
It is the core js used in [this effect](http://perhaps.observer)
