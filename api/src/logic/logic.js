const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { Sequelize, Op } = require("sequelize");

const getPokemons = async (req, res) => {
  /** Buscar primero en DB, si existen resultados devolverlos
sino existen
Buscar en la API y guardar en DB

*voy a usar offset y limit para controlar paginación entonces validar 
si offset<=cantidadDatosEnDB y limit<=cantidadDatosEnDB
si es verdadero devuelve datos desde DB
si es falso ir a la api a buscar mas datos, guardar en DB, 
después validar si limit<cantidad-bucle
   * 
   */
  
  //para controlar resultados en paginación

  const limit = 12;
  //controla limite inferior en consulta a db
  const offSet = req.body.offset ? offSet + req.body.offset : 0;
  const amount = req.body.amount ? req.body.amount : 40;
  //let id = await Pokemon.max("id");
  let id = req.body.id;
  //id = id ? id + 1000 : 1000;
  let data = [];
  //let a= await Pokemon.findAll()


  

  try {
    for (let i = 1; i <= amount; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      await axios(url).then(async (results) => {
        const result = results.data;

        
        let types = result.types.map((type) => type.type.name);
        let speed = result.stats.filter(
          (stat) => stat.stat["name"] === "speed"
        );
        let life = result.stats.filter((stat) => stat.stat["name"] === "hp");
        let defense = result.stats.filter(
          (stat) => stat.stat["name"] === "defense"
        );
        let image = result.id>649 && Object.values(result.sprites)[8]['official-artwork'].front_default

        const p = await Pokemon.findOrCreate({
          where: {
            ID: i,
            name: result.name,
            image: result.id>649? image: result.sprites.other.dream_world.front_default,
            life: life[0].base_stat,
            weight: result.weight,
            height: result.height,
            speed: speed[0].base_stat,
            defense: defense[0].base_stat,
          },
        });

        for (let index = 0; index < types.length; index++) {
          const element = await Tipo.findOrCreate({
            where: {
              name: types[index],
            },
          });
          // console.log(`p en ${index} `,p[index])
          await element[0].addPokemon(p[0]);
        }

        data.push({
          ID: i,
          name: result.name,
          image: result.id>649? image: result.sprites.other.dream_world.front_default,
          life: life[0].base_stat,
          weight: result.weight,
          height: result.height,
          speed: speed[0].base_stat,
          defense: defense[0].base_stat,
          type: types,
        });
      });
    }
    
    //return res.send(data);
    const z = await Pokemon.findAll({include: { model: Tipo }});
    return res.send(z);
  } catch (error) {
    console.log(error)
    res.send("Error en GetPokemons");
  }
//}
  //}
};



