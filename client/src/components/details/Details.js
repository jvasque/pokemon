import "./Details.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Bar from '../bar/Bar'
import "./Details.css";


const Details = ({ id }) => {
  const history = useHistory();
  const [details, setDetails] = useState();

  useEffect(async () => {
    const response = await axios(`http://localhost:3001/pokemons/${id}`);
    setDetails(await response.data[0]);
  }, []);

  const types = details?.tipos?.map((poke) => (
    <span key={poke.name}> {poke.name}</span>
  ));

  const onSubmitReturn = () => {
    history.push("/pokemons");
  };

 
  return (
    <div>
      <div
        className={details?.tipos[0].name}
        style={{ width: 1300, display: "block", }}
      >
        <div>
       
          <button data-testid='button' style={{ marginTop: 15 }} onClick={onSubmitReturn} type='submit'>
            Return
          </button>
        </div>
        <h1> Pokemon Details</h1>
        <img
          style={{ height: 150 }}
          src={details?.image}
          alt="detail_Pokemon"
        ></img>
        <p>ID: {details?.ID /*> 1000 ? details?.ID - 1000 : details?.ID*/}</p>
        <div className="txt">
          <p>name: {details?.name}</p>
          <p>life: <Bar completed={details?.life}/></p>
          <p>weight: <Bar completed={details?.weight}/></p>
          <p>height: <Bar completed={details?.height}/></p>
          <p>speed: <Bar completed={details?.speed}/></p>
          <p>defense: <Bar completed={details?.defense}/></p>
          <p>type: {types}</p>
          
        </div>
      </div>
    </div>
  );
};

export default Details;
