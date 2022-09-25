import React from 'react'
import { NavLink } from 'react-router-dom';
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
						<NavLink className="page-link" to="#" tabIndex="-1" onClick={(e) => {
							e.preventDefault()
							onPreviousClick()
						}}>Previous</NavLink>
					</li>
					{
						pages.map(p => {
							return (
								<li className={`page-item ${currentPageNumber === p ? 'active' : ''}`} key={p} >
									<NavLink className="page-link" to={p} onClick={(e) => {
										e.preventDefault()
										currentPage(p)
									}}>
										{p}
									</NavLink>
								</li>
							)
						})
					}

					<li className={`page-item ${buttonNextDisabled}`}>
						<NavLink className="page-link" to="#" onClick={(e) => {
							e.preventDefault()
							onNextClick()
						}}>Next</NavLink>
					</li>
				</ul>
			</nav >
		</div>
	)
}

export default Poginator