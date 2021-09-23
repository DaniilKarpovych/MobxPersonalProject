// Core
import * as yup from 'yup';


export const schema = yup.object().shape({
    minTemp: yup
        .string(),
    maxTemp: yup
        .string(),
});

