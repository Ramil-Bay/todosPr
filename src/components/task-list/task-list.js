import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './task-list.css';

const TaskList = ({ todos, changeOfState, onDeleted, editLabel, onEdit }) => {
	const elements = todos.map((elem) => {
		const { state, id, label } = elem;

		let value = label;

		const labelValue = (event) => {
			value = event.target.value;
		};

		const onSubmit = (event) => {
			event.preventDefault();
			editLabel(value, event.target.id);
		};

		return (
			<li key={id} className={state}>
				<Task
					{...elem}
					changeOfState={() => changeOfState(id)}
					onDeleted={() => onDeleted(id)}
					onEdit={() => onEdit(id)}
				/>
				<form onSubmit={onSubmit} id={id}>
					<input
						type="text"
						className="edit"
						defaultValue={label}
						onChange={labelValue}
					/>
				</form>
			</li>
		);
	});
	return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
	todos: [{ label: 'Complited tusk', state: 'active', id: 1, checked: false }],
};

TaskList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	changeOfState: PropTypes.func.isRequired,
	onDeleted: PropTypes.func.isRequired,
	editLabel: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default TaskList;
