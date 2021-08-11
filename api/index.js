const server = require("./src/app.js");
const fetch = require("node-fetch");
const { conn, Country } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    fetch("https://restcountries.eu/rest/v2/all")
      .then((r) => r.json())
      .then((r) => {
        r.forEach((el) => {
          let country = {
            id: el.alpha3Code,
            name: el.name === "Åland Islands" ? "Aland Islands" : el.name,
            flag: el.flag,
            continent: el.region,
            area: el.area,
            population: el.population,
          };
          Country.create(country);
        });
      })
      .catch((err) => console.log(err));
  });
});
