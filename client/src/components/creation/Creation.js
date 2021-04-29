import axios from "axios";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { pushCreated} from "../../slice/pokemonSlice";
import "./Creation.css";

function Creation() {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [defense, setDefense] = useState(0);
  const [life, setLife] = useState(0);
  const [types, setTypes] = useState([]);
  const [image, setImage] = useState("");
  const [form, setForm] = useState(1);
  const isEnabled = id > 0 && name.length > 0;
  const dispatch = useDispatch();

  const updateDescription = async (e) => {
    e.preventDefault();
    console.log("voy a enviar types", types);
    try {
      const response = await axios
        .post(`http://localhost:3001/pokemons`, {
          id: id,
          name: name,
          image: image,
          life: life,
          weight: weight,
          height: height,
          speed: speed,
          defense: defense,
          type: types.length > 0 ? types.split(",") : ["no definido"],
        })
        .then((result) => {
          let a = result.data;
          let obj = {
            id: a[0].id,
            ID: a[0].ID,
            name: a[0].name,
            image: a[0].image,
            life: a[0].life,
            weight: a[0].weight,
            height: a[0].height,
            speed: a[0].speed,
            tipos: [{name: types.length > 0 ? types.split(",")[0] : ["no definido"]}],
          };
          console.log(a[0].id);
          dispatch(pushCreated(obj));
        });
      alert("Pokemon Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  

  const forms = [];
  const required = !isEnabled ? "Campo Requerido" : "";

  const styled = {
    float: "left",
    width: "calc(100% - 180px)",
    backgroundColor: "rgb(188, 235, 243)",
    borderRadius: 10,
    height: 33,
  };

  for (let index = 0; index < form; index++) {
    forms.push(
      <div>
        <form
          className="forma principale"
          style={{
            display: "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label className="labele" for="idPokemon">
            Insert ID: {required}
          </label>
          <input
            style={styled}
            type="number"
            id="idPokemon"
            name="idPokemon"
            min="1000"
            max="2000"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className={!isEnabled ? "error" : ""}
          />
          <label className="labele" for="namePokemon">
            Insert name's pokemon: {required}
          </label>
          <input
            style={styled}
            className={!isEnabled ? "error" : ""}
            type="text"
            placeholder="insert Name Pokemon"
            id="namePokemon"
            name="namePokemon"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="labele" for="image">
            Insert url image's Pokemon:
          </label>
          <input
            className="input"
            type="url"
            placeholder="url image's Pokemon"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label className="labele" for="life">
            Insert life's Pokemon:
          </label>
          <input
            className="input"
            type="number"
            placeholder="url image's Pokemon"
            id="life"
            name="life"
            value={life}
            onChange={(e) => setLife(e.target.value)}
          />
          <label className="labele" for="speed">
            Insert speed's Pokemon:
          </label>
          <input
            className="input"
            type="number"
            placeholder="Insert speed's Pokemon"
            id="speed"
            name="speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            min="0"
          />
          <label className="labele" for="weight">
            Insert weight's Pokemon:
          </label>
          <input
            className="input"
            type="number"
            placeholder="insert weight's Pokemon"
            id="weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
          />

          <label className="labele" for="height">
            Insert height's Pokemon:
          </label>
          <input
            className="input"
            type="number"
            placeholder="insert height's Pokemon"
            id="height"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
          />

          <label className="labele" for="defense">
            Insert defense's Pokemon:
          </label>
          <input
            className="input"
            type="number"
            placeholder="insert defense's Pokemon"
            id="defense"
            name="defense"
            value={defense}
            onChange={(e) => setDefense(e.target.value)}
            min="0"
          />

          <label className="labele" for="types">
            Insert types's Pokemon, separate with comma:
          </label>
          <input
            className="input"
            type="text"
            placeholder="insert types's Pokemon"
            id="types"
            name="types"
            value={types}
            onChange={(e) => setTypes(e.target.value)}
          />
          <button
            className="button "
            onClick={updateDescription}
            disabled={!isEnabled}
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {forms}
      <button onClick={() => setForm(form + 1)}>Add other form </button>
    </div>
  );
}

export default Creation;
