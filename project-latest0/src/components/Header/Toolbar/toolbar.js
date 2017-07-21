import React from 'react';
import styles from './toolbar.css';

class Toolbar extends React.Component {
	constructor(props){
		super(props);
		this.state = null;
	}

	render() {
		return (
			<ul className='toolbar'>
				<li>发现音乐</li>
				<li>我的音乐</li>
				<li>朋友</li>
				<li>商城</li>
				<li>音乐人</li>
				<li>下载客户端</li>
			</ul>
		)
	}
}

export default Toolbar;