import React from 'react';
import styles from './nav.less'

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = null;
	}

	render() {
		return (
			<div className='nav'>
				<h1>这是react demo</h1>
			</div>
		)
	}
}

export default Header;