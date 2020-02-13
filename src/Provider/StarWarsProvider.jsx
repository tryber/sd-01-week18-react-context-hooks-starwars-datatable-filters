import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getSWAPI from '../Services/Services';
import StarWarsContext from '../Context/StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState({ planets: [], sucess: false });
  const [filterText, setfilterText] = useState('');
  const [select, setSelect] = useState('');

  const fetchStarWars = () => {
    if (data.sucess) return;
    getSWAPI()
      .then((planets) => {
        setData({ planets: planets.results, sucess: true });
      });
  }

  const selectOfTag = (data, select) => {
    data.map((planets) => {
      return Object.entries(planets).map((value) => {
        return value.filter((tag) => {
          return tag === select;
        });
      });
    });
  };

  const context = {
    data,
    fetchStarWars,
    filterText,
    setfilterText,
    select,
    setSelect,
    selectOfTag,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default StarWarsProvider;
