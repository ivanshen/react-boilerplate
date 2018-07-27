import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { getURLParameter } from '../utils/utils';

class LeftNav extends React.Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      activeKey: 0
    };
  }

  onSelect(index) {
    this.setState({ activeKey: index });
    this.props.onSelect(index);
  }

  render() {
    return (
      <Nav bsStyle="pills" stacked activeKey={this.state.activeKey} onSelect={this.onSelect}>
        {
          this.props.items.map((content, index) => 
            <NavItem eventKey={index} key={index}>
              { content }
            </NavItem>
          )
        }
      </Nav>
    );
  }

}

export default LeftNav;