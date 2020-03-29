//Passes props to ../components/Facebook.js

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { signUpUser } from '../actions'
import Facebook from '../components/Facebook'

class SignUp extends Component {

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

  //on form submit, trigger signUpUser() action with alias, email and password
  handleFormSubmit({ alias, email, password }) {
    this.props.signUpUser({ alias, email, password }, this.props.history)
  }

  //if error received from server, (i.e. b/c email address already registered), return server's error message
  renderAlert(){
    if(this.props.errorMessage){
      return <div className='error'>Oops! {this.props.errorMessage}</div>
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className='signup'>
        {this.renderAlert()} {/* server error message */}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            placeholder="Alias"
            type="text"
            name="alias"
            component={this.renderField}
          />
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
          <Field
            placeholder="Reenter Password"
            type="password"
            name="verifyPassword"
            component={this.renderField}
          />
          <button type="submit">sign up</button>
        </form>
        <Facebook page='signup' pathHistory={this.props.history} />
    </div>
    )
  }
}

//field validations
const validate = values => {
  const errors = {}
  const { alias, email, password, verifyPassword } = values
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email && !regEx.test(email)) {
    errors.email = 'hmm, invalid email'
  }
  if(password !== verifyPassword){
    errors.verifyPassword = 'passwords gotta match'
  }
  if(!alias){
    errors.alias = "a spammer has no name"
  }
  if(!email){
    errors.email = "a spammer has no email"
  }
  if(!password){
    errors.password = "pick a secret code"
  }
  if(password && password.length < 6){
    errors.password = "6 characters or more"
  }
  return errors
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

const SignUpForm = reduxForm({ form: 'signup', validate })(SignUp)
export default withRouter(connect (mapStateToProps, { signUpUser })(SignUpForm))
