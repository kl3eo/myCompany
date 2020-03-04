import React, {Component} from 'react';
import { baseurl, handleResponse } from '../../../utils/baseurl';
import UserCard from './UserCard'
import { connect } from 'react-redux'
import './user.css'

import {
  fillDetailsAction
} from '../../../actions/employeesActions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered : false
    };
    this.toggleHover = this.toggleHover.bind(this);
  }
  
  toggleHover(){
    this.setState(prevState => ({isHovered: !prevState.isHovered}));
  }

////////

async getUserData(employeeID) {
  let user = JSON.parse(localStorage.getItem('user'));
  
  const FETCH_PROFILE = baseurl(`employee/details?employeeID=${employeeID}`);

  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.token
    }
  }

  return await fetch(FETCH_PROFILE, parameters)
    .then(response => {return handleResponse(response)})    
    .then(response => {
      return response.json();
    })
    .then(
    response => { 
        this.props.dispatch(fillDetailsAction(response));
	this.props.parentCallback(<UserCard obj={response} />);
    })
    .then(json => {
      return json;
    }).catch(error => {
      return error;
    });
}

////////  
  render(){
    const btnClass = this.state.isHovered ? 'blu' : 'norma';

    return (<span className={btnClass} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick={(e) => this.getUserData(this.props.id)} >{this.props.username}</span>);
  }
};


const mapStateToProps = (state) => (state);

export default connect(
  mapStateToProps
)(User)
