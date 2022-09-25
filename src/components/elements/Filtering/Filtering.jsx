import { items } from '../../const/items';
import Search from '../Search/Search';
import styles from './Filtering.module.scss';

const Filtering = ({ onSearchSend, fieldData }) => {

	const fieldTargetData = (field) => {
		items.target = field
		console.log('field', field)
	}


	return (
		<div className={styles.filtering}>
			<div className={styles.filtering__header}>
				<p className={styles.filtering__subtitle}>Фильтр</p>
			</div>
			<ul className={styles.filtering__menu}>
				<li className={styles.filtering__lists}>
					<button className={styles.filtering__button}>Колонка</button>
					<span className={styles.filtering__menu_arrow}></span>
					<ul className={styles.filtering__menu_sub}>
						<li className={styles.filtering__lists_sub}>
							<button
								className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('name') }}
							>
								Название
							</button>
						</li>
						<li className={styles.filtering__lists_sub}>
							<button
								className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('quantity') }}
							>
								Количество
							</button>
						</li>
						<li className={styles.filtering__lists_sub}>
							<button
								className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('distance') }}
							>
								Расстояние
							</button>
						</li>
					</ul>
				</li>
				<li className={styles.filtering__lists}>
					<button className={styles.filtering__button}>Условие</button>
					<span className={styles.filtering__menu_arrow}></span>
					<ul className={styles.filtering__menu_sub}>
						<li className={styles.filtering__lists_sub}>
							<button className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('равно') }}
							>равно</button>
						</li>
						<li className={styles.filtering__lists_sub}>
							<button className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('содержит') }}
							>содержит</button>
						</li>
						<li className={styles.filtering__lists_sub}>
							<button className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('больше') }}
							>больше</button>
						</li>
						<li className={styles.filtering__lists_sub}>
							<button className={`${styles.filtering__button} ${styles.filtering__button_sub}`}
								onClick={() => { fieldTargetData('меньше') }}
							>меньше</button>
						</li>
					</ul>
				</li>
				<li className={styles.filtering__lists}>
					<button className={styles.filtering__button}>Поле ввода</button>
					<span className={styles.filtering__menu_arrow_field}></span>
					<ul className={styles.filtering__menu_field}>
						<li className={styles.filtering__lists_field}>
							<Search
								onSearchSend={onSearchSend}
								className={styles.filtering__field}
							/>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default Filtering