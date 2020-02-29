import React, { useEffect, useContext } from 'react';

import context from '../store/context';
import getStarWarsPlanets from '../services/starWarsAPI';

const Header = () => {
  const { setData } = useContext(context);

  useEffect(() => {
    getStarWarsPlanets(setData);
  }, []);

  return (
    <h1>
      StarWars Datatable with Filters
    </h1>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   getPlanets: () => dispatch(fetchStarWarsAPI()),
// });

// Header.propTypes = {
//   getPlanets: PropTypes.func.isRequired,
// };

export default Header;
