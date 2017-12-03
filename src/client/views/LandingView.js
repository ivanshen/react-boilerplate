import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { isLoggedIn } from '../utils/utils'
import 'bootstrap/dist/css/bootstrap.css';
class LandingView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <form>
          <FormGroup bsSize="large">
            <FormControl type="text" placeholder="Large text" />
          </FormGroup>
          <FormGroup>
            <FormControl type="text" placeholder="Normal text" />
          </FormGroup>
          <FormGroup bsSize="small">
            <FormControl type="text" placeholder="Small text" />
          </FormGroup>
        </form>
      </div>
    )
  }
}
ReactDOM.render((<LandingView />), document.getElementById('content'));
