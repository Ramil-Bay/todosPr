import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = ({ filterAll, filterCompleted, filterActive, show }) => {
	return (
		<ul className="filters">
			<li>
				<button
					type="button"
					className={show === 'all' ? 'selected' : ''}
					onClick={filterAll}
				>
					All
				</button>
			</li>
			<li>
				<button
					type="button"
					className={show === 'active' ? 'selected' : ''}
					onClick={filterActive}
				>
					Active
				</button>
			</li>
			<li>
				<button
					type="button"
					className={show === 'completed' ? 'selected' : ''}
					onClick={filterCompleted}
				>
					Completed
				</button>
			</li>
		</ul>
	);
};

TaskFilter.propTypes = {
	filterAll: PropTypes.func.isRequired,
	filterActive: PropTypes.func.isRequired,
	filterCompleted: PropTypes.func.isRequired,
	show: PropTypes.string.isRequired,
};

export default TaskFilter;
