import React from 'react';
import './Pagination.css'

const Pagination = ({ pokemonsPerPage, totalPokemons, nextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  return (
    <nav>
      
        {pageNumbers.map(number => (
          <span key={number} >
            <button onClick={() => nextPage(number)} >
              {number}
            </button>
          </span>
        ))}
      
    </nav>
  );
};

export default Pagination;