import * as yup from 'yup';

const schema = yup.object().shape({
  type: yup
    .string()
    .required('Please select a type')
    .oneOf(['movie', 'tv'], 'Invalid selection'),
  with_genres: yup.string(),
  release_dategte: yup.string(),
  release_datelte: yup.string(),
  vote_averagegte: yup
    .string()
    .test('is-number', 'Must be a number', value => !isNaN(Number(value)))
    .test('min', 'Must be at least 0', value => Number(value) >= 0)
    .test('max', 'Must be at most 10', value => Number(value) <= 10),
  vote_averagelte: yup
    .string()
    .test('is-number', 'Must be a number', value => !isNaN(Number(value)))
    .test('min', 'Must be at least 0', value => Number(value) >= 0)
    .test('max', 'Must be at most 10', value => Number(value) <= 10),
  with_origin_country: yup.string(),
});

export default schema;
