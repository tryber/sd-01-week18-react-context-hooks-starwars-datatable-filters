import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import SelectOfColunm from './SelectOfColunm';
import SelectOfComparison from './SelectOfComparison';
import InputNumeric from './InputNumeric';


export default function FilterSelect() {
  const {
    filterComparison,
    filterColunm,
    filtervalue,
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  const sendValues = (event) => {
    event.preventDefault()
    const filter = [...filters, { numeric_values: { filterComparison, filterColunm, filtervalue } }]
    setFilters( filter)};
  return (
    <form>
      <fieldset>
        <legend>Campos de Filtro</legend>
        <SelectOfColunm />
        <SelectOfComparison />
        <InputNumeric />
        {filterComparison && filterColunm && filtervalue && <button
          type="submit"
          onClick={(e)=> sendValues(e)}
        >
          Enviar Filtro
        </button>}
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