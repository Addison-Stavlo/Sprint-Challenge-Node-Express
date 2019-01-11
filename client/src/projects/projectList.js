import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class ProjectList extends React.Component {

    state = {
        projects: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/projects')
            .then(res => {
                this.setState({projects: res.data.projects})
            })
    }

    selectProject = (projectID) => {
        this.props.history.push(`/${projectID}`)
    }

    render() {
        return(
            <Projects>
            <h1>PROJECT LIST</h1>
            {this.state.projects.map(project => (
                <div onClick={()=>this.selectProject(project.id)}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                </div>
            ))}
            </Projects>
        )
    }
}

const Projects = styled.section`
    width: 500px;
    margin: 0 auto;
    cursor: pointer;

    h1 {
        text-decoration: underline;
        margin-bottom: 40px;
    }
    h1, h3 {
        color: hotpink;
    }
    h3, p {
        text-align: left;
    }
    p {
        color: lightpink;
        padding-left: 20px;
    }
    
    div {
        padding: 0 5px 0 10px;
        margin-bottom: 30px;
        border-radius: 5px;
        &:hover {
            box-shadow: 0 0 15px 0 lightpink;
        }
    }
`

export default ProjectList;