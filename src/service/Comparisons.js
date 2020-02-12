export const textColumns = [
  'NOME',
  'POPULAÇÃO',
  'DURAÇÃO DA ORBITA',
  'DIÂMENTRO',
  'CLIMA',
  'GRAVIDADE',
  'SOLO',
  'DURAÇÃO DA ROTAÇÃO',
  'SUPERFÍCIE DE ÁGUA',
  'FILMES',
  'CRIADO',
  'EDITADO',
  'URL',
];

export const columns = [
  'Faça Sua Escolha',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const findComparisons = (data, filter) => {
  const { column, comparison, value } = filter;
  switch (comparison) {
    case 'bigger than':
      return data.filter(
        (planet) => planet[column] > Number(value) && planet[column] !== 'unknown',
      );
    case 'less than':
      return data.filter(
        (planet) => planet[column] < Number(value) && planet[column] !== 'unknown',
      );
    case 'equal to':
      return data.filter((planet) => planet[column] === value && planet[column] !== 'unknown');
    default:
      return false;
  }
};
