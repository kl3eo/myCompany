import React from 'react';
//import { Link } from 'react-router-dom';
import Tableau from './Tableau'
//import './employees.css';
import CountEmployeesComponent from '../dashboard/countEmployeesComponent';

const EmployeesListView = (props) => {
  if (props.list === undefined) {
    return null;
  }

  if (!props.list.success && props.list.hasOwnProperty('success')) {
    return <div>{props.list.message}</div>
  }

  if (props.list.length === 0) {
    return (<div className='employees' style={{textAlign:'center'}}>
	<CountEmployeesComponent style={{margin:'0 auto'}}/>
    </div>)
  }

  return (
    <div className='employees'>
	<Tableau users={props.list}/>
    </div>
  );
};

export default EmployeesListView;
