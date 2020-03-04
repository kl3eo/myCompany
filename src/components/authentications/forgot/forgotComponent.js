import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { forgotPasswordAction } from '../../../actions/authenticationActions';
import Button from '../../commons/buttons/button';

import './forgot.css';

class ForgotComponent extends Component {
  state = {
    success: false,
    message: ''
  }

  renew = (event) => {
    event.preventDefault();
    const data = {
      password: event.target.password.value,
      username: event.target.username.value
    }

    this.props.dispatch(forgotPasswordAction(data));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.forgot.hasOwnProperty('response')) {
      if (nextProps.forgot.response.success !== prevState.success) {
        return {
          success: nextProps.forgot.response.success,
          message: nextProps.forgot.response.message
        };
      } else {
        return {
          success: nextProps.forgot.response.success,
          message: nextProps.forgot.response.message
        };
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className='login-container'>
        <div className={(this.state.success) ? 'error success' : 'error'}>{this.state.message}</div>
        <Link to='/' className='logo-login'></Link>
        <form onSubmit={this.renew.bind(this)}>
          <div><input type='text' name='username' placeholder='ваш логин' className='fields' /></div>
          <div><input type='password' name='password' placeholder='новый пароль' className='fields' /></div>
          <div style={{float:'right', marginRight:'110px'}}><Button classes='btn success' buttonLabel='Применить' /></div>
          <p>
          <Link to='login' className='link success'>Вход</Link>
          </p>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(ForgotComponent);
