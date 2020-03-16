const React = require("react");
const express = require("express");
const ReactDOMServer = require("react-dom/server");
const { JsonLd } = require("react-schemaorg");

const dangerous = "</script><script>alert('xss')</script>";

express()
  .get("/", (req, res) =>
    res.send(
      ReactDOMServer.renderToString(
        <div>
          <p>It's ok here: {dangerous}</p>
          <p>
            But not here: <JsonLd item={{ name: dangerous }} />
          </p>
        </div>
      )
    )
  )
  .listen(2000, () => console.log("Listening on port 2000"));
