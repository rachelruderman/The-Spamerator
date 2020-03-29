import React, {Component} from 'react';
import { connect } from 'react-redux'
import Moment from 'react-moment'
import * as actions from '../actions'

class SpamHistory extends Component {

  //fetch data before component mounts; fetchSpam() comes from actions
  componentWillMount(){
    this.props.fetchSpam()
  }

  render(){
    //map through 2-D array of fetched data to extract individual spam
    let indivSpam = this.props.spamlog.map(spam => {
      return spam.map(oldSpam => {
        return (
          <div className='indivSpam'> {/* each individual spam is a flex item */}
            <div>"{oldSpam.content}"</div>
            <hr/>
            <div>Received by {oldSpam.recipient}</div>
            <div><Moment format="dddd MMMM Do, YYYY">{oldSpam.date}</Moment></div>
          </div>
        )
      })
    })

    return (
      <div className='spam-history'>
        <div className='tagline'>a history of spam</div>
        <div className='spam-index'>{indivSpam}</div> {/* this is a flex container */}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { spamlog: state.spam }
}

export default connect(mapStateToProps, actions)(SpamHistory)
