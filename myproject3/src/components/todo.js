import React from 'react';
// import styles from './app.css';//导入css样式文件

class Todo extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount () {
		this._getTodoList();
	}

	//获取todolist
	// _getTodoList () {
	// 	const that = this;

	// 	fetch('/getAllItems')
	// 	  .then(response => response.json())
	// 	  .then(data => {
	// 	    // Here's a list of repos!
	// 	    console.log(data)
	// 	  });
	// }

	render() {
		return (
			<div>
    			<h2>this is my study step by step</h2>
    			<h2>webpack test success</h2>
		    </div>
		)
	}
}

export default Todo;