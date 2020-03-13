import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { selectOfOrder } from '../service/functions';



const OrderTable = () => {
  const [valuesSend, setValuesSend] = useState({ column: 'name', order: 'ASC' });
 
  const { setSortColumns } = useContext(StarWarsContext);
  
  const handleColumn = (event) => {
    setValuesSend( { ...valuesSend, column: event.target.value});
  }

  const handleClick = (event) =>{
    setValuesSend( { ...valuesSend, order: event.target.value });
  }

  const sendValueForStore = (event)=> {
    event.preventDefault();
    setValuesSend( {  column: 'name', order: 'ASC' });
    setSortColumns(valuesSend);
  }

  const creatSelect = (list) => {
      return (
      <select name="column"  onChange={handleColumn}>
        <option value="name" selected>
          name
        </option>
        {list.map((textName) => (
          <option key={`${textName}`}>{textName}</option>
        ))}
      </select>
    );
  }
    return (
      <form>
        <fieldset>
          <legend>Escolha para ordenar</legend>
          {creatSelect(selectOfOrder)}
          <label onChange={handleClick} htmlFor="order">
            <input type="radio" name="order" value="ASC" defaultChecked />
              Ordem Crescente
            <input type="radio" name="order" value="DESC" />
              Ordem Decrescente
          </label>
          <label htmlFor="input">
            <input type="submit" onClick={sendValueForStore} id="input" />
              Enviar Filtro
          </label>
        </fieldset>
      </form>
    );
  
}

export default OrderTable;
