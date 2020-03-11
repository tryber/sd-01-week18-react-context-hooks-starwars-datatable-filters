import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { selectOfOrder } from '../service/functions';


// perguntar o Caciquinho porque o valor está setando no meu hook state para indefinido quando uso ele

const OrderTable = () => {
  const [valuesSend, setValuesSend] = useState({ column: 'name', order: 'ASC' });
  console.log( valuesSend.column, valuesSend.order );
  const { setSortColumns } = useContext(StarWarsContext);
  const handleColumn = (event) => {
    setValuesSend({ column: event.target.value});
  }

  const handleClick = (event) =>{
    setValuesSend({ order: event.target.value });
  }

  const sendValueForStore = (event)=> {
    event.preventDefault();
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
