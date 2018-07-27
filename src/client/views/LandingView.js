import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../components/NavBar';
import { IntlProvider, FormattedMessage } from 'react-intl';
import SearchBar from '../components/Landing/SearchBar';
import locales from '../i18n/locales/LandingView';

import 'bootstrap/dist/css/bootstrap.css';
class LandingView extends React.Component {
  onSearch() {

  }
  render() {
    const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
    return (
      <IntlProvider locale={locale} messages={locales[locale]}>
        <div>
          <NavBar />
          <div className="search-header">
            <FormattedMessage id="searchHeaderText"></FormattedMessage>
          </div>
          <div className="search-content">
            <SearchBar fullWidth/>
          </div>
        </div>
      </IntlProvider>
    )
  }
}
ReactDOM.render((<LandingView />), document.getElementById('content'));
