import React, { Component } from 'react';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
	state = {
		todoData: [
			{ label: 'Complited tusk', state: 'active', id: 1, checked: false },
			{ label: 'Editing tusk', state: 'active', id: 2, checked: false },
			{ label: 'Active tusk', state: 'active', id: 3, checked: false },
		],

		show: 'all',
	};

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const newTodoData = todoData.filter((elem) => elem.state === 'active');

			return {
				todoData: newTodoData,
			};
		});
	};

	filterBy = (data, value) => {
		if (value === 'all') return data;
		const newArr = data.filter((elem) => elem.state === value);

		return newArr;
	};

	filterAll = () => {
		this.setState(() => {
			return {
				show: 'all',
			};
		});
	};

	filterCompleted = () => {
		this.setState(() => {
			return {
				show: 'completed',
			};
		});
	};

	filterActive = () => {
		this.setState(() => {
			return {
				show: 'active',
			};
		});
	};

	addTusk = (text) => {
		this.setState(({ todoData }) => {
			const newTusk = {
				label: text,
				state: 'active',
				id: todoData.length + 1,
				checked: false,
			};

			return {
				todoData: [...todoData, newTusk],
			};
		});
	};

	changeOfState = (id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex((elem) => elem.id === id);

			const element = todoData[ind];

			if (element.state === 'completed') {
				element.state = 'active';
				element.checked = false;
			} else {
				element.state = 'completed';
				element.checked = true;
			}

			const newState = [
				...todoData.slice(0, ind),
				element,
				...todoData.slice(ind + 1),
			];

			return {
				todoData: newState,
			};
		});
	};

	onDeleted = (id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex((elem) => elem.id === id);

			const newState = [...todoData.slice(0, ind), ...todoData.slice(ind + 1)];

			return {
				todoData: newState,
			};
		});
	};

	editLabel = (value, id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex((elem) => elem.id === Number(id));

			const element = todoData[ind];

			element.label = value;
			element.state = 'active';

			const newState = [
				...todoData.slice(0, ind),
				element,
				...todoData.slice(ind + 1),
			];

			return {
				todoData: newState,
			};
		});
	};

	onEdit = (id) => {
		this.setState(({ todoData }) => {
			const ind = todoData.findIndex((elem) => elem.id === id);

			const element = todoData[ind];

			element.state = 'editing';

			const newState = [
				...todoData.slice(0, ind),
				element,
				...todoData.slice(ind + 1),
			];

			return {
				todoData: newState,
			};
		});
	};

	render() {
		const { show, todoData } = this.state;
		return (
			<section className="todoapp">
				<header className="header">
					<AppHeader />
					<NewTaskForm addTusk={this.addTusk} />
				</header>
				<section className="main">
					<TaskList
						todos={this.filterBy(todoData, show)}
						changeOfState={this.changeOfState}
						onDeleted={this.onDeleted}
						editLabel={this.editLabel}
						onEdit={this.onEdit}
					/>
				</section>
				<Footer
					todos={todoData}
					filterAll={this.filterAll}
					filterCompleted={this.filterCompleted}
					filterActive={this.filterActive}
					clearCompleted={this.clearCompleted}
					show={show}
				/>
			</section>
		);
	}
}
