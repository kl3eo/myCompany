import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  employeeDetailsAction
} from '../../../actions/employeesActions';

import {
  employeeToggleActiveAction
} from '../../../actions/adminActions';

import HeaderComponent from '../../commons/headerComponent';
import EmployeeDetailsView from './employeeDetailsView';
import DialogComponent from '../../commons/dialog/dialogComponent';

//import { getCookie } from '../../../utils/cookies';

var user = null;

class EmployeeDetailsComponent extends Component {
  state = {
    isSuccess: false,
    message: '',
    warning: false,
    dialogMessage: ''
  }

  constructor(props) {
    super(props);
    user = JSON.parse(localStorage.getItem('user'));

    const data = {
      employeeID: this.props.match.params.id,
      admin: {
        id: user.id,
        access: user.role
      }
    };

    this.props.dispatch(employeeDetailsAction(data));
  }

  onToggleActive = (event) => {

    const toggler = this.props.response.details.response.active ? 'деактивировать' : 'активировать'
    this.setState({
      warning: true,
      dialogMessage: `Вы в самом деле хотите ${toggler} ${this.props.response.details.response.name}?`
    });
  }

  handleToggleActive = (event) => {
    const response = event.target.innerHTML.toLowerCase();

    if (response === 'yes') {
      const data = {
        admin: {
          access: user.role,
          id: user.id
        },
        id: this.props.response.details.response._id
      };

      this.props.dispatch(employeeToggleActiveAction(data));
    }

    this.setState({
      warning: false,
      dialogMessage: ''
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.response.deactivate.hasOwnProperty('response')) {
      if (nextProps.response.deactivate.response.success !== prevState.isSuccess) {
        return {
          isSuccess: nextProps.response.deactivate.response.success,
          message: nextProps.response.deactivate.response.message
        };
      } else {
        return {
          isSuccess: nextProps.response.deactivate.response.success,
          message: nextProps.response.deactivate.response.message
        };
      }
    } else {
      return null;
    }
  }

  render() {
    if (this.props.response.details.response === undefined) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <HeaderComponent />
        <DialogComponent
          warning={this.state.warning}
          message={this.state.dialogMessage}
          callback={this.handleToggleActive.bind(this)}
        />
        <EmployeeDetailsView 
          success={this.state.isSuccess}
          message={this.state.message}
          handleToggleActive={this.onToggleActive.bind(this)}
          employee={this.props.response.details.response}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state
});

export default connect(mapStateToProps)(EmployeeDetailsComponent);
