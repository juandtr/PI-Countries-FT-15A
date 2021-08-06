const express = require("express");
const server = express();
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

server.use(express.json());

server.get("/:id", async (req, res) => {// se define un controlador de solisitud async/await (
//req es un objeto que contiene información sobre la solicitud HTTP que provocó el evento. En respuesta a req , usa res para devolver la respuesta HTTP deseada.)

  const { id } = req.params; 
  try {
    const response = await axios.get(//Una vez que async (se define un controlador de solisitud) palabra clave, se puede await incluir algo inmediatamente en el código
      `https://restcountries.eu/rest/v2/alpha/${id}`
    );
    let foundById = await Country.findByPk(id.toUpperCase(), { // busca id en mayusculas 
      include: Activity,
    });
    const dataValues = { //se optinen los datos de countries con los dats de la ruta de detalles (se declara una costante con los datos y valores requeridos)
      nativename: response.data.nativeName,
      capital: response.data.capital,
      subregion: response.data.subregion,
      language: response.data.languages[0].name,
    };
    foundById // busca la xistencia de un id si no lo encuentra retorna al estado 404
      ? res.send({ ...foundById.dataValues, ...dataValues })
      : res.sendStatus(404);
  } catch (error) {
    res.status(400).send(error);
  }
});

server.get("/", async (req, res) => { // hace una consulta (req) y recibe una resuesta (res)
  const { name, continent } = req.query;// destructuramos name y continent de la query 
  try {
    if (name || continent) {
      const filter = { where: {} };
      name ? (filter.where.name = { [Op.iLike]: `%${name}%` }) : null;
      continent ? (filter.where.continent = { [Op.eq]: continent }) : null;
      const filteredByProps = await Country.findAll({
        include: [{ model: Activity, require: true }], // si funciona la operacion asigna el objeto name se asigna al objeto filter con la keyhere, si no funciona asigna null
        ...filter,
      });
      filteredByProps.length < 1 //se filtran las propiedades en caso de no encontrar un pais retornara un mensaje de error
        ? res.send({ error: "No country was found" })
        : res.send(filteredByProps);
    } else {
      const countries = await Country.findAll({
        include: [{ model: Activity, require: true }],
      });
      res.send(countries);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = server;