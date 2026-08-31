import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';

const personValidate = (values) => {
    const error = {};
    if (!values.name) {
        error.name = "Name is required"
    }
    else if (values.name.length < 6) {
        error.name = "Name should be atleast 6 characters";
    }

    if (!values.age) {
        error.age = "Age is required"
    }
    else if (isNaN(+values.age)) {
        error.age = "Age should be a number"
    }
    else if (values.age < 0) {
        error.age = "Age should be greater than 0"
    }
    else if (values.age > 100) {
        error.age = "Age should be less than 100"
    }

    if (!values.country) {
        error.country = "Country is required"
    }

    if (!values.tech || !values.tech.length) {
        error.tech = "Atleast one technology must be selected";
    }

    if (!values.currentStatus) {
        error.currentStatus = "Current Status is required"
    }
    return error;
}
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
                validate={personValidate}
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