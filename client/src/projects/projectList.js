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
            <>
            <h1>PROJECT LIST</h1>
            {this.state.projects.map(project => (
                <div onClick={()=>this.selectProject(project.id)}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                </div>
            ))}
            </>
        )
    }
}

export default ProjectList;