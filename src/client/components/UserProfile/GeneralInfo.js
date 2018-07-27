import React from 'react';
import FieldGroup from '../FieldGroup';
import LocationPicker from '../LocationPicker';
import SubmitButton from '../SubmitButton';
import Message from '../MessageBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import { buildRequestUrl, isValidateEmail } from '../../utils/utils';

export default class GeneralInfo extends React.Component {

	constructor(props) {
		super(props);
		this.onSaveData = this.onSaveData.bind(this);
		this.onEmailInputChange = this.onEmailInputChange.bind(this);
		this.onNameInputChange = this.onNameInputChange.bind(this);
		this.onLocationPickerChange = this.onLocationPickerChange.bind(this);
		this.onMessageBoxDismiss = this.onMessageBoxDismiss.bind(this);
		this.state = {
			email: '',
			name: '',
			country: null,
			showSavedMessage: false,
			showFailedMessage: false,
			loading: true,
		}
	}

	componentDidMount() {
		let status;
		fetch(buildRequestUrl('user/information'), {
			method: 'GET',
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(res => {
			status = res.status;
			return res.json();
		}).then(res => {
			if (status === 200) {
				this.setState({
					showFailedMessage: false,
					email: res.email,
					name: res.name,
					country: res.country,
					loading: false,
				});
			} else {
				this.setState({ showSavedMessage: false, showFailedMessage: true, loading: false, });
			}
		})
	}

	onEmailInputChange(email) {
		this.setState({ email });
	}

	onNameInputChange(name) {
		this.setState({ name });
	}

	onLocationPickerChange(country) {
		this.setState({ country });
	}

	onMessageBoxDismiss() {
		this.setState({ showSavedMessage: false, showFailedMessage: false });
	}

	onSaveData(e) {
		fetch(buildRequestUrl('user/save'), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				name: this.state.name,
				country: this.state.country,
			}),
			mode: 'cors',
    		credentials: 'same-origin'
		}).then(res => {
			if (res.status === 200) {
				this.setState({ showSavedMessage: true, showFailedMessage: false })
			} else {
				this.setState({ showFailedMessage: true, showSavedMessage: false })
			}
		});
	}

	render() {
		let message;
		let text;
		if (this.state.showFailedMessage) {
			text = (<p><FormattedMessage id="saveFailedMessage"></FormattedMessage></p>);
			message = <Message message={text} bsStyle="danger" onDismiss={this.onMessageBoxDismiss} />
		} else if (this.state.showSavedMessage) {
			text = (<p><FormattedMessage id="saveSuccessMessage"></FormattedMessage></p>);
			message = <Message message={text} bsStyle="success" onDismiss={this.onMessageBoxDismiss} />
		}
		return (
			<div>
				{
					this.state.loading ? 
					<div className="loading-circle"><CircularProgress /></div>
					:
					<div>
						<div className="field-group">
							{message}
							<FieldGroup
								value={this.state.email}
								showError={!isValidateEmail(this.state.email)}
								onChange={this.onEmailInputChange}
								label={<FormattedMessage id="emailLabel"></FormattedMessage>}
								helpLabel={<FormattedMessage id="helpEmailLabel"></FormattedMessage>}
								onlyShowHelpOnError
							/>
							<FieldGroup
								value={this.state.name}
								showError={this.state.name.length === 0}
								onChange={this.onNameInputChange}
								label={<FormattedMessage id="name"></FormattedMessage>}
								helpLabel={<FormattedMessage id="helpNameLabel"></FormattedMessage>}
								onlyShowHelpOnError
							/>
							<LocationPicker
								value={this.state.country}
								label="Country"
								onChange={this.onLocationPickerChange}
								placeholder="Choose a country"
							/>
						</div>
						<SubmitButton
							className="submit-button"
							onSubmit={this.onSaveData}
							label={<FormattedMessage id="submitButtonLabel"></FormattedMessage>}
							loadingLabel={<FormattedMessage id="submitButtonLoadingLabel"></FormattedMessage>}
							disabled={!isValidateEmail(this.state.email) || this.state.name.length === 0}
						/>
					</div>
				}
			</div>
		);
	}
}