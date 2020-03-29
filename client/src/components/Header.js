import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

  renderLinks(){
    if (this.props.authenticated) {
      return [
      <Link to='/logout' className='sign-out' key={1}>
        <FontAwesome name='sign-out' size='2x'/>
      </Link>,
      <Link to='/spam-history' className='history' key={2}>
        <FontAwesome name='folder-open-o' size='2x'/>
      </Link>,
      <Link to='/spam-away' className='new-spam' key={3}>
        <FontAwesome name='pencil' size='2x'/>
      </Link>,
      <Link to='/faq' className='questions' key={4}>
        <FontAwesome name='question-circle-o' size='2x'/>
      </Link>
      ]
    } else {
      return (
        <Link to='/' className='back-button'>
          <FontAwesome name='arrow-left' size='2x'/>
        </Link>
      )
    }
  }

  render(){
    return (
      <div className='navigation'>
        {this.renderLinks()}
        <h1 className='header'>The <span>Spam</span>erator</h1>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
