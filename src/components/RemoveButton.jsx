import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReciperContext } from '../context';
import { comparisonSing } from '../services';

const handleClick = (column, numericFilter, setNumericFilter) => {
  const { addFilter, available_categories } = numericFilter;
  const categories = [...available_categories];
  categories.push(column);
  setNumericFilter({ ...numericFilter, available_categories: categories.sort(), addFilter: addFilter.filter((eachFilter) => eachFilter.column !== column) });
}


const RemoveButton = ({ column, numericFilter, setNumericFilter }) => {
  return (
    <button type="button" onClick={() => handleClick(column, numericFilter, setNumericFilter)}> X
      </button>
  );
}

export default RemoveButton;
