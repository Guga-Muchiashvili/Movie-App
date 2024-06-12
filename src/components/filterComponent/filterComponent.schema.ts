import * as yup from 'yup';


const schema = yup.object().shape({
    type: yup.string().required('Please select a type').oneOf(['movie', 'tv'], 'Invalid selection'),
    genres : yup.array().of(yup.string())
  });

  export default schema