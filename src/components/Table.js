import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { loadData } from '../actions/starWarsApi';
import storeContext from '../context';
import './table.css';

class Table extends React.Component {
  static generateTableHead(data) {
    if (data.length > 0) {
      const arrayOfTags = Object.entries(data[0])
        .map((tag) => tag[0])
        .filter((name) => name !== 'residents');
      return (
        <table>
          <thead>
            <tr>
              {arrayOfTags.map((tag) => (
                <th key={`${tag}1`}>{tag}</th>
              ))}
            </tr>
          </thead>
          <tbody>{Table.generateTableBody(data, arrayOfTags)}</tbody>
        </table>
      );
    }
    return <p>Planeta não encontrado</p>;
  }

  static generateTableBody(data, arrayOfTags) {
    return data.map((planet) => (
      <tr key={planet.diameter}>
        {arrayOfTags.map((tag) => (
          <td key={tag}>{planet[tag]}</td>
        ))}
      </tr>
    ));
  }

  componentDidMount() {
    this.context.starWarsAPI();
  }

  render() {
    console.log(this.context)
    if (this.context.initialData.isFetching) {
      return <p>LOADING...</p>;
    }
    if (this.context.initialData.sucess) {
      if (this.props.finalData) {
        return Table.generateTableHead(this.props.finalData);
      }
      return Table.generateTableHead(this.context.initialData.data.results);
    }
    return <div>ERROR</div>;
  }
}

const mapStateToProps = (state) => ({
  finalData: state.finalFilterReducer.data,
  // initialData: state.apiServiceReducer.data,
  // isFetching: state.apiServiceReducer.isFetching,
  // sucess: state.apiServiceReducer.sucess,
});

// const mapDispatchToProps = (dispatch) => ({
//   loadData: () => dispatch(loadData()),
// });

Table.propTypes = {
  // sucess: PropTypes.string.isRequired,
  // isFetching: PropTypes.string.isRequired,
  // initialData: PropTypes.shape({
  //   count: PropTypes.number.isRequired,
  //   results: PropTypes.arrayOf.isRequired,
  // }).isRequired,
  finalData: PropTypes.shape({
    count: PropTypes.number.isRequired,
    results: PropTypes.arrayOf.isRequired,
  }).isRequired,
  // loadData: PropTypes.func.isRequired,
};

Table.contextType = storeContext;
export default connect(mapStateToProps)(Table);
