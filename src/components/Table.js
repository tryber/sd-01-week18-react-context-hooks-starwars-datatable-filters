import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Teste() {
  const { APIresult } = useContext(StarWarsContext);
  return APIresult;
}

export default Teste;
