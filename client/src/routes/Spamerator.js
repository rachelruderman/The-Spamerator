//Spamerator route passes props to SpamForm component

import React, {Component} from 'react'
import SpamForm from '../components/SpamForm'
import FontAwesome from 'react-fontawesome'

export default class Spamerator extends Component {
  constructor(props){
    super(props)
    this.state = {method: null}
  }

  //when user clicks on email/sms, state updated accordingly and later passed as props to SpamForm
  handleClick(value){
    this.setState({method: value})
  }

  render(){
    let email = 'email'
    let sms = 'sms'

    return (
      <div className='spamerator'> {/* flex container */}
        <div className='spam-options'> {/* flex item and flex container with three flex items*/}
          <div className='phone' value={sms} onClick={()=> this.handleClick(sms)}> {/* flex item */}
            <FontAwesome name='phone' size='5x' />
          </div>
          <div className='tagline'>choose your poison</div> {/* flex item */}
          <div className='email' value={email} onClick={()=> this.handleClick(email)}> {/* flex item */}
            <FontAwesome name='envelope-o' size='5x' />
          </div>
        </div>
        {/*if state is not null (i.e. user has clicked on an icon, thereby updating state) render SpamForm with 'method' prop */}
        {this.state.method && <SpamForm method={this.state.method}/>}
      </div>
    )
  }
}
