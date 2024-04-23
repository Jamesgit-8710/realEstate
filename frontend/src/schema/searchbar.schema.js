import * as yup from "yup";

const searchbarSchema = yup.object().shape({
    chooseArea: yup.string().required('Select the area'),
    propertyType: yup.string().required('Select the type')
});

export default searchbarSchema;

