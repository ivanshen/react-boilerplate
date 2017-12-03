import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { buildRequestUrl } from '../utils/utils';
import Message from '../components/message';
import NavBar from '../components/NavBar';
import { IntlProvider, FormattedMessage } from 'react-intl';
import i18n from '../i18n/i18n'
import locales from '../i18n/locales/SignupView';
import 'bootstrap/dist/css/bootstrap.css';
class SignupView extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			showUserMessage: false,
			showPassMessage: false
		};

	}

	handleInputChange(e) {
		this.setState({[e.target.id]: e.target.value});
	}

	onDismiss(e) {
		this.setState({[e.target.id]: false});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({showPassMessage: true, showUserMessage: false});
		} else {
			fetch(buildRequestUrl('signup'), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				}),
	    		mode: 'cors',
			}).then(res => {
				return res.json();
			}).then(res => {
				if (res.status === 302) {
					this.setState({showUserMessage: true, showPassMessage: false});
				} else {
					window.location.href = res.redirect;
				}

			}).catch(err => {
				alert(err);
			})
		}
	}

	render() {
		let message;
		let text;
		if (this.state.showPassMessage) {
			text = (<p><FormattedMessage id="invalidPassword" ></FormattedMessage></p>);
			message = <Message message={text} bsStyle="danger" onDismiss={this.onDismiss} />;
		} else if (this.state.showUserMessage) {
			text = (<p><FormattedMessage id="invalidUser" ></FormattedMessage></p>);
			message = <Message message={text} bsStyle="danger" onDismiss={this.onDismiss} />;
		} else {
			message = '';
			text = '';
		}
		let locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US'
		return (
			<div>
				<NavBar />
				<IntlProvider locale={locale} messages={locales[locale]}>
					<div>
					{message}
						<div className="Signup">
							<form onSubmit={this.handleSubmit}>
						        <FormGroup controlId="email" bsSize="large">
						          <ControlLabel><FormattedMessage id="email"></FormattedMessage></ControlLabel>
						          <FormControl
						            autoFocus
						            type="email"
						            value={this.state.email}
						            onChange={this.handleInputChange}
						          />
						        </FormGroup>
						        <FormGroup controlId="password" bsSize="large">
						          <ControlLabel><FormattedMessage id="password"></FormattedMessage></ControlLabel>
						          <FormControl
						            value={this.state.password}
						            onChange={this.handleInputChange}
						            type="password"
						          />
						        </FormGroup>
						        <FormGroup controlId="confirmPassword" bsSize="large">
						          <ControlLabel><FormattedMessage id="confirm"></FormattedMessage></ControlLabel>
						          <FormControl
						            value={this.state.confirmPassword}
						            onChange={this.handleInputChange}
						            type="password"
						          />
						        </FormGroup>
						        <Button
						            block
						            bsSize="large"
						            type="submit"
					          	>
					            	<FormattedMessage id="signupButton"></FormattedMessage>
					          	</Button>
					      	</form>
			      		</div>
		      		</div>
		      	</IntlProvider>
      		</div>
      	);
	}
}
ReactDOM.render((<SignupView />), document.getElementById('content'));