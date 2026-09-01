import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import DeliveryDetails from "./deliveryDetails";
import DeliveryForm from "./deliveryForm";

class MainComponent extends Component {
    state = {
        deliveries: [
            { name: 'Amit', gender: 'Male', delivery: 'Office', payments: ['Credit Card', 'Debit Card'], slot: '2PM - 6PM' },
            { name: 'Priya', gender: 'Female', delivery: 'Pickup', payments: ['UPI', 'Net Banking'], slot: '10AM - 2PM' },
            { name: 'Rahul', gender: 'Male', delivery: 'Home', payments: ['Cash'], slot: '6PM - 10PM' },
        ]
    }
    handleAddOrUpdate = (data, index) => {
        let { deliveries } = this.state;
        if (index) {
            deliveries[index] = { ...deliveries[index], ...data };
        } else {
            deliveries.push({ ...data });
        }
        this.setState({ deliveries });

    }
    render() {
        const { deliveries } = this.state;
        return <div className="container">
            <Switch>
                <Route path='/delivery/:index/edit' render={(props) => <DeliveryForm {...props} deliveries={deliveries} edit={true} onSubmit={this.handleAddOrUpdate} />} />
                <Route path='/delivery/add' render={(props) => <DeliveryForm {...props} deliveries={deliveries} edit={false} onSubmit={this.handleAddOrUpdate} />} />
                <Route path='/' render={(props) => <DeliveryDetails {...props} deliveries={deliveries} />} />
            </Switch>
        </div>
    }
}
export default MainComponent;