import React, { useContext, useEffect } from 'react';
// import SelectOfComparison from './SelectOfComparison';
import { StarWarsContext } from '../context/StarWarsContext';
// import {
//   selectIsTrueOrFalse,
//   handleColumn,
//   handleComparison,
//   handleInput,
// } from '../service/functions';
// import PropTypes from 'prop-types';

// const sendValueForStore = ({ column, comparison, value }) => {
//   const { setFilter } = useContext(StarWarsContext);
//   const value = e.target.value;
//   setFilter({ column, comparison, value });
// };

// const selectOfComparison = () => {
//   const { setFilter, filter } = useContext(StarWarsContext);
//   return (
//     <select
//       name="comparison"
//       value={filter.comparison}
//       onChange={(e) => setFilter({ comparison: e.target.value })}
//       required
//     >
//       <option value="" disabled>
//         SELECIONE
//       </option>
//       <option value="bigger">MAIOR QUE</option>
//       <option value="smaller">MENOR QUE</option>
//       <option value="equal">IGUAL Á</option>
//     </select>
//   );
// };

const SelectOfColunm = () => {
  const { setFilterColunm, filterColunm } = useContext(StarWarsContext);
  return (
    <select
      name="column"
      value={filterColunm}
      onChange={(e) => setFilterColunm(e.target.value)}
      required
    >
      <option value="" disabled>
        Selecionar Opção
      </option>
      <option value="population">População</option>
      <option value="orbital_period">Duração Orbital</option>
      <option value="diameter">Diâmetro</option>
      <option value="rotation_period">Duração da Rotação</option>
      <option value="surface_water">Superfície da Água</option>
    </select>
  );
};

const SelectOfComparison = () => {
  const { setFilterComparison, filterComparison } = useContext(StarWarsContext);
  return (
    <select
      name="comparison"
      value={filterComparison}
      onChange={(e) => setFilterComparison(e.target.value)}
      required
    >
      <option value="" disabled>
        SELECIONE
      </option>
      <option value="bigger">MAIOR QUE</option>
      <option value="smaller">MENOR QUE</option>
      <option value="equal">IGUAL Á</option>
    </select>
  );
};

const InputNumeric = () => {
  const { setFilterValue, filtervalue } = useContext(StarWarsContext);
  return (
    <input
      type="number"
      value={filtervalue}
      placeholder="Valor numérico"
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
};

function FilterSelect() {
  const { filter, setFilter } = useContext(StarWarsContext, );
  const [state, setState] = useState({ name: '' });

  console.log('os filtros → ', filter);
  return (
    <form>
      <fieldset>
        <legend>Campos de Filtro</legend>
        <SelectOfColunm />
        <SelectOfComparison />
        <InputNumeric />
        <button
          type="submit"
          onClick={()=> setFilter([
            { column: filterColunm, comparison: filterComparison, value: filtervalue },
          ])}
        >
          Enviar Filtro
        </button>
      </fieldset>
    </form>
  );
}
// class NumberInputDropDown extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       column: '',
//       comparison: '',
//       value: '',
//     };
//     this.handleColumn = this.handleColumn.bind(this);
//     this.handleComparison = this.handleComparison.bind(this);
//     this.handleInput = this.handleInput.bind(this);
//     this.sendValueForStore = this.sendValueForStore.bind(this);
//     this.selectOfComparison = this.selectOfComparison.bind(this);
//     this.selectOfColunm = this.selectOfColunm.bind(this);
//   }

//   handleColumn(event) {
//     this.setState({ column: event.target.value });
//   }

//   handleComparison(event) {
//     this.setState({ comparison: event.target.value });
//   }

//   handleInput(event) {
//     this.setState({ value: event.target.value });
//     event.preventDefault();
//   }

//   sendValueForStore() {
//     const { column, comparison, value } = this.state;
//     const { addPlanetFilters } = this.props;
//     addPlanetFilters({ column, comparison, value });
//     this.setState({
//       column: '',
//     });
//   }

//   selectOfComparison() {
//     const { comparison } = this.state;
//     return (
//       <select
//         name="comparison"
//         value={comparison}
//         onChange={this.handleComparison}
//         required
//       >
//         <option value="" disabled> SELECIONE </option>
//         <option value="bigger">MAIOR QUE</option>
//         <option value="smaller">MENOR QUE</option>
//         <option value="equal">IGUAL Á</option>
//       </select>
//     );
//   }

//   selectOfColunm(numeric) {
//     const { column } = this.state;
//     return (
//       <select name="column" value={column} onChange={this.handleColumn} required>
//         <option value="" disabled> Selecionar Opção </option>
//         {selectIsTrueOrFalse(numeric, 'population') && (
//           <option value="population">População</option>
//         )}
//         {selectIsTrueOrFalse(numeric, 'orbital_period') && (
//           <option value="orbital_period">Duração Orbital</option>
//         )}
//         {selectIsTrueOrFalse(numeric, 'diameter') && (
//           <option value="diameter">Diâmetro</option>
//         )}
//         {selectIsTrueOrFalse(numeric, 'rotation_period') && (
//           <option value="rotation_period">Duração da Rotação</option>
//         )}
//         {selectIsTrueOrFalse(numeric, 'surface_water') && (
//           <option value="surface_water">Superfície da Água</option>
//         )}
//       </select>
//     );
//   }

//   render() {
//     const { column, comparison, value } = this.state;
//     const { numeric_values } = this.props;
//     return (
//       <form>
//         <fieldset>
//           <legend>Campos de Filtro</legend>
//           {this.selectOfColunm(numeric_values)}
//           {this.selectOfComparison()}
//           <input
//             type="number"
//             value={value}
//             placeholder="Valor numérico"
//             onChange={this.handleInput}
//           />
//           {column && comparison && value && (
//             <button type="submit" onClick={() => this.sendValueForStore()}>
//               {' '}
//               Enviar Filtro
//               {' '}
//             </button>
//           )}
//         </fieldset>
//       </form>
//     );
//   }
// }

// FilterSelect.propTypes = {
//   addPlanetFilters: PropTypes.func.isRequired,
//   numeric_values: PropTypes.arrayOf(PropTypes.shape({})),
// };

// FilterSelect.defaultProps = {
//   numeric_values: [],
// };
export default FilterSelect;
