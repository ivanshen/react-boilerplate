import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class FieldGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.isValidateState = this.isValidateState.bind(this);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
    this.setState({ value: e.target.value });
  }

  isValidateState() {
    return this.props.showError === false || this.props.showError === undefined ? null : 'error';
  }

  render() {
    let helpBlock;
    if (this.props.helpLabel) {
      if (this.props.onlyShowHelpOnError) {
        if (this.props.showError) {
          helpBlock = <HelpBlock>{this.props.helpLabel}</HelpBlock>
        }
      } else {
        helpBlock = <HelpBlock>{this.props.helpLabel}</HelpBlock>
      }
    }
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.isValidateState()}
        >
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {helpBlock}
        </FormGroup>
      </form>
    );
  }
}
FieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  showError: PropTypes.bool,
  onlyShowHelpOnError: PropTypes.bool,
  value: PropTypes.string,
  helpLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};