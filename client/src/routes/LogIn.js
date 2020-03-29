//Passes props to ../components/Facebook.js

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import Facebook from '../components/Facebook'
import { logInUser } from '../actions'

class LogIn extends Component {

  renderField(field) {
    const { type, placeholder, input, meta: { touched, error } } = field
    return (
      //redux form input rendering & client-side error validation
      <div>
        <input type={type} placeholder={placeholder} {...input} />
        <div className='error'>{touched ? error : ''}</div>
      </div>
    )
  }

  //on form submit, trigger logInUser() action with email and password
  handleFormSubmit({ email, password }) {
    console.log('props history', this.props.history)
    this.props.logInUser({ email, password }, this.props.history)
  }

  //if error received from server, (i.e. b/c user entered incorrect password), return server's error message
  renderAlert(){
    if(this.props.errorMessage){
      return <div className='error'>Oops! {this.props.errorMessage}</div>
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className='login'>
        {this.renderAlert()} {/* server error message */}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            placeholder="Email"
            type="email"
            name="email"
            component={this.renderField}
          />
          <Field
            placeholder="Password"
            type="password"
            name="password"
            component={this.renderField}
          />
          <button type="submit">log in</button>
        </form>
        <Facebook page='login' pathHistory={this.props.history} />
    </div>
    )
  }
}

//field validations
const validate = values => {
  const errors = {};
  const { email, password } = values
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && !regEx.test(email)) {
    errors.email = 'valid email please'
  }
  if (!email) {
    errors.email = 'ya gotta enter something'
  }
  if (!password) {
    errors.password = 'aka secret code'
  }
  return errors
}


function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

const LogInForm = reduxForm({ form: 'login', validate })(LogIn)
export default withRouter(connect (mapStateToProps, { logInUser })(LogInForm))
