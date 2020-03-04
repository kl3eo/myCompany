import React from 'react';
import { Link } from 'react-router-dom';
//import { checkCookie } from '../../../utils/cookies';
import Button from '../../commons/buttons/button';

import './login.css';

const LoginView = (props) => (
  <div className='login-container'>
    <Link to='/' className='logo-login'></Link>

    {(!props.isSuccess) ? <div className='error'>{props.message}</div> : null}
    <form onSubmit={props.handleLogin} className='login-form'>
      <div>
        <input type="text" name="username" placeholder="имя" className="fields" />
      </div>
      <div>
        <input type="password" name="password" placeholder="пароль" className="fields" />
      </div>
      <div>
        <Button classes='btn success' buttonLabel='Вход' />
      </div>
      <p className='forgot-password'>
         <Link to='forgot' className='link success'> Забыли пароль?</Link>
      </p>
    </form>
  </div>
);

export default LoginView;
