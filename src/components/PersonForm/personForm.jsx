import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const personSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(6, "Name should be atleast 6 characters"),
    age: yup.number().typeError("Age must be a number").required("Age is required").min(0, "Age should be greater than 0").max(100, "Age should be less than 100"),
    country: yup.string().required("Country is required"),
    tech: yup.array().min(1, "Atleast one technology must be selected"),
    currentStatus: yup.string().required("Current Status is required")
})

class PersonForm extends Component {
    state = {
        countries: ['USA', 'Canada', 'UK', 'India', 'Australia', 'Germany'],
        tech: ['Javascript', 'React', 'Python', 'Django', 'React Native'],
        currentStatus: ['Student', 'Working', 'Intern']
    }

    render() {
        let { index } = this.props.match.params;
        let person = index ? this.props.persons[index] : {};
        return <div className="container">
            <Formik initialValues={{
                name: person.name || "",
                age: person.age || "",
                country: person.country || '',
                tech: person.tech || [],
                currentStatus: person.currentStatus || ''
            }}
                validationSchema={personSchema}
                onSubmit={(values) => {
                    this.props.onSubmit(values, index);
                    this.props.history.push('/');
                }}>
                {
                    () => {
                        return <Form>
                            <h3>Details of Person to Add</h3>
                            <div className="form-group my-1">
                                <label>Name</label>
                                <Field type="text" name="name" className="form-control" />
                                <ErrorMessage name="name" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label>Age</label>
                                <Field type="number" name="age" className="form-control" />
                                <ErrorMessage name="age" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label>Country</label>
                                <Field component="select" name="country" className="form-control">
                                    <option value="">Select Country</option>
                                    {this.state.countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="country" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label className="form-label fw-bold me-3">Technologies : </label>
                                {this.state.tech.map((tech) => (
                                    <div key={tech} className="form-check form-check-inline">
                                        <Field type="checkbox" className='form-check-input' name="tech" value={tech} />
                                        <label className="form-check-label">{tech}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="tech" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label className="form-label fw-bold me-3">Current Status : </label>
                                {this.state.currentStatus.map((status) => (
                                    <div className="form-check form-check-inline" key={status}>
                                        <Field type="radio" className='form-check-input' name="currentStatus" value={status} />
                                        <label className="form-check-label">{status}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="currentStatus" className="text-danger" component="div" />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        </Form>
                    }
                }
            </Formik>
        </div>
    }
}
export default PersonForm;