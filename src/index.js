import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify from 'aws-amplify'
import config from './aws-exports'
import {Auth, Hub } from 'aws-amplify'

Amplify.configure(config)

class AppWithAuth extends React.Component {
  state = {
    loggedIn: false
  }
  async componentDidMount() {
		Hub.listen('auth', (data) => {
			const { payload } = data;
			console.log(payload);
			// this.onAuthEvent(payload);           
			console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);

			if (payload.event === 'signOut') {
				this.setState({ loggedIn: false })
			} else if(payload.event === 'signIn') {
				this.setState({ loggedIn: true })
			}		
		})
    try {
      const userData = await Auth.currentAuthenticatedUser()
      console.log('userData:', userData)
      this.setState({ loggedIn:  true })
    } catch (err) {
      console.log('user not logged in')
    }
  }
  onAuthChange = e => {
    console.log('event: ', e)
  }
  render() {
    return <div>
      <App />
    </div>
  }
} 

ReactDOM.render(<AppWithAuth />, document.getElementById('root'));
serviceWorker.unregister();
