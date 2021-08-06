const express = require("express");
const { Op } = require("sequelize");
const server = express();
server.use(express.json());
const { Activity, Country } = require("../db");
server.get("/", async (req, res) => {// hace una consulta y obtiene una respuesta
    try {
      const activities = await Activity.findAll(); //have una búsqueda de múltiples elementos en la base de datos
      return res.json(activities);
    } catch (error) {
      res.status(400).send("Something went wrong"); //al no ser encontrado nos da un error 400 
    }
  });
  
  server.put("/", async (req, res) => {
    try {
      const { name, difficulty, duration, season, countries } = req.body; // llamamo los metodos requeridos de la tabla de datos activity
    
      const activity = await Activity.findOne({
        where: {
          name: {
            [Op.eq]: name,
          },
        },
      });
      activity.difficulty = difficulty;
      activity.duration = duration;
      activity.season = season;   // metodos solicitados de la tabla de datos 
      await activity.save(); 
  
      let ctry;
      if (Array.isArray(countries)) { 
        ctry = await Promise.all(
          countries.map((country) => Country.findByPk(country))
        );
      }
      if (ctry) {
        await activity.setCountries(ctry);
      }
      return res.send(activity);
    } catch (error) {
      console.log(error);
    }
  });
  
  server.post("/", async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    let ctry;
    if (Array.isArray(countries)) {
      ctry = await Promise.all(
        countries.map((country) => Country.findByPk(country))
      );
    }
    if (ctry) {
      await activity.setCountries(ctry);
    }
    return res.send(activity);
  });
  
  module.exports = server;