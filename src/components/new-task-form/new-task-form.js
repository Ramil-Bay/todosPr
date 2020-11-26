import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
	state = {
		label: '',
	};

	static propTypes = {
		addTusk: PropTypes.func.isRequired,
	};

	onAddNewTask = (evt) => {
		this.setState(() => {
			return {
				label: evt.target.value,
			};
		});
	};

	onSubmit = (evt) => {
		const { label } = this.state;
		const { addTusk } = this.props;
		evt.preventDefault();
		if (label) {
			addTusk(label);
			this.setState(() => {
				return {
					label: '',
				};
			});
		}
	};

	render() {
		const { label } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="text"
					className="new-todo"
					placeholder="What needs to be done?"
					onChange={this.onAddNewTask}
					value={label}
				/>
			</form>
		);
	}
}
