import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Row } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import LeftNav from '../components/LeftNav';
import GeneralInfoView from '../components/UserProfile/GeneralInfo';
import ChangePasswordView from '../components/UserProfile/ChangePassword';
import { IntlProvider, FormattedMessage } from 'react-intl';
import i18n from '../i18n/i18n';
import locales from '../i18n/locales/UserProfile';
import 'bootstrap/dist/css/bootstrap.css';

class UserProfile extends React.Component {

	constructor(props) {
		super(props);
		this.onViewChange = this.onViewChange.bind(this);
		this.leftNavOptions = [<FormattedMessage id="generalSettingsLabel"></FormattedMessage>, <FormattedMessage id="changePwdLabel"></FormattedMessage>];
		this.state = {
			view: 0
		}
	}

	onViewChange(index) {
		this.setState({ view: index });
	}

	render() {
		const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US'
		let view;
		switch(this.state.view) {
		    case 0:
		        view = <GeneralInfoView />
		        break;
		    case 1:
		        view = <ChangePasswordView />
		        break;
		    default:
		        view = <GeneralInfoView />
		        break;
		}
		return (
			<div>
				<NavBar />
				<IntlProvider locale={locale} messages={locales[locale]}>
					<div>
						<Row bsClass="content">
							<Col xs={4}>
						        <div className="left-nav">
									<LeftNav
										items={this.leftNavOptions}
										onSelect={this.onViewChange}
									/>
								</div>
						    </Col>
						    <Col xs={6}>
								{view}
						    </Col>
						</Row>
					</div>
				</IntlProvider>
		    </div>
		);
	}
}

ReactDOM.render((<UserProfile />), document.getElementById('content'));