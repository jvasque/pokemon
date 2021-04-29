const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  /** Vida
Fuerza
Defensa
Velocidad
Altura
Peso */

  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,       
    },
    ID:{
      type : DataTypes.INTEGER,
      allowNull: false, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,      
    },
    height :{
      type: DataTypes.INTEGER, 
    },
    speed:{
      type: DataTypes.INTEGER,
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    life:{
      type: DataTypes.INTEGER,
    },
    image:{
      type: DataTypes.STRING,
    },
    

  },{timestamps: false,});
};
