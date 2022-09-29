import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Poginator2.module.scss';
// import { NavLink } from 'react-router-dom';

const Poginator = ({
	pages,
	currentPage,
	onNextClick,
	onPreviousClick,
	buttonNextDisabled,
	buttonPreviousDisabled,
	currentPageActive,
	currentPageNumber,
	totalCountPage,
	limitCountPage
}) => {
	const pageNambers = []

	for (let i = 1; i <= Math.ceil(totalCountPage / limitCountPage); i++) {
		pageNambers.push(i)
	}


	return (
		<div className={styles.poginator}>
			{/* <nav aria-label="..."> */}
			<ul className="pagination">
				<li className={`${buttonPreviousDisabled}`}>
					<NavLink className="page-link" to="#" tabIndex="-1" onClick={(e) => {
						e.preventDefault()
						onPreviousClick()
					}}>Previous</NavLink>
				</li>
				{
					pageNambers.map(p => {
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
			{/* </nav > */}
		</div>
	)
}

export default Poginator