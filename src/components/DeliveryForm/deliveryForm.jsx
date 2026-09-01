import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const deliveryValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(5, "Name should be atleast 5 characters"),
    gender: yup.string().required("Gender is required"),
    delivery: yup.string().required("Delivery Type is required"),
    payments: yup.array().min(1, "Atleast one payment method must be selected").max(2, "You can select at most 2 payments"),
    slot: yup.string().required("Delivery Slot is required")
});


class DeliveryForm extends Component {
    state = {
        options: {
            deliveryTime: ['10AM-2PM', '2PM-6PM', '6PM-10PM'],
            payments: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash'],
            deliveryType: ['Office', 'Home', 'Pickup'],
            genders: ['Male', 'Female']
        }
    }

    render() {
        const { edit, deliveries, onSubmit } = this.props;
        const { index } = this.props.match.params;
        const { deliveryTime, payments, deliveryType, genders } = this.state.options;
        const delivery = index > -1 ? deliveries[index] : {};

        return <div className="col-8 bg-light mt-3 p-3">
            <Formik initialValues={{
                name: delivery.name || "",
                gender: delivery.gender || "",
                delivery: delivery.delivery || '',
                payments: delivery.payments || [],
                slot: delivery.slot || ''
            }}
                validationSchema={deliveryValidationSchema}
                onSubmit={(values) => {
                    onSubmit(values, index);
                    this.props.history.push('/');
                }}>
                {
                    () => {
                        return <Form>
                            <h3>Details of Delivery to {edit ? 'Edit' : 'Add'}</h3>
                            <div className="form-group my-1">
                                <label>Name</label>
                                <Field type="text" name="name" className="form-control" />
                                <ErrorMessage name="name" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label className="form-label fw-bold me-3">Gender : </label>
                                {genders.map((gender) => (
                                    <div className="form-check form-check-inline" key={gender}>
                                        <Field type="radio" className='form-check-input' name="gender" value={gender} />
                                        <label className="form-check-label">{gender}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="gender" className="text-danger" component="div" />
                            </div>

                            <div className="form-group my-1">
                                <label className="form-label fw-bold me-3">Choose your Delivery Options : </label>
                                {deliveryType.map((type) => (
                                    <div className="form-check form-check-inline" key={type}>
                                        <Field type="radio" className='form-check-input' name="delivery" value={type} />
                                        <label className="form-check-label">{type}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="delivery" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label className="form-label fw-bold me-3">Choose your Payment Mode : </label>
                                {payments.map((payment) => (
                                    <div key={payment} className="form-check form-check-inline">
                                        <Field type="checkbox" className='form-check-input' name="payments" value={payment} />
                                        <label className="form-check-label">{payment}</label>
                                    </div>
                                ))}
                                <ErrorMessage name="payments" className="text-danger" component="div" />
                            </div>
                            <div className="form-group my-1">
                                <label>Delivery Slot</label>
                                <Field component="select" name="slot" className="form-control">
                                    <option value="">Select Delivery Slot</option>
                                    {deliveryTime.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="slot" className="text-danger" component="div" />
                            </div>

                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        </Form>
                    }
                }
            </Formik>
        </div>

    }
}

export default DeliveryForm;