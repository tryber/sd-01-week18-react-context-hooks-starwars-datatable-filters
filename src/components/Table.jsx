import React, { useContext } from 'react';
import { ReciperContext } from '../context';
import usePlanets from '../hooks/usePlanets';

const renderTable = (categories, planets) => {
  return (
    <table>
      <thead>
        <tr>
          {categories.map((category) => <th key={category} data-testid={category}>{category}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet, index) => <tr key={planet.name}>
          {categories.map((key) => <td key={key} data-testid={`row${key + index}`}>{planet[key]}</td>)}
        </tr>)}
      </tbody>
    </table>
  );
}

const Table = () => {
  const { database: { categories, planets, isFetch } } = useContext(ReciperContext);
  usePlanets();
  return (
    <div>
      {planets && !isFetch ? renderTable(categories, planets) : <p>Loading...</p>}
    </div>
  );
}



// function compareFunction(A, B) {
//   if (A > B) {
//     return -1;
//   }
//   if (B < A) {
//     return 1;
//   }
//   return 0;
// }

// function isNumeric(str) {
//   const er = /^[0-9]+$/;
//   return (er.test(str));
// }

// export class Table extends Component {
//   constructor(props) {
//     super(props);

//     this.filterByName = this.filterByName.bind(this);
//     this.filterByNumber = this.filterByNumber.bind(this);
//     this.filteredContent = this.filteredContent.bind(this);
//   }

//   filterByNumber(newData) {
//     const { addFilter } = this.props;
//     if (addFilter !== []) {
//       const PlanetsEachFilter = addFilter.map((FilerObj) =>
//         newData.filter((PlanetObj) =>
//           comparisonCase(
//             Number(PlanetObj[FilerObj.column]),
//             FilerObj.comparison,
//             Number(FilerObj.value),
//           ),
//         ),
//       );
//       return newData.filter((CurrentPlanet) => {
//         const boolean = PlanetsEachFilter
//           .map((EachFilter) => EachFilter
//             .includes(CurrentPlanet));
//         return boolean.every((bool) => bool === true);
//       });
//     }
//     return newData;
//   }

//   filterByName() {
//     const { data, name } = this.props;
//     if (name !== '') {
//       return data
//         .filter(((PlanetObj) => PlanetObj.name.toLowerCase()
//           .includes(name.toLowerCase())));
//     }
//     return data;
//   }

//   filteredContent() {
//     const { shortOrder } = this.props;
//     const { column, order } = shortOrder;
//     const filteredData = this.filterByNumber(this.filterByName());
//     const shortData = [...filteredData];
//     shortData.sort(({ [column]: A }, { [column]: B }) => {
//       if (isNumeric(A) && isNumeric(B)) {
//         return compareFunction(Number(A), Number(B));
//       }
//       return compareFunction(A, B);
//     });
//     if (order === 'ASC') {
//       shortData.reverse();
//     }
//     return shortData;
//   }

//   renderContent(categories) {
//     const content = this.filteredContent();
//     return (
//       <tbody>
//         {content.map((planet, index) => <tr key={planet.name}>
//           {categories.map((key) => <td key={key} data-testid={`row${key + index}`}>{planet[key]}</td>)}
//         </tr>)}
//       </tbody>
//     );
//   }

//   renderTable() {
//     const { data } = this.props;
//     console.log(data)
//     const categories = Object.keys(data[0]).filter((category) => category !== 'residents');
//     return (
//       <table>
//         <thead>
//           <tr>
//             {categories.map((category) => <th key={category} data-testid={category}>{category}</th>)}
//           </tr>
//         </thead>
//         {this.renderContent(categories)}
//       </table>
//     );
//   }

//   render() {
//     const { data, isFetching } = this.props;
//     return (
//       
//     );
//   }
// }

// Table.propTypes = {
//   isFetching: PropTypes.bool,
//   data: PropTypes.arrayOf(PropTypes.shape({
//     climate: PropTypes.string.isRequired,
//     created: PropTypes.string.isRequired,
//     diameter: PropTypes.string.isRequired,
//     edited: PropTypes.string.isRequired,
//     films: PropTypes.arrayOf(PropTypes.string.isRequired),
//     gravity: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     orbital_period: PropTypes.string.isRequired,
//     population: PropTypes.string.isRequired,
//     rotation_period: PropTypes.string.isRequired,
//     surface_water: PropTypes.string.isRequired,
//     terrain: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   })),
//   name: PropTypes.string,
//   shortOrder: PropTypes.shape({
//     column: PropTypes.string.isRequired,
//     order: PropTypes.string.isRequired,
//   }).isRequired,
//   addFilter: PropTypes.arrayOf(PropTypes.shape({
//     column: PropTypes.string.isRequired,
//     comparison: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//   })),
// };

// Table.defaultProps = {
//   data: null,
//   isFetching: false,
//   name: '',
//   addFilter: [],
// };

export default Table;
