import React from 'react';
import axios from 'axios';

class SingleProject extends React.Component {
    state = {
        project: {},
        actions: []
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/api/projects/${this.props.match.params.projectID}`)
            .then(res => {
                this.setState({project: res.data.project});
                axios.get(`http://localhost:5000/api/projects/${this.props.match.params.projectID}/actions`)
                    .then(res => {
                        console.log(res.data.actions)
                        this.setState({actions: res.data.actions})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <h1>{this.state.project.name}</h1>
                <p>{this.state.project.description}</p>

                <ol>
                    {this.state.actions.map(action => (
                        <li>
                            <p>{action.description}</p>
                            <p>{action.notes}</p>
                            <p>{action.completed}</p>
                        </li>
                    ))}
                </ol>
            </>
        )
    }
}

export default SingleProject;