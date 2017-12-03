import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {  Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { buildRequestUrl } from '../utils/utils';
import { IntlProvider, FormattedMessage } from 'react-intl';
import locales from '../i18n/locales/NavBar';
class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		}
	}

	componentDidMount() {
		fetch(buildRequestUrl('validate'), { 
			method: "GET", 
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(res => {
			return res.json();
		}).then(res => {
			this.setState({user: res.user});
		}).catch(err => {
			this.setState({user: null});
		})
	}

	render() {
		let locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US'
		return (
			<IntlProvider locale={locale} messages={locales[locale]}>
				<div>
					<Navbar inverse>
			    		<Navbar.Header>
			      			<Navbar.Brand>
			        			<a href="/">React Boilerplate</a>
			      			</Navbar.Brand>
			      			<Navbar.Toggle />
			    		</Navbar.Header>
			    		<Navbar.Collapse>
							{
								this.state.user ?
								<div>
									<Nav>
								        <NavItem href="#"><FormattedMessage id="catalog"></FormattedMessage></NavItem>
								        <NavItem href="#"><FormattedMessage id="post"></FormattedMessage></NavItem>
							      	</Nav>
							      	<Nav pullRight>
							        	<NavDropdown title={<FormattedMessage id="yourAccount"></FormattedMessage>} id="basic-nav-dropdown">
							          		<MenuItem><FormattedMessage id="rentedItems"></FormattedMessage></MenuItem>
							          		<MenuItem><FormattedMessage id="rentedOutItems"></FormattedMessage></MenuItem>
									        <MenuItem divider />
									        <MenuItem ><FormattedMessage id="address"></FormattedMessage></MenuItem>
									        <MenuItem ><FormattedMessage id="billing"></FormattedMessage></MenuItem>
							        	</NavDropdown>
							        	<NavItem href="logout"><FormattedMessage id="logout"></FormattedMessage></NavItem>
							      	</Nav>
						      	</div>
						      	:
						      	<div>
							      	<Nav>
								        <NavItem href="#"><FormattedMessage id="catalog"></FormattedMessage></NavItem>
								        <NavItem href="#"><FormattedMessage id="about"></FormattedMessage></NavItem>
							      	</Nav>
							      	<Nav pullRight>
							        	<NavItem href="login"><FormattedMessage id="login"></FormattedMessage></NavItem>
							      		<NavItem href="signup"><FormattedMessage id="signup"></FormattedMessage></NavItem>
							      	</Nav>
						      	</div>
					      	}
			    		</Navbar.Collapse>
			  		</Navbar>
			  	</div>
			</IntlProvider>
		);
	}
}

export default NavBar;