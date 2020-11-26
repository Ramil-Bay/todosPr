import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task.css';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
	state = {
		timer: formatDistanceToNow(new Date(), { addSuffix: true }),
		time: Date.now(),
	};

	static defaultProps = {
		checked: false,
		label: 'drink coffe',
		state: 'active',
	};

	static propTypes = {
		onEdit: PropTypes.func.isRequired,
		changeOfState: PropTypes.func.isRequired,
		onDeleted: PropTypes.func.isRequired,
		checked: PropTypes.bool,
		label: PropTypes.string,
		state: PropTypes.string,
	};

	timerID = () => {
		setInterval(() => {
			this.setState(({ time }) => {
				return {
					timer: formatDistanceToNow(new Date(time), { addSuffix: true }),
				};
			});
		}, 5000);
	};

	render() {
		const { timer } = this.state;
		const {
			changeOfState,
			checked,
			label,
			onDeleted,
			onEdit,
			state,
		} = this.props;
		return (
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					onChange={changeOfState}
					checked={checked}
				/>
				<label>
					<span className="description">{label}</span>
					<span className="created">
						created {timer} {this.timerID()}
					</span>
				</label>
				<button
					type="button"
					className={state === 'completed' ? 'hidden' : 'icon icon-edit'}
					aria-label="Edit"
					onClick={onEdit}
				/>
				<button
					type="button"
					className="icon icon-destroy"
					aria-label="Destroy"
					onClick={onDeleted}
				/>
			</div>
		);
	}
}
