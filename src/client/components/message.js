import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.props.className}>
				<Alert bsStyle={this.props.bsStyle} onDismiss={this.props.onDismiss}>
					{this.props.message}
		        </Alert>
	        </div>
		);
	}
}
Message.propTypes = {
	message: PropTypes.element,
	bsStyle: PropTypes.string,
	onDismiss: PropTypes.func,
	className: PropTypes.string
}
export default Message;