import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './details.css';

class employeeDetailsView extends Component {
  render() {
    return (
  <div className='details'>
    {(this.props.success) ? <div className='error'>{this.props.message}</div> : null}
    <table>
      <tbody>
          <tr>
            <th>Имя</th><td className='uppercase'>{this.props.employee.name}</td>
          </tr>
          <tr>
            <th>E-mail</th><td className=''>{this.props.employee.email}</td>
          </tr>
          <tr>
            <th>Должность</th><td className='uppercase'>{this.props.employee.position}</td>
          </tr>
          <tr>
            <th>Роль</th><td>{this.props.employee.role}</td>
          </tr>
          <tr>
            <th>Логин</th><td>{this.props.employee.username}</td>
          </tr>
          {(this.props.employee.active !== false)
            ? 
            <tr className='edit-link'>
              <th></th><td><Link className='link success uppercase' to={`/employee/update/${this.props.employee._id}`}>Редактировать</Link></td>
            </tr>
            : null
          }
      </tbody>
    </table>
    {(this.props.employee.active !== false) ? 
      <Link to={`/employee/details/${this.props.employee._id}`} className='link danger btn-delete' onClick={this.props.handleToggleActive.bind(this, this.props.employee._id)}>Деактивировать {this.props.employee.username}</Link>
      :
      <Link to={`/employee/details/${this.props.employee._id}`} className='link danger btn-delete' onClick={this.props.handleToggleActive.bind(this, this.props.employee._id)}>Активировать {this.props.employee.name}</Link>
    }
  </div>
    )
  }
}

export default connect()(employeeDetailsView);

