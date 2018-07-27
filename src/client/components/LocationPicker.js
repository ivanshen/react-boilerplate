import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel } from 'react-bootstrap';

export default class LocationPicker extends React.Component {

	constructor(props) {
		super(props);
		this.state = { countryList: [], loading: true,  };
		fetch('https://restcountries.eu/rest/v2/all', {
			method: 'GET'
		}).then(res => {
			return res.json();
		}).then(countries => {
			this.setState({ countryList: countries, loading: false });
		})
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
        this.props.onChange(e.target.value);
    }

	render() {
		const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US'
		const сountriesNodes = this.state.countryList.map((country) => {
        	const countryName = country.translations[locale] ? country.translations[locale] : country.name;
            return (
                <option value={country.alpha3Code} key={country.alpha3Code}>{countryName}</option>
            );
    	});
		return (
			<div>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl 
					componentClass="select"
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					disabled={this.state.loading}
					value={this.props.value}
				>
		        	{сountriesNodes}
		      	</FormControl>
	      	</div>
		)
	}
}
LocationPicker.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	value: PropTypes.string,
};