import React from 'react';
import { FormControl, Button, Form, FormGroup, Col, ControlLabel, Checkbox }  from 'react-bootstrap';
import NavBar from '../components/NavBar';
import ReactDOM from 'react-dom';
import { buildRequestUrl } from '../utils/utils';
import Message from '../components/message';
import 'bootstrap/dist/css/bootstrap.css';
class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.postCredentials = this.postCredentials.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getErrorMessage = this.getErrorMessage.bind(this);
		this.handleDismiss = this.handleDismiss.bind(this);
		this.state = {
		    email: '',
		    password: '',
		    showErrorMessage: false
  		};
	}

	postCredentials(e) {
		e.preventDefault();
		fetch(buildRequestUrl('login'), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.email,
				password: this.state.password
			}),
    		mode: 'cors',
    		credentials: 'same-origin'
		}).then(res => {
			return res.json(); 
		}).then(res => {
			if (res.status === 401) {
				this.setState({showErrorMessage: true})
			} else if (res.status === 200) {
				window.location.href = res.redirect;
			}
		}).catch(err => { console.log(err);});
	}

	handleInputChange(e) {
		this.setState({[e.target.id]: e.target.value});
	}

	handleDismiss(event) {
		this.setState({showErrorMessage: false});
	}

	getErrorMessage() {
		return (
			<p>Invalid username or password.</p>
			);
	}

	render() {
		let message;
		let messageDetails = this.getErrorMessage();
		if (this.state.showErrorMessage) {
			message = <Message bsStyle={"danger"} onDismiss={this.handleDismiss} message={messageDetails} className="login-error"/>;
		} else {
			message = '';
		}
		return (
			<div>
				<NavBar />
				{message}
				<div className="Login">
        			<form onSubmit={this.postCredentials}>
          				<FormGroup controlId="email" bsSize="large">
            				<ControlLabel>Email</ControlLabel>
				            <FormControl
				              autoFocus
				              type="email"
				              value={this.state.email}
				              onChange={this.handleInputChange}
				            />
          				</FormGroup>
			        	<FormGroup controlId="password" bsSize="large">
			            	<ControlLabel>Password</ControlLabel>
				            <FormControl
				              value={this.state.password}
				              onChange={this.handleInputChange}
				              type="password"
				            />
			          	</FormGroup>
			         	<Button
				            block
				            bsSize="large"
				            type="submit"
			          	>
			            	Login
			          	</Button>
        			</form>
      			</div>
			</div>
		);
	}
}
ReactDOM.render((<LoginView />), document.getElementById('content'));