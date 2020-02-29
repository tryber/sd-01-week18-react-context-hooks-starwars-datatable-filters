import React, { useContext } from 'react';

import context from '../store/context';
// import PropTypes from 'prop-types';
// import { sortTable } from '../store/actions/buttonSort';

// function changeOrder(event, orderTable) {
//   const title = event.target.innerHTML;
//   orderTable(title);
// }

const TableHeader = () => {
  const { setFilters } = useContext(context);
  const titles = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];

  return (
    <thead>
      <tr>
        {titles.map((title) => (
          <th key={title}>
            <button type="button" onClick={(e) => setFilters({ column: e.target.innerHTML })}>{title}</button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TableHeader.propTypes = {
//   orderTable: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   orderTable: (value) => dispatch(sortTable(value)),
// });

export default TableHeader;
