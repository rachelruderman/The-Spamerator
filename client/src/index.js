//react and redux
import React from 'react'
import reducers from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk'
//routes
import Welcome from './routes/Welcome'
import Spamerator from './routes/Spamerator'
import SpamHistory from './routes/SpamHistory'
import LogIn from './routes/LogIn'
import LogOut from './routes/LogOut'
import SignUp from './routes/SignUp'
import FAQ from './routes/FAQ'
//auth
import RequireAuth from './components/RequireAuth'
import { AUTH_USER } from './actions/types'
//navigation
import Header from './components/Header'
//style
import './styles/App.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

//check if user already logged in
const token = localStorage.getItem('token')
if(token){
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='container'> {/* entire app is wrapped in a flex container with two flex items*/}
        <Header/> {/* header is a flex item */}
          <Switch> {/* each route is a flex item */}
            {/* if user is already logged in, redirect to spam page */}
            <Route exact path='/' render={()=>(token ? (<Redirect to='/spam-away' />) : (<Welcome />) )} />
            <Route exact path='/login' render={()=>(token ? (<Redirect to='/spam-away' />) : (<LogIn />) )} />
            <Route exact path='/signup' render={()=>(token ? (<Redirect to='/spam-away' />) : (<SignUp />) )} />
            <Route exact path='/faq' component={FAQ}/>
            <Route exact path='/spam-away' component={RequireAuth(Spamerator)}/>
            <Route exact path='/spam-history' component={RequireAuth(SpamHistory)}/>
            <Route exact path='/logout' component={LogOut}/>
            {/* if user attempts to access route which doesn't match above paths, redirected to welcome page */}
            <Redirect to='/'/>
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
