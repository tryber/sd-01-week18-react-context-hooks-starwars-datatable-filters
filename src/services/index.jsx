const StarWarsBaseURL = 'https://swapi.co/api/planets';

export const fetchingPlanets = async () => {
  const response = await fetch(StarWarsBaseURL);
  return response.json();
};

const isNumeric = (str) => {
  const er = /^[0-9]+$/;
  return (er.test(str));
}

const compareFunction = (A, B) => {
  if (A > B) {
    return -1;
  }
  if (B < A) {
    return 1;
  }
  return 0;
}

export const shortingData = (data, { column, order }) => {
  const shortData = [...data];
  shortData.sort(({ [column]: A }, { [column]: B }) => {
    if (isNumeric(A) && isNumeric(B)) {
      return compareFunction(Number(A), Number(B));
    }
    return compareFunction(A, B);
  });
  if (order === 'ASC') {
    shortData.reverse();
  }
  return shortData;
}

const comparisonCase = (ColumnValue, ComparisonSign, Value) => {
  switch (ComparisonSign) {
    case 'greater': {
      const greater = ColumnValue > Value;
      return greater;
    }
    case 'less': {
      const less = ColumnValue < Value;
      return less;
    }
    case 'iqual': {
      const iqual = ColumnValue === Value;
      return iqual;
    }
    default:
      return false;
  }
}

export const comparisonSing = (ComparisonSign) => {
  switch (ComparisonSign) {
    case 'greater':
      return 'maior que';
    case 'less':
      return 'menor que';
    case 'iqual':
      return 'igual a';
    default:
      return null;
  }
}

export const filterNumber = (planets, column, comparison, value) => {
  return planets.filter((planet) => comparisonCase(Number(planet[column]), comparison, Number(value)))
}

