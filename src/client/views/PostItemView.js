import React from 'react';
import ReactDOM from 'react-dom';
import FieldGroup from '../components/FieldGroup';
import TextField from '@material-ui/core/TextField';
import { IntlProvider, FormattedMessage } from 'react-intl';
import NavBar from '../components/NavBar';
import { buildRequestUrl } from '../utils/utils';
import locales from '../i18n/locales/PostItemView';
import PriceInput from '../components/PriceInput';
import SubmitButton from '../components/SubmitButton';
class PostItemView extends React.Component {

	constructor(props) {
		super(props);
		this.onNameInputChange = this.onNameInputChange.bind(this);
		this.onDescriptionInputChange = this.onDescriptionInputChange.bind(this);
		this.onPriceInputChange = this.onPriceInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			name: '',
			description: '',
			price: 0,
			showSuccessMessage: false,
			showFailedMessage: false,
			loading: false,
		}
	}

	onNameInputChange(name) {
		this.setState({ name });
	}

	onDescriptionInputChange(description) {
		this.setState({ description });
	}

	onPriceInputChange(price) {
		this.setState({ price });
	}

	onSubmit() {
		this.setState({ loading: true, }, () => {
			fetch(buildRequestUrl('catalog/postitem'), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: this.state.name,
					description: this.state.description,
					price: this.state.price,
				}),
	    		mode: 'cors',
	    		credentials: 'same-origin'
			}).then((res) => {
				if (res.status === 200) {
					this.setState({ showSuccessMessage: true, loading: false, });
				} else {
					this.setState({ showFailedMessage: true, loading: false, });
				}
			})
		})
	}

	render() {
		const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
		return (
			<IntlProvider locale={locale} messages={locales[locale]}>
				<div>
					<NavBar />
					<div className="field-group">
						<FieldGroup
							value={this.state.name}
							showError={this.state.name.length === 0}
							onChange={this.onNameInputChange}
							label={<FormattedMessage id="itemName"></FormattedMessage>}
							helpLabel={<FormattedMessage id="helpItemName"></FormattedMessage>}
							onlyShowHelpOnError
						/>
						<FieldGroup
							value={this.state.description}
							showError={this.state.description.length === 0}
							onChange={this.onDescriptionInputChange}
							label={<FormattedMessage id="itemDesc"></FormattedMessage>}
							helpLabel={<FormattedMessage id="helpDescLabel"></FormattedMessage>}
							onlyShowHelpOnError
						/>
						<PriceInput onChange={this.onPriceInputChange} />
					</div>
					<SubmitButton
						className="submit-button"
						onSubmit={this.onSubmit}
						label={<FormattedMessage id="submitButtonLabel"></FormattedMessage>}
						loadingLabel={<FormattedMessage id="submitButtonLoadingLabel"></FormattedMessage>}
						disabled={this.state.loading || this.state.name.length === 0 || this.state.description.length === 0}
					/>
				</div>
			</IntlProvider>
		);
	}
}
ReactDOM.render((<PostItemView />), document.getElementById('content'));