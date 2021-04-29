const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "tipo",
    {
      name: {
        type: DataTypes.STRING,
      },
      ID: {
        type: DataTypes.INTEGER,
      },
    },{timestamps: false,}
    
  );
};
 