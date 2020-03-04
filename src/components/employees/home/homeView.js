import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeView extends Component {
  render() {
    return (
      <tr className={(this.props.vacation.expire) ? 'expire' : ''}>
        <td>
        You are going on vacation from <b>{this.props.vacation.start}</b> to <b>{this.props.vacation.end}</b>.
        <Link to='' className='link danger btn-delete' onClick={this.props.handleDelete.bind(this, this.props.vacation._id)}>Delete</Link>
        </td>
      </tr>
    )
  }
}

export default connect()(HomeView);