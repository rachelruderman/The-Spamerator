//Receives props from /routes/LogIn.js and /routes/SignUp.js

import React, { Component } from 'react'
import { FacebookLogin } from 'react-facebook-login-component'
import { logInUser, signUpUser } from '../actions'
import { connect } from 'react-redux'

class Facebook extends Component {

  constructor (props, context) {
    super(props, context)
  }

  responseFacebook (response) {
    let email = response.email
    let password = response.id
    let alias = response.name

    if(this.props.page === 'login'){
      this.props.logInUser({ email, password }, this.props.pathHistory)
      // window.location.reload()
    }
    if(this.props.page === 'signup'){
      this.props.signUpUser({ alias, email, password }, this.props.pathHistory)
      // window.location.reload()
    }
  }

  render () {
    let buttonText
    if(this.props.page === 'login'){
      buttonText = 'or log in with facebook'
    } else if (this.props.page === 'signup'){
      buttonText = 'or sign up with facebook'
    }
    return (
      <div className='facebook'>
        <FacebookLogin socialId="1801827123440761"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook.bind(this)}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText={buttonText}/>
      </div>
    )
  }
}

export default connect(null, { logInUser, signUpUser })(Facebook)
