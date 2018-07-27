import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { FormGroup, FormControl } from 'react-bootstrap';
import Input from '@material-ui/core/Input';

const SearchBar = ({ intl, className }) => {
  return(
		<Input
        	placeholder={intl.formatMessage({id: 'searchBarText'})}
        	style={{'fontSize': '2em', 'width': '20em'}}
     	/>
  );
}

export default injectIntl(SearchBar);
