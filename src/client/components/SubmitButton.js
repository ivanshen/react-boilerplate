import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class SubmitButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loading: false
    };
  }

  handleClick() {
    this.setState({ loading: true }, () => {
      this.props.onSubmit();
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <Button
          bsStyle="primary"
          disabled={this.state.loading || this.props.disabled}
          onClick={!this.state.loading ? this.handleClick : null}
        >
          { this.state.loading ? this.props.loadingLabel : this.props.label }
        </Button>
      </div>
    );
  }
}

SubmitButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  loadingLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};