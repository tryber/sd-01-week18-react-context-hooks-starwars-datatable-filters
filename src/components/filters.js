function findComparisons(data, filters) {
  const { column, comparison, numberValue } = filters;

  console.log(column, comparison, numberValue)

  switch (comparison) {
    case 'greater-than':
      return data.filter(
        (planet) => planet[column] > Number(numberValue) && planet[column] !== 'unknown',
      );
    case 'less-than':
      return data.filter(
        (planet) => planet[column] < Number(numberValue) && planet[column] !== 'unknown',
      );
    case 'equal-to':
      return data.filter(
        (planet) => planet[column] === numberValue && planet[column] !== 'unknown'
      );
    default:
      return false;
  }
}

function filterByValue(data, filters) {
  if (filters) {
    const results = findComparisons(data, filters);
    return findComparisons(results, filters);
  };
}

function filterPlanetByName(data, filterPlanetName) {
  const nameFiltered = data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName));
  return nameFiltered;
}

function Filters(data, filters, filterPlanetName) {
  if (filterPlanetName) {
    return filterPlanetByName(data, filterPlanetName);
  }
  if (filters) {
    return filterByValue(data, filters);
  }
  return data;
}

export default Filters;
