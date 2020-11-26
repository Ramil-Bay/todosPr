import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';

import './footer.css';

const Footer = ({
	todos,
	filterAll,
	filterActive,
	filterCompleted,
	clearCompleted,
	show,
}) => {
	let itemsLeft = 0;

	todos.forEach((elem) => {
		if (elem.state === 'active') itemsLeft++;
	});

	return (
		<footer className="footer">
			<span className="todo-count">{itemsLeft} items left </span>
			<TaskFilter
				filterAll={() => filterAll()}
				filterActive={() => filterActive()}
				filterCompleted={() => filterCompleted()}
				show={show}
			/>
			<button
				type="button"
				className="clear-completed"
				onClick={clearCompleted}
			>
				Clear completed
			</button>
		</footer>
	);
};

Footer.defaultProps = {
	todos: [{ label: 'Complited tusk', state: 'active', id: 1, checked: false }],
};

Footer.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	filterAll: PropTypes.func.isRequired,
	filterActive: PropTypes.func.isRequired,
	filterCompleted: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	show: PropTypes.string.isRequired,
};

export default Footer;