//Para obtener detalles
const getPokemonsDetails = async (req, res, idPokemon) => {
  console.log("entro a getPokemonsDetails");
  let data = [];

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    console.log(url);
    await axios(url).then(async (results) => {
      const result = results.data;
      //console.log('entro a result', result)

      let types = result.types.map((type) => type.type.name);
      let speed = result.stats.filter((stat) => stat.stat["name"] === "speed");
      let life = result.stats.filter((stat) => stat.stat["name"] === "hp");
      let defense = result.stats.filter(
        (stat) => stat.stat["name"] === "defense"
      );
      let image =
        idPokemon > 649 &&
        Object.values(result.sprites)[8]["official-artwork"].front_default;
      const p = await Pokemon.findAll({
        where: {
          ID: idPokemon,
          name: result.name,
          image:
            idPokemon > 649
              ? image
              : result.sprites.other.dream_world.front_default,
          life: life[0].base_stat,
          weight: result.weight,
          height: result.height,
          speed: speed[0].base_stat,
          defense: defense[0].base_stat,
        },
      });

      for (let index = 0; index < types.length; index++) {
        const element = await Tipo.findAll({
          where: {
            name: types[index],
          },
        });
        console.log(`p en ${index} `,p[index])
        await element[0].addPokemon(p[0]);
      }
      //.official-artwork.front_default

      data.push({
        ID: idPokemon,
        name: result.name,
        image:
          idPokemon > 649
            ? image
            : result.sprites.other.dream_world.front_default,
        life: life[0].base_stat,
        weight: result.weight,
        height: result.height,
        speed: speed[0].base_stat,
        defense: defense[0].base_stat,
        type: types,
      });
    });
    console.log(data);

    return res.send(data);
    // const z = await Pokemon.findAll({include: { model: Tipo } });
    // return res.send(z);
  } catch (error) {
    res.json(404);
  }
};
const getName = async (req, res, name) => {
  console.log("entro a getName");
  let existInDb = await Pokemon.findAll({
    include: { model: Tipo },
    where: { name: { [Op.eq]: name } },
  });

  if (existInDb.length) {
    res.send(existInDb);
  } else {
    try {
      let url = "";
      await axios(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
        (result) => {
          url = result.data;
        }
      );

      let types = url.types.map((type) => type.type.name);
      let speed = url.stats.filter((stat) => stat.stat["name"] === "speed");
      let life = url.stats.filter((stat) => stat.stat["name"] === "hp");
      let defense = url.stats.filter((stat) => stat.stat["name"] === "defense");
      let image =
        url.id > 649 &&
        Object.values(url.sprites)[8]["official-artwork"].front_default;

      const p = await Pokemon.findAll({
        where: {
          ID: url.id,
          name: url.name,
          image:
            url.id > 649 ? image : url.sprites.other.dream_world.front_default,
          life: life[0].base_stat,
          weight: url.weight,
          height: url.height,
          speed: speed[0].base_stat,
          defense: defense[0].base_stat,
        },
      });

      for (let index = 0; index < types.length; index++) {
        const element = await Tipo.findOrCreate({
          where: {
            name: types[index],
          },
        });
        // console.log(`p en ${index} `,p[index])
        await element[0].addPokemon(p[0]);
      }
      const q = {
        ID: url.id,
        name: url.name,
        image:
          url.id > 649 ? image : url.sprites.other.dream_world.front_default,
        life: life[0].base_stat,
        weight: url.weight,
        height: url.height,
        speed: speed[0].base_stat,
        defense: defense[0].base_stat,
        Types: types,
      };

      return res.send([q]);
    } catch (error) {
      res.json(404);
    }
  }
};

const getType = async (req, res) => {
  let promises = [];
  let data = [];

  promises.push(
    axios("https://pokeapi.co/api/v2/type/10001").then((res) => res.data)
  );
  promises.push(
    axios("https://pokeapi.co/api/v2/type/10002").then((res) => res.data)
  );

  for (let i = 1; i <= 18; i++) {
    const url = `https://pokeapi.co/api/v2/type/${i}`;
    promises.push(axios(url).then((res) => res.data));
  }

  Promise.all(promises)
    .then((results) => {
      const types = results
        .map((type) => {
          Tipo.findOrCreate({
            where: {
              ID: type.id,
              name: type.name,
            },
          });
          return {
            id: type.id,
            type: type.name,
            //pokemonNames: type.pokemon.map((pokemon) => pokemon.pokemon.name),
          };
        })
        .sort((a, b) => (a.id > b.id ? 1 : -1));

      data.push(types);
    })
    .then(() => res.send(data));
};

const getApi = async (results, id) => {
  console.log(results);
  const result = results.data;

  ++id;
  let types = result.types.map((type) => type.type.name);
  let speed = result.stats.filter((stat) => stat.stat["name"] === "speed");
  let life = result.stats.filter((stat) => stat.stat["name"] === "hp");
  let defense = result.stats.filter((stat) => stat.stat["name"] === "defense");
  const p = await Pokemon.findOrCreate({
    where: {
      ID: id,
      name: result.name,
      image: result.sprites.other.dream_world.front_default,
      life: life[0].base_stat,
      weight: result.weight,
      height: result.height,
      speed: speed[0].base_stat,
      defense: defense[0].base_stat,
    },
  });

  for (let index = 0; index < types.length; index++) {
    const element = await Tipo.findOrCreate({
      where: {
        name: types[index],
      },
    });
    // console.log(`p en ${index} `,p[index])
    await element[0].addPokemon(p[0]);
  }

  return {
    name: result.name,
    image: result.sprites.other.dream_world.front_default,
    type: types,
  };
};

const searchValidate = async (offSet, limit, id, req, res) => {
  offSet <= id && limit + offSet <= id
    ? (existInDb = await Pokemon.findAll({ offset: offSet, limit: limit }))
    : getPokemons(req, res);

  if (existInDb.length) {
    return res.send(existInDb);
  } else {
    return res.send("jaja");
  }
};

module.exports = {
  getPokemons,
  getName,
  getType,
  searchValidate,
  getPokemonsDetails,
};
