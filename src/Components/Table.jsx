import React from 'react';
import getSWAPI from './Services/Services';

const data = getSWAPI().then((data) => (data)

const renderTableData = () => {
    return data.map((result, index) => {
       const { id, name, age, email } = result
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{age}</td>
             <td>{email}</td>
          </tr>
       )
    })
 }

export const Table = (props) => {
    const [todos, setTodos] = useState([
      {
        "id": Date.now(),
        "value": "Buy milk",
        "done": false
      },
      {
        "id": Date.now() + 1,
        "value": "Play with doge",
        "done": false
      }
    ]);

    return (
       {props.children}
    )
  }
