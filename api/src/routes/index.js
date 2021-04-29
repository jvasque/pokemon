const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo, Creado } = require("../db");
const { Op } = require("sequelize");
const {
  getPokemons,
  getPokemonsDetails,
  getType,
  getName,
} = require("../logic/logic");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//ruta de detalle
router.get("/pokemons/:idPokemon", async (req, res) => {
  //    GET /pokemons/{idPokemon}:
  // Obtener el detalle de un pokemon en particular//
  // Tener en cuenta que tiene que funcionar tanto para un id de un pokemon
  //existente en pokeapi o uno creado por ustedes
  //(imagen, nombre y tipos)
  //Número de Pokemon (id)
  //Estadísticas (vida, fuerza, defensa, velocidad)
  //Altura y peso
  // Pokemon.findByPk().then((category) =>
  //   res.json(category)
  // );

  id = Number(req.params.idPokemon)<1 ? "1" : req.params.idPokemon;

  console.log(id)
  try {
    Pokemon.findAll({
      include: { model: Tipo },
    }).then(async (result) => {
      //let data = (Object.values(pokemon))[0].id
      //console.log(data)
      const filtered = result.filter(
        (pokemon) => Object.values(pokemon)[0].id === id
      );

      if (filtered.length !== 0) return res.send(filtered)
      return await getPokemonsDetails(req, res, Number(req.params.idPokemon));
     
    });

    Creado.findAll({
      include: { model: Tipo },
    }).then(async (result) => {
      //let data = (Object.values(pokemon))[0].id
      //console.log(data)
      const filtered = result.filter(
        (pokemon) => Object.values(pokemon)[0].id === id
      );

      if (filtered.length !== 0) return res.send(filtered);

     return await getPokemonsDetails(req, res, Number(req.params.idPokemon));
    });

    
  } catch (error) {
    console.log(error);
    res.json(404);
  }
});

router.get("/pokemons", async (req, res) => {
  //Obtener un listado de los primeros 12 pokemons desde pokeapi
  //Debe devolver solo los datos necesarios para la ruta principal
  //console.log(req)

  req.body.amount && console.log(req.body.amount,'ja');
  if (req.query.name) {
    console.log("llego query", req.query.name);
    return getName(req, res, req.query.name.toLowerCase());
  }

  return getPokemons(req, res);
});

router.post("/pokemons", async (req, res) => {
  const {
    id,
    name,
    weight,
    height,
    speed,
    defense,
    image,
    life,
    type,
  } = req.body;
  let len = type;

  console.log("entré al server, len", req.body.type);
  try {
    const p = await Creado.findOrCreate({
      where: {
        ID: id ? parseInt(id) : 0,
        name: name,
        image: image ? image : "",
        life: life ? life : 0,
        weight: weight ? weight : 0,
        height: height ? height : 0,
        speed: speed ? speed : 0,
        defense: defense ? defense : 0,
      },
    });

    console.log("types", len, type);
    if (len) {
      for (let index = 0; index < len?.length; index++) {
        const element = await Tipo.findOrCreate({
          where: {
            name: len[index],
          },
        });
        // console.log(`p en ${index} `,p[index])
        await element[0].addCreado(p[0]);
      }
    } else {
      const element = await Tipo.findOrCreate({
        where: {
          name: "no definido",
        },
      });
      // console.log(`p en ${index} `,p[index])
      await element[0].addCreado(p[0]);
    }

    return await res.send(p);
  } catch (error) {
    console.error(error);
    return res.json(`Ya existe el id o pokemon error ${error.message}`);
  }
});

router.get("/types", async (req, res) => {
  /**
 * GET /types:
Obtener todos los tipos de pokemons posibles
En una primera instancia deberán traerlos desde pokeapi
 y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 */
  //https://pokeapi.co/api/v2/type
  return getType(req, res);
});

/******************************************************* */
//@params
// trabajar solo aqui**************************************************** */

router.get("/prueba", async (req, res) => {
  /** 

*voy a usar offset y limit para controlar paginación entonces validar 
si offset<=cantidadDatosEnDB y limit<=cantidadDatosEnDB
si es verdadero devuelve datos desde DB
si es falso ir a la api a buscar mas datos, guardar en DB, 
después validar si limit<cantidad-bucle

Buscar primero en DB, si existen resultados devolverlos
sino existen
Buscar en la API y guardar en DB
   * 
   */

  //para controlar resultados en paginación
  const limit = 12;
  //controla limite inferior en consulta a db
  let offSet = req.body.offset ? offSet + req.body.offset : 0;
  const amount = 1;
  let id = await Pokemon.max("id");
  id = id ? id + 1000 : 1000;
  let data = [];
  let existInDb;

  searchValidate(offSet, limit, id, req, res);
});

module.exports = router;
