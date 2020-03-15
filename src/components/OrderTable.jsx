import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { selectOfOrder } from '../service/functions';

const OrderTable = () => {
  const [valuesSend, setValuesSend] = useState({ column: 'name', order: 'ASC' });
  const { setSortColumns } = useContext(StarWarsContext);
  const handleColumn = (event) => setValuesSend({ ...valuesSend, column: event.target.value });
  const handleClick = (event) => setValuesSend({ ...valuesSend, order: event.target.value });
  const sendValueForStore = (event) => {
    event.preventDefault();
    setValuesSend({ column: 'name', order: 'ASC' });
    setSortColumns(valuesSend);
  };
  const creatSelect = (list) => (
    <select name="column" onChange={handleColumn} data-testid="order-select">
      <option defaultValue="name">name</option>
      {list.map((textName) => (<option key={`${textName}`}>{textName}</option>))}
    </select>
  );
  return (
    <form>
      <fieldset>
        <legend>Escolha para ordenar</legend>
        {creatSelect(selectOfOrder)}
        <label onChange={handleClick} htmlFor="order" >
          <input type="radio" name="order" value="ASC" defaultChecked data-testid="order-radio2" />
          Ordem Crescente
          <input  type="radio" name="order" value="DESC" data-testid="order-radio"/>
          Ordem Decrescente
        </label>
        <button type="submit" onClick={sendValueForStore} data-testid="orderbutton">
          Enviar Filtro
        </button>
      </fieldset>
    </form>
  );
};

export default OrderTable;
