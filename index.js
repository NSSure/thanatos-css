const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static(path.join(__dirname, 'dist')));
app.use(expressLayouts);

const fs = require('fs');

fs.readdir('./views/docs', (err, files) => {
  files.forEach(file => {
    const fileName = path.basename(file, path.extname(file));

    console.log(fileName);

    app.get(`/${fileName}`, async (req, res) => {
        if (fileName === 'helpers') {
          var sassVariables = {
            animation: JSON.parse(fs.readFileSync("./data/animation.json")),
            color: JSON.parse(fs.readFileSync("./data/color.json")),
            layout: JSON.parse(fs.readFileSync("./data/layout.json")),
            spacing: JSON.parse(fs.readFileSync("./data/spacing.json")),
            sizing: JSON.parse(fs.readFileSync("./data/sizing.json")),
            typography: JSON.parse(fs.readFileSync("./data/typography.json"))
          };

          res.render(`docs/${fileName}`, { sassVariables: sassVariables });
        }
        else {
          res.render(`docs/${fileName}`);
        }
    });
  });
});

app.get("/", async (req, res) => {
    res.render("index");
});

app.get('/source-code', function(req, res){
  const file = `${__dirname}/thanatos-css-source.zip`;
  res.download(file); // Set disposition and send it.
});

app.listen(8080, () => {
    console.log("Example app listening on port 8080");
});