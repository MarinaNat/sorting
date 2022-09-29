import { NavLink } from 'react-router-dom';
import styles from './Poginator2.module.scss';

const Poginator2 = ({ limitCountPage, tottalCount, paginate, nextPage, prevPage, currentPage }) => {
	const pageNambers = []

	for (let i = 1; i <= Math.ceil(tottalCount / limitCountPage); i++) {
		pageNambers.push(i)
	}

	console.log('currentPage)', currentPage)
	return (
		<div>
			<ul className={styles.poginator}>
				{
					pageNambers.map(namber => (
						<li className={styles.poginator__item} key={namber}>
							<NavLink href="!#" className={`${styles.poginator__link} ${(currentPage === namber) ? `${styles.poginator__link_active}` : ''}`} onClick={() => paginate(namber)}>{namber}</NavLink>
						</li>
					))
				}
			</ul>
			<button className={`btn btn-primary ${(currentPage <= 1) ? 'disabled' : ''}`} onClick={prevPage}>Previous</button>
			<button className={`btn btn-primary ms-2 ${(currentPage >= Math.ceil(tottalCount / limitCountPage)) ? 'disabled' : ''}`} onClick={nextPage}>Next</button>
		</div>
	)
}

export default Poginator2