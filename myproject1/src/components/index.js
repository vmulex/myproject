import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TodoList from './todo-list';

//在组件 DidMounted 时通过 ajax 请求所有的数据与 state 绑定实现首次渲染;
//将数据，相应的方法分发给个子组件
//实现添加、删除方法并传递给子组件。添加笔记的方法被触发的时候，发送ajax请求实现数据库数据的更新，再更新组件的state使之数据与后台数据保持一致，state一更新视图也会被重新渲染实现无刷新更新
class Todo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false
		}
	}

	componentDidMount () {
		this._getTodoList();
	}

	//获取todolist
	_getTodoList () {
		const that = this;
		$.ajax({
			url: '/getAllItems',
			type: 'get',
			dataType: 'json',
			success: data => {
				const todoList = that.todoSort(data);
				that.setState({
					todoList
				})

			},
			error: err => {
				console.log(err);
			}
		})
	}

	//添加todo
	_onNewItem (newItem) {
		const that = this;
		$.ajax({
			url: '/addItem',
			type: 'post',
			dataType: 'json',
			success: data => {
				this._getTodoList();
			},
			error: err => {
				console.log(err);
			}

		})
	}

	//删除 todo
	_onDeleteItem (date) {
		const that = this;
		const postData = {
			date: date
		};
		$.ajax({
			url: '/deleteItem',
			type: 'post',
			dataType: 'json',
			data: postData,
			success: data => {
				const todoList = that.todoSort(data);
				that.setState({
					todoList
				})

			},
			error: err => {
				console.log(err);
			}

		})
	}

	//对 todolist 进行逆向排序（使新录入的项目显示在列表上面
	todoSort (todoList) {
		todoList.reverse();
		return todoList;
	}

	//提交表单操作
	handleSubmit (event) {
		event.preventDefault();
		//表单输入为空验证
		//react中refs删除了，需要换成其他的特性
		if (this.refs.content.value == '') {
			this.refs.content.focus();
			this.setState({
				showTooltip: true
			});
			return 
		}

		//生成参数
		var newItem = {
			content: this.refs.content.value,
			date: (new Date().getMonth() + 1) + '/'
			     + new Date().getDate() + " "
			     + new Date().getHours() + ":"
			     + new Date().getMinutes() + ":"
			     + new Date().getSeconds()
		};

		//添加todo
		this._onNewItem(newItem);

		//重置表单
		this.refs.todoForm.reset();

		// 隐藏提示信息
		this.setState({
			showTooltip: false
		})
	}

	render () {
		return (
			<div className="container">
			  <h2 className="header">Todo List</h2>
			  <form className="todoForm" ref="todoForm" onSubmit={ this.handleSubmit.bind(this) }>
			  <input ref="content" type="text" placeholder="Type content here..." className="todoContent" />
			  { this.state.showTooltip &&
                         <span className="tooltip">Content is required !</span>
                    }
              </form>
              <TodoList todoList={this.state.todoList} onDeleteItem={this._onDeleteItem.bind(this)} />
            </div>

		)
	}


}

export default Todo;