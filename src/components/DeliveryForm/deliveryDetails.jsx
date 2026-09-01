import { Component } from "react";

class DeliveryDetails extends Component {
    render() {
        const { deliveries } = this.props;
        return <div className="container mt-4">
            <h1 className="mb-3">Delivery Details</h1>
            <div className="mt-3">
                <button className="btn btn-primary p-1 my-3" onClick={() => this.props.history.push("/delivery/add")}>Add Delivery</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Delivery Type</th>
                        <th>Payments</th>
                        <th>Slot</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td>{delivery.name}</td>
                            <td>{delivery.gender}</td>
                            <td>{delivery.delivery}</td>
                            <td>{delivery.payments.join(', ')}</td>
                            <td>{delivery.slot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }
}
export default DeliveryDetails;