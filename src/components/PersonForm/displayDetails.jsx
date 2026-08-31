import { Component } from "react";

class DisplayDetails extends Component {
    render() {
        const { persons } = this.props;
        return <div className="container mt-2">
            <h4 className="row justify-content-center">Welcome to Formik Application</h4>
            <div className="row my-4 bg-warning fw-bold">
                <div className="col-2 border p-1 px-3">Name</div>
                <div className="col-2 border p-1 px-3">Age</div>
                <div className="col-2 border p-1 px-3">Country</div>
                <div className="col-2 border p-1 px-3">Tech</div>
                <div className="col-2 border p-1 px-3">Current Status</div>
                <div className="col-2 border p-1 px-3"></div>
            </div>
            {persons.map((person, index) => (
                <div key={index} className="row">
                    <div className="col-2 border p-1 px-3">{person.name}</div>
                    <div className="col-2 border p-1 px-3">{person.age}</div>
                    <div className="col-2 border p-1 px-3">{person.country}</div>
                    <div className="col-2 border p-1 px-3">{person?.tech?.join(", ")}</div>
                    <div className="col-2 border p-1 px-3">{person?.currentStatus}</div>
                    <div className="col-2 border p-1 px-3">
                        <button className="btn btn-secondary m-1" onClick={() => this.props.history.push(`/person/${index}/edit`)}>EDIT</button>
                    </div>
                </div>
            ))}
            <div className="mt-3">
                <button className="btn btn-primary p-1" onClick={() => this.props.history.push("/person/add")}>Add Person</button>
            </div>
        </div>;
    }
}
export default DisplayDetails