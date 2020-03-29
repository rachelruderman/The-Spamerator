import axios from 'axios'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_SPAM, SEND_SPAM } from './types'
let ROOT_URL

if(process.env.NODE_ENV === 'production'){
  ROOT_URL = '/'
} else {
  ROOT_URL = 'http://localhost:3090/'
}

export function logInUser({ email, password }, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}login`, { email, password })
    .then(response => {
      //update state to indicate user is authenticated
      dispatch({ type: AUTH_USER })
      //save JWT token
      localStorage.setItem('token', response.data.token)
      //redirect user
      history.push('/spam-away')
    })
    .catch((error)=>{
      console.log(error)
      dispatch(authError(error.response.data))
    })
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signUpUser({ alias, email, password }, history){
  return function(dispatch){
    axios.post(`${ROOT_URL}signup`, { alias, email, password })
    .then(response => {
      //update state to indicate user is authenticated
      dispatch({ type: AUTH_USER })
      //save JWT token
      localStorage.setItem('token', response.data.token)
      //redirect user
      history.push('/spam-away')
    })
    .catch(error => {
      console.log('whats the error', error)
      dispatch(authError(error.response.data.error))
    })
  }
}

export function logOutUser(){
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function fetchSpam(){
  return function(dispatch){
    axios.get(`${ROOT_URL}spam-history`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_SPAM,
        payload: response.data.spam
      })
    })
  }
}

export function sendSpam({ recipient, method, content }){
  return function(dispatch){
    axios.post(`${ROOT_URL}spam-away`, { recipient, method, content })
    .then(response => {
      dispatch({ type: SEND_SPAM })
    })
    .catch(error => {
      console.log('error', error)
      dispatch(authError(error.response.data.error))
    })
  }
}
