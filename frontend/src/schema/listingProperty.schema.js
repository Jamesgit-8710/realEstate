import * as yup from "yup";

const listingPropertySchema = yup.object().shape({
    propertyType: yup.string().required('Field is required'),
    propertySize: yup.string().required('Field is required'),
    amount: yup.number().min(0, "Number must be greater than or equal to 0").typeError("Must be a number").required('Enter the amount'),
    buildingName: yup.string().required('Enter the building name'),
    address: yup.string().required('Enter the address'),
    city: yup.string().required('Select the city'),
    poc: yup.string().required('Field is required'),
    pocName: yup.string().required('Enter your name'),
    pocEmail: yup.string().email('Enter valid email address').required('Enter your email'),
    pocContact: yup.number().min(0, "Contact can not be nagetive").typeError("Must be a number").required('Enter your contact'),
});

export default listingPropertySchema;
