import React, {Component} from "react";
import '../Home.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Container, Columns } from 'react-bulma-components';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    render() {
        return (
            <body>
            <Container>
                    <h1 className="title">StreamPair</h1>
                    <Button variant="secondary" className="stream-btn">StreamPair Now!</Button>
                <Columns>
                    <Columns.Column className="streaming">
                        <h3>Netflix</h3>
                    </Columns.Column>
                    <Columns.Column className="streaming">
                        <h3>HBO</h3>
                    </Columns.Column>
                    <Columns.Column className="streaming">
                        <h3>Amazon Prime</h3>
                    </Columns.Column>
                </Columns>
            </Container>
            </body>
        )
    }
}

export default Home;