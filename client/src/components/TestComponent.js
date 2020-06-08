import React, {Component} from "react";

class TestComponent extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

     async componentDidMount() {
        await fetch("/api/test")
        .then(response => response.json())
        .then(json => {
            json.forEach(element => {
                let item = {
                    id: element.id,
                    name: element.name
                }
                let joined = this.state.data.concat(item);
                this.setState({ data: joined });
            })
        })
    }

    

    render () {
        return (
            <div>
                <h1>
                    DATA
                </h1>
                <ul>
                    {this.state.data.map(item => 
                    <li>
                        <div>
                            ID: {item.id}
                        </div> 
                        <div>
                            NAME: {item.name}
                        </div>
                    </li>)}
                </ul>
            </div>

        )
    }
}

export default TestComponent;