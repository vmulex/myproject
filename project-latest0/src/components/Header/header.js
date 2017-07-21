import React from 'react';
import styles from './header.css';
import Logo from './Logo/logo.js';
import Toolbar from './Toolbar/toolbar.js';
import Search from './Search/search.js';

class Header extends React.Component { 
	constructor(props){
		super(props);
		this.state = null;
	}

	render() {
		return (
			<div className='header'>
				<div className='header-content'>
					<Logo />
					<Toolbar />
					<Search />
				</div>
			</div>
		)
	}
}

export default Header;