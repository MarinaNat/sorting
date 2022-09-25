import React from 'react'
import styles from './Poginator.module.scss';
// import ReactPaginate from 'react-paginate';
// import { NavLink } from 'react-router-dom';

const Poginator = ({
	pages,
	currentPage,
	onNextClick,
	onPreviousClick,
	buttonNextDisabled,
	buttonPreviousDisabled,
	currentPageActive,
	currentPageNumber
}) => {

	return (
		<div className={styles.poginator}>
			<nav aria-label="...">
				<ul className="pagination">
					<li className={`page-item ${buttonPreviousDisabled}`}>
						<a className="page-link" href="/#" tabIndex="-1" onClick={() => onPreviousClick()}>Previous</a>
					</li>
					{
						pages.map(p => {
							return (
								<li className={`page-item ${currentPageNumber === p ? currentPageActive : ''}`} key={p} >
									<a className="page-link" href="/#" onClick={() => { currentPage(p) }}>
										{p}
									</a>
								</li>
							)
						})
					}

					<li className={`page-item ${buttonNextDisabled}`}>
						<a className="page-link" href="/#" onClick={() => onNextClick()}>Next</a>
					</li>
				</ul>
			</nav >
		</div>
	)
}

export default Poginator