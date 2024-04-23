import * as yup from "yup";

const signupSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    contact: yup.number().min(0, "Contact can not be nagetive").typeError("Must be a number").required('Enter your contact'),
    email: yup.string().email('Enter valid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default signupSchema;
