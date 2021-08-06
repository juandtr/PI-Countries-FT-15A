const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      unique: true,//La propiedad única puede ser
      // booleana o una cadena. Si proporciona la misma cadena para varias columnas, formarán una clave única compuesta .

      allowNull: false, //tipo de dato predeterminado SQL (permite que este vacio, pero si esta seteado el facel no permite que este vasio)

      primaryKey: true, //va a ser la clave primaria (ID);
      validate: { // para validar manualmente una instancia.
        len: 3, // solo permite valores con longitud entre 2 y 10
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    area: {
      type: DataTypes.FLOAT,
    },

    population: {
      type: DataTypes.INTEGER,
    },
  });
};
   
