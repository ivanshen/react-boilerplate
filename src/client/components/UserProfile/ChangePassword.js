import React from 'react';
import FieldGroup from '../FieldGroup';
import SubmitButton from '../SubmitButton';
import Message from '../MessageBox';
import { FormattedMessage } from 'react-intl';
import { buildRequestUrl } from '../../utils/utils';

export default class ChangePassword extends React.Component {

	constructor(props) {
		super(props);
		this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
		this.onCurrentPasswordChange = this.onCurrentPasswordChange.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			currentPassword: '',
			newPassword: '',
			showErrorMessage: false,
			showSuccessMessage: false,
		}
	}

	onCurrentPasswordChange(password) {
		this.setState({ currentPassword: password });
	}

	onNewPasswordChange(password) {
		this.setState({ newPassword: password });
	}

	submit() {
		if (this.state.currentPassword === this.state.newPassword) {
			this.setState({ showErrorMessage: true });
		} else {
			fetch(buildRequestUrl('user/password'), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					currentPassword: this.state.currentPassword,
					newPassword: this.state.newPassword
				}),
	    		mode: 'cors',
	    		credentials: 'same-origin'
			}).then(res => {
				if (res.status === 200) {
					this.setState({ showSuccessMessage: true, showErrorMessage: false });
				} else {
					this.setState({ showSuccessMessage: false, showErrorMessage: true });
				}
			})
		}
	}

	render() {
		let message;
		let text;
		if (this.state.showErrorMessage) {
			text = (<p><FormattedMessage id="saveFailedMessage"></FormattedMessage></p>);
			message = <Message message={text} bsStyle="danger" onDismiss={this.onMessageBoxDismiss} />
		} else if (this.state.showSuccessMessage) {
			text = (<p><FormattedMessage id="saveSuccessMessage"></FormattedMessage></p>);
			message = <Message message={text} bsStyle="success" onDismiss={this.onMessageBoxDismiss} />
		}
		return (
			<div className="field-group">
				{message}
				<FieldGroup
					onChange={this.onCurrentPasswordChange}
					label={<FormattedMessage id="currentPasswordLabel"></FormattedMessage>}
				/>
				<FieldGroup
					onChange={this.onNewPasswordChange}
					label={<FormattedMessage id="newPasswordLabel"></FormattedMessage>}
					showError={this.state.currentPassword.length > 0 && this.state.currentPassword === this.state.newPassword} 
					helpLabel={<FormattedMessage id="helpPasswordLabel"></FormattedMessage>}
					onlyShowHelpOnError
				/>
				<SubmitButton
					className="submit-button"
					onSubmit={this.submit}
					label={<FormattedMessage id="submitButtonLabel"></FormattedMessage>}
					loadingLabel={<FormattedMessage id="submitButtonLoadingLabel"></FormattedMessage>}
					disabled={
						this.state.currentPassword.length === 0 || 
						this.state.newPassword.length === 0 || 
						(this.state.currentPassword.length > 0 && this.state.currentPassword === this.state.newPassword)
					}
				/>
			</div>
		);
	}
}