import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { IntlProvider, FormattedMessage } from 'react-intl';
import locales from '../i18n/locales/CatalogView';
import { buildRequestUrl } from '../utils/utils';

class CatalogView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			items: [],
		}
	}

	componentDidMount() {
		fetch(buildRequestUrl('catalog/list'), {
			method: "GET", 
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(res => {
			if (res.status === 200) {
				return res.json();
			}
		}).then(res => {
			console.log(res);
			this.setState({ items: res, loading: false });
		})
	}

	render() {
		const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
		return (
			<IntlProvider locale={locale} messages={locales[locale]}>
				<div>
					<NavBar />
					{
						!this.state.loading && this.state.items.map(item => (
							<Card
								className="card"
								title={item.productName}
								description={item.description}
								price={`$${item.price}`}
							/>
						))
					}
				</div>
			</IntlProvider>
		)
	}
}

ReactDOM.render((<CatalogView />), document.getElementById('content'));