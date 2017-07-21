import React from 'react';
import styles from './search.css';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = null;
	}

	render() {
		return (
			<div className='search'>
				<input type='text' placeholder='搜索金曲'/>
			</div>	
		)
	}
}

export default Search;