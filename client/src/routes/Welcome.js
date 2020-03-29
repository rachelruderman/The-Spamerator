import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome'

export default class Welcome extends Component {
  render(){
    return (
      <div className='welcome'>
        <div className='buttons'> {/* this is a flex container, each link is a flex item */}
          <Link to='/login'>log in</Link>
          <Link to='/signup'>sign up</Link>
          <Link to='/faq'> <FontAwesome name='question-circle-o' size='lg' /> </Link>
        </div>
        <div className='back-button-coverup'></div> {/* hacky solution to remove back button */}
      </div>
    );
  }
}
