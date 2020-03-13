// no hooks
///////////////////
import React, {Component} from 'react';
//import CountUp from 'react-countup';
//import VisibilitySensor from 'react-visibility-sensor';
//import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  employeeDetailsAction
} from '../../../actions/employeesActions';


/*
const style = {
  countup: {},
};
*/
// hack webpack to use fs  
//const fs = require('fs')

class UserCard extends Component {

  constructor(props) {
  
    super(props);
    this.state = {
      isHovered : false,
      didViewCountUp: false
    };
    this.toggleHover = this.toggleHover.bind(this);
    
    let user = JSON.parse(localStorage.getItem('user'));
    
    const data = {
      employeeID: this.props.obj._id,
      admin: {
        id: user.id,
        access: user.role
      }
    };

    this.props.dispatch(employeeDetailsAction(data));
  }
  
  toggleHover(){
    this.setState(prevState => ({isHovered: !prevState.isHovered}));
  }

componentDidMount () {

	var loadScript = function(src) {
  		var tag = document.createElement('script');
  		tag.async = false;
  		tag.src = src;
  		document.body.appendChild(tag);
	}
	loadScript('/js/jquery-3.3.1.min.js')
}

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({didViewCountUp: true});
    }
  }


  render(){

    const username = this.props.obj.username === null | this.props.obj.username === '' ? '-/-' : this.props.obj.username;
    const email = this.props.obj.email === '' ? '-/-' : this.props.obj.email;
    const position = this.props.obj.position === '' ? '-/-' : this.props.obj.position;
    const jobs = this.props.obj.jobs === '' ? '-/-' : this.props.obj.jobs;

    const name = this.props.obj.name === '' ? '-/-' : this.props.obj.name;

    const photo = this.props.obj.profileimg ? '/img/'+this.props.obj.profileimg : '/img/anon.png';
	
    return (
    <div>
            <div className="container">
           		<div className="banner_inner d-flex align-items-center">
					<div className="banner_content">
						<div className="media">
							<div className="d-flex">
								<img height='240' src={photo} alt='' style={{marginRight:'30px'}}/>
							</div>
							<div className="media-body">
								<div className="personal_text" style={{margin:'20px 20px 20px 0px', textAlign:'left'}}>

									<h3>{name}</h3>


									<ul className="list basic_info">
										<li><i className="lnr lnr-phone-handset"></i> {position}</li>
										<li><i className="lnr lnr-envelope"></i> {email}</li>
										<li>{username}</li>
									</ul>
									<p>{jobs}</p>
									<Link className='link success uppercase'  to={`/employee/update/${this.props.obj._id}`}>Edit</Link>
								</div>
							</div>
						</div>
					</div>
           		</div>
            </div>
    </div>
    ); //return

  } //render
}; //class

const mapStateToProps = (state) => (state);

export default connect(
  mapStateToProps
)(UserCard)
