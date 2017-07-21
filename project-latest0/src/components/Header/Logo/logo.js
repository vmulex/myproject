import React from 'react';
import topbar from '../../../img/topbar.png'
import styles from './logo.css';

class Logo extends React.Component {
	constructor(props){
		super(props);
		this.state = null;
	}

	render() {
		return (
			<a className='logo-link'></a>
		)
	}
}

export default Logo;