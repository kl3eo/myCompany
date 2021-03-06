import React, { Component } from 'react';
import { connect } from 'react-redux';

import { employeeDetailsAction, employeeUpdateAction } from '../../../actions/employeesActions';

import HeaderComponent from '../../commons/headerComponent';
import EmployeeDetailsUpdateView from './employeeDetailsUpdateView';

//import { getCookie } from '../../../utils/cookies';

var user = null;

class EmployeeDetailsUpdateComponent extends Component {

  state = {
    isSuccess: null,
    message: '',
    employee: {},
    profileimg: '',
    oldprofileimg: ''
  }
  
  constructor(props) {
    super(props);
    user = JSON.parse(localStorage.getItem('user'));
  }
  
  componentDidMount() {
    this.props.dispatch(employeeDetailsAction({ employeeID: this.props.match.params.id }));

    if (typeof this.props.response.fill.response !== 'undefined') {
        this.setState({...this.state, oldprofileimg: this.props.response.fill.response.profileimg}, () => {
	//console.log('set1 to '+ this.state.oldprofileimg)
	});
    } else {

        if (typeof this.props.response.details.response !== 'undefined') {
            this.setState({...this.state, oldprofileimg: this.props.response.details.response.profileimg}, () => {
	    //console.log('set2 to '+ this.state.oldprofileimg)
	    });
        };
    }
  }

  onFileChange = (event)  => {
        this.setState({ profileimg: event.target.files[0] })
	this.setState({ oldprofileimg: '' })
  }
      
  onHandleUpdateEmployee = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let position = event.target.position.value;
    let username = event.target.username.value;
    let password = event.target.password.value;
    let email = event.target.email.value;
    let role = event.target.role.value;
    let _id = this.props.response.details.response._id ? this.props.response.details.response._id : this.props.response.fill.response._id;
    let profileimg = this.state.profileimg;

if (this.state.oldprofileimg === '') {
    const data = {
      name, position, username, password, role, _id, email, profileimg, 
      admin: {
        access: user.role,
        id: user.id
      }
    };
    this.props.dispatch(employeeUpdateAction(data));
} else {
    const data = {
      name, position, username, password, role, _id, email, 
      admin: {
        access: user.role,
        id: user.id
      }
    };
    this.props.dispatch(employeeUpdateAction(data));
}
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {
//console.log(nextProps.response)
    if (nextProps.response.update.hasOwnProperty('response')) {
     
      if (nextProps.response.update.response.success !== prevState.isSuccess) {

	return {
          	isSuccess: nextProps.response.update.response.success,
          	message: nextProps.response.update.response.message,
          	employee: nextProps.response.details.response
        };

      } else {
      
	return {
          	isSuccess: nextProps.response.update.response.success,
          	message: nextProps.response.update.response.message
        };
      }
    } else {

	return null;
    }
  }

  render() {
    if (typeof this.props.response.details.response === 'undefined') {
      return <div>Loading...</div>
    }
    
    return (
      <div>
        <HeaderComponent />
        <EmployeeDetailsUpdateView
          message={this.state.message}
          success={this.state.isSuccess}
          handleUpdateEmployee={this.onHandleUpdateEmployee}
          employee={this.props.response.details.response} 
	  role={user.role} 
	  onFileChange={this.onFileChange}
         />
       </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state
});

export default connect(mapStateToProps)(EmployeeDetailsUpdateComponent);
