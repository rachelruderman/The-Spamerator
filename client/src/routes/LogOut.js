import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOutUser } from '../actions'

class LogOut extends Component {
  //before component mounts, trigger logOutUser() action to clear user's auth token
  componentWillMount(){ this.props.logOutUser() }

  render(){
    return (
      <div>
        {/* friendly adios */}
        <div className='tagline'>adios</div>
        {/* hacky solution to remove back button */}
        <div className='back-button-coverup'></div>
      </div>) 
  }
}

export default connect(null, { logOutUser })(LogOut)
