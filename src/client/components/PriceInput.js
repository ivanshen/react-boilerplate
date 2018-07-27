import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
export default class PriceInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		this.props.onChange(e.target.value);
	}
	render() {
		return (
			<InputGroup>
		      <InputGroup.Addon>$</InputGroup.Addon>
		      <FormControl type="text" onChange={this.onChange}/>
		      <InputGroup.Addon>.00</InputGroup.Addon>
		    </InputGroup>
		)
	}
}