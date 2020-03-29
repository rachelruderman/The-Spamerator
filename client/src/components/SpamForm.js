//SpamForm component receives props from Spamerator route

import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { sendSpam } from '../actions'

class SpamForm extends Component {
  //internal state to render success message upon form submission
  constructor(props){
    super(props)
    this.state = {success: false}
  }

  //redux form input/textarea rendering & client-side error validation
  renderInput(field) {
    const { type, placeholder, input, meta: { touched, error } } = field
    return (
      <div>
        <input type={type} placeholder={placeholder} {...input} />
        <div className='error'>{touched ? error : ''}</div>
      </div>
    )
  }

  renderTextArea(field) {
    const { type, placeholder, input, meta: { touched, error } } = field
    return (
      <div>
        <textarea type={type} placeholder={placeholder} rows='2' {...input} />
        <div className='error'>{touched ? error : ''}</div>
      </div>
    )
  }

  //on form submit, trigger sendSpam() action, clear fields and set state to success
  handleFormSubmit({ recipient, method, content }) {
    this.props.sendSpam({ recipient, method, content })
    this.props.reset()
    this.setState({success: true})
  }

  //if error received from server, return server's error message
  renderAlert(){
    if(this.props.errorMessage){
      return <div>Oops! {this.props.errorMessage}</div>
    }
  }

  //if form successfully submitted, return success message
  renderSuccess(){
    if(this.state.success){
      return <div className='success'><br/>your spam is on its way! send another?</div>
    }
  }

  render() {
    const { handleSubmit } = this.props

    let placeholder
    let submitMessage
    let type

    //change placeholder, submitMessage, type according to sms/email method
    if(this.props.method === 'sms'){
      placeholder = 'Phone Number'
      submitMessage = 'fire away...'
      type = 'text'
    } else {
      placeholder = 'Email Address'
      submitMessage = 'here goes nothing...'
      type = 'email'
    }

    return (
      <div className='signup'>

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            placeholder="Recipient Name"
            type="text"
            name="recipient"
            component={this.renderInput}
          />
          <Field
            placeholder={placeholder}
            type={type}
            name="method"
            component={this.renderInput}
          />
          <Field
            placeholder="Message"
            type="text"
            name="content"
            component={this.renderTextArea}
          />

          {this.renderAlert()} {/* server error message */}
          <button type="submit">{submitMessage}</button>
          {this.renderSuccess()} {/* success message */}
        </form>
    </div>
    )
  }
}

//field validations
const validate = values => {
  const errors = {}
  const { recipient, method, content } = values
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const numberCheck = /\d+/g

  if  (method && method.includes('@') && !regEx.test(method)) { errors.method = 'hmm, invalid email' }

  if  (method && numberCheck.test(method) //if method contains a number
              && !method.includes('@')    //and does not contain @
              && method.length !== 10 )   //and does not have a length of 10
                   { errors.method = '10 digits - no spaces - no dashes' }

  if  (!recipient) { errors.recipient = "Choose a name, any name" }
  if  (!method)    { errors.method    = "Where to?" }
  if  (!content)   { errors.content   = "Silence is not an option" }
    return errors
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

const SpamFormSetup = reduxForm({ form: 'spamForm', validate })(SpamForm)
export default connect (mapStateToProps, { sendSpam })(SpamFormSetup)
