import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRefreshAction } from '../../actions/employeesActions';
//import { getCookie } from '../../utils/cookies';

import './header.css';

class HeaderComponent extends Component {

  componentDidMount() {
    document.title = 'Моя компания';
    this.props.dispatch(updateRefreshAction([]));
  }

  render() {

    let user = JSON.parse(localStorage.getItem('user'));

    return (
      <div className='header-container'>
        <Link to='/' className='logo'></Link>
         {(user && user.role === 'Admin')
        ? <span className='welcome uppercase'>Привет <Link to='/admin/profile' className='link success'>Admin</Link></span> 
        : (user && user.role !== 'Admin')
		? <span className='welcome uppercase'>Привет <Link to='/employee/profile' className='link success'>{user.name}</Link></span>
		: <span className='welcome uppercase'>Привет</span>
	}
        <Link to='/logout' className='btn danger logout'>Выход</Link>
	       
	{(user && user.role === 'Admin')
        ?
        <ul className='mynavbar'>
          <li><Link className={(window.location.pathname.split('/')[2] === 'dashboard') ? 'navlink active' : 'navlink inactive'} to='/admin/dashboard'>Панель</Link></li>
          <li><Link className={(window.location.pathname.split('/')[2] === 'list') ? 'navlink active' : 'navlink inactive'} to='/admin/list'>Работники</Link></li>
          <li><Link className={(window.location.pathname.split('/')[2] === 'new') ? 'navlink active' : 'navlink inactive'} to='/admin/new'>Добавить работника</Link></li>
        </ul>
        :
        <ul className='mynavbar'>
          <li><Link className={(window.location.pathname.split('/')[2] === 'home') ? 'navlink active' : 'navlink inactive'} to='/employee/home'>Home</Link></li>
          <li><Link className={(window.location.pathname.split('/')[2] === 'profile') ? 'navlink active' : 'navlink inactive'} to='/employee/profile'>Profile</Link></li>
        </ul>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(HeaderComponent);
