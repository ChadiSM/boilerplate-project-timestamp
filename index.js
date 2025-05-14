// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/api/:date?", (req, res) => {
  let dateStr = req.params.date;
  let date;

  if (!dateStr) {
    // Si no hay parámetro, usar la fecha actual
    date = new Date();
  } else {
    // Verificar si es un número (timestamp UNIX)
    if (/^\d+$/.test(dateStr)) {
      date = new Date(parseInt(dateStr));
    } else {
      date = new Date(dateStr);
    }
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
