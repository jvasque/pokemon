import React from "react";
import { useSelector } from "react-redux";
import './types.css'

function Types() {
  const { type } = useSelector((state) => state.pokemon);

  const types = type[0][0].map((type) => <div className="divStyles">{type.type}</div>);
  console.log('types',types)
  return <div className="containerStyle">{types}</div>;
}

export default Types;
