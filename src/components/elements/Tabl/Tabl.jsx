import React, { useState } from 'react'
import ArrowDown from '../../../svg/ArrowDown';
import ArrowUp from '../../../svg/ArrowUp';
import Filtering from '../Filtering/Filtering';
import styles from './Tabl.module.scss';

const Tabl = ({ sortData, contactData, directionSort, onSearchSend, isLoading }) => {

	const [fieldData, setfieldData] = useState('');

	const Arrow = () => {
		return (
			directionSort ? <ArrowDown /> : <ArrowUp />
		)
	}

	const fieldSortData = (field) => {
		sortData(field)
		setfieldData(field)
	}

	if (isLoading) {
		return <h2>Loading</h2>
	}
	return (
		<div className={`container`}>
			<h1 className='title'>Таблица с сортировкой и фильтрацией</h1>
			<Filtering
				onSearchSend={onSearchSend}
			/>
			<div className={styles.table}>
				<div className={styles.table__info}>
					<ul className={styles.table__items}>
						<li className={`${styles.table__item} ${styles.table__item_header}`}>Дата</li>
						<li className={`${styles.table__item} ${styles.table__item_header} ${styles.table__item_activ}`}>
							<button className={styles.table__button} onClick={() => { fieldSortData('name') }}>
								Название {fieldData === 'name' ? <Arrow /> : null}
							</button>
						</li>
						<li className={`${styles.table__item} ${styles.table__item_header} ${styles.table__item_activ}`}>
							<button className={styles.table__button} onClick={() => { fieldSortData('quantity') }}>
								Количество {fieldData === 'quantity' ? <Arrow /> : null}
							</button></li>
						<li className={`${styles.table__item} ${styles.table__item_header} ${styles.table__item_activ}`}>
							<button className={styles.table__button} onClick={() => { fieldSortData('distance') }}>
								Расстояние {fieldData === 'distance' ? <Arrow /> : null}
							</button>
						</li>
					</ul>
					{contactData.map(item => (
						<ul key={item._id} className={styles.table__items}>
							<li className={styles.table__item}>{item.data}</li>
							<li className={styles.table__item}>{item.name}</li>
							<li className={styles.table__item}>{`${item.quantity} шт.`}</li>
							<li className={styles.table__item}>{`${item.distance} метров`}</li>
						</ul>
					))}
				</div>
			</div>
		</div>
	)
}

export default Tabl