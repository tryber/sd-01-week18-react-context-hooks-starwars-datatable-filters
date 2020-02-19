const StarWarsBaseURL = 'https://swapi.co/api/planets';

export const fetchingPlanets = async () => {
  const response = await fetch(StarWarsBaseURL);
  return response.json();
};

const isNumeric = (str) => {
  const er = /^[0-9]+$/;
  return (er.test(str));
};

export const shortingData = (data, { column, order }) => {
  const shortData = [...data];
  shortData.sort(({ [column]: A }, { [column]: B }) => {
    if (isNumeric(A) && isNumeric(B)) {
      return A - B;
    }
    return A.toString().localeCompare(B);
  });
  if (order === 'DSC') {
    shortData.reverse();
  }
  return shortData;
};

const comparisonCase = (ColumnValue, ComparisonSign, Value) => {
  const comparisson = {
    greater: ColumnValue > Value,
    less: ColumnValue < Value,
    iqual: ColumnValue === Value,
  };
  return comparisson[ComparisonSign];
};

export const comparisonSing = (ComparisonSign) => {
  const sign = {
    greater: 'maior que',
    less: 'menor que',
    iqual: 'igual a',
  };
  return sign[ComparisonSign];
};

export const filterNumber = (planets, column, comparison, value) => (
  planets.filter((planet) =>
    comparisonCase(Number(planet[column]), comparison, Number(value)))
);
