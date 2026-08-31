import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PersonForm from "./personForm";
import DisplayDetails from "./displayDetails";

class MainComponent extends Component {
    state = {
        persons: [
            { name: "Brad Williams", age: 27, country: "Canada", tech: ["Javascript", 'React'], currentStatus: 'Student' },
            { name: "John Doe", age: 32, country: "USA", tech: ["Python", 'Django'], currentStatus: 'Working' },
            { name: "Jane Smith", age: 22, country: "UK", tech: ["Javascript", "React Native"], currentStatus: 'Intern' },
        ]
    }
    handleSubmit = (person, index = -1) => {
        console.log("index -> ", index)
        let person1 = [...this.state.persons];
        if (index > -1) {
            person1[+index] = { ...person1[index], ...person };
        } else {
            person1.push(person);
        }
        this.setState({ persons: person1 });
    }
    render() {
        const { persons } = this.state;
        console.log("person -> ", persons)
        return <div className="container">
            <div className="row">
                <div className="col-12">
                    <Switch>
                        <Route path="/person/add" render={(props) => <PersonForm persons={persons} {...props} onSubmit={this.handleSubmit} />} />
                        <Route path="/person/:index/edit" render={(props) => <PersonForm persons={persons} {...props} onSubmit={this.handleSubmit} />} />
                        <Route path="/" render={(props) => <DisplayDetails persons={persons} {...props} />} />
                    </Switch>
                </div>
            </div>
        </div>
    }
}
export default MainComponent;