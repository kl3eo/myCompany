import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginComponent from '../components/authentications/login/loginComponent';
import RegisterComponent from '../components/authentications/register/registerComponent';
import ForgotComponent from '../components/authentications/forgot/forgotComponent';
import LogoutComponent from '../components/authentications/logoutComponent';
import DashboardComponent from '../components/admin/dashboard/dashboardComponent';
import AdminProfileComponent from '../components/admin/profile/adminProfileComponent';
import AdminUpdateComponent from '../components/admin/profile/update/adminUpdateComponent';

import EmployeesListComponent from '../components/admin/list/employeesListComponent';
import AddEmployeeComponent from '../components/admin/addEmployee/addEmployeeComponent';

import EmployeeDetailsComponent from '../components/employees/details/employeeDetailsComponent';
import EmployeeDetailsUpdateComponent from '../components/employees/details/employeeDetailsUpdateComponent';
import HomeComponent from '../components/employees/home/homeComponent';
import ProfileComponent from '../components/employees/profile/profileComponent';
import NotFoundComponent from '../components/notFoundComponent';

import hoistStatics from "hoist-non-react-statics";

const wrapped = (Component: any) => {
    const C = (props: any | {}) => {
        const {wrappedComponentRef, ...remainingProps} = props;

        return (
            <Route
                children={routeComponentProps => (
                    <Component
                        {...remainingProps}
                        ref={wrappedComponentRef}
                    />
                )}
            />
        );
    };

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return hoistStatics(C, Component);
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' exact={true} component={wrapped(LoginComponent)} />
            <Route path='/login' component={wrapped(LoginComponent)} />
            <Route path='/register' component={wrapped(RegisterComponent)} />
            <Route path='/forgot' component={wrapped(ForgotComponent)} />
            <PrivateRoute path='/logout' component={LogoutComponent} />
            <PrivateRoute path='/admin/dashboard' component={DashboardComponent} />
            <PrivateRoute path='/admin/list' component={EmployeesListComponent} />
            <PrivateRoute path='/admin/new' component={AddEmployeeComponent} />
            <PrivateRoute path='/admin/profile' component={AdminProfileComponent} />
            <PrivateRoute path='/profile/update/:id' component={AdminUpdateComponent} />

            <PrivateRoute path='/employee/details/:id' component={EmployeeDetailsComponent} />
            <PrivateRoute path='/employee/update/:id' component={EmployeeDetailsUpdateComponent} />
            <PrivateRoute path='/employee/home' component={HomeComponent} />
            <PrivateRoute path='/employee/profile' component={ProfileComponent} />

            <Route component={NotFoundComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
