import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
            <Project>

                <header className='project-header'>
                <h1>{this.state.project.name}</h1>
                <p>{this.state.project.description}</p>
                </header>

                <ol>
                    {this.state.actions.map(action => (
                        <li>
                            <p>{action.description}</p>
                            <p>{action.notes}</p>
                        </li>
                    ))}
                </ol>
            </Project>
        )
    }
}

const Project = styled.section`
    
    width: 500px;
    margin: 0 auto;
    text-align: left;

    .project-header {
        border: 1px solid lightpink;
        padding: 15px;
        border-radius: 5px;

        h1 {
            margin: 0;
            text-decoration: underline;
            color: hotpink;
        }
        p {
            color: lightpink;
        }
    }

    ol {
        li {
            margin: 0;
            color: hotpink;

            p:last-of-type {
                padding-left: 20px;
                color: lightpink;
            }
        }
    }
`

export default SingleProject;