# Short URL

This microservice creates a short URL when passed a url to the /new endpoint, or redirects the user in case they access the short url created.

The urls are stored in a Mongo database. When created, you will receive a response like this:

```javascript
{
  "original_url":"http://foo.com:80",
  "short_url":"https://little-url.herokuapp.com/8170"
}
```

It runs on Node and Express, and depends on the .

This software is released under the ☺ licence by Visual Idiot.