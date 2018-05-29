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
			user: null,
			loading: true,
		}
		this.signedInContent = this.signedInContent.bind(this);
		this.signedOutContent = this.signedOutContent.bind(this);
	}

	componentDidMount() {
		fetch(buildRequestUrl('isAuthenticated'), { 
			method: "GET", 
			headers: { "Content-Type": "application/json" },
			credentials: "include"
		}).then(res => {
			if (res.status === 200) {
				this.setState({ user: res.body, loading: false })
			} else {
				this.setState({ user: null, loading: false })
			}
			
		}).catch(err => {
			this.setState({ user: null, loading: false });
		})
	}

	signedInContent() {
		return (
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
      	)
	}

	signedOutContent() {
		return (
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
	  	)
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
								!this.state.loading && 
								(this.state.user ? this.signedInContent() : this.signedOutContent())
					      	}
			    		</Navbar.Collapse>
			  		</Navbar>
			  	</div>
			</IntlProvider>
		);
	}
}

export default NavBar;