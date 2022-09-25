import React, { useState } from 'react'
import ArrowDown from '../../../svg/ArrowDown';
import ArrowUp from '../../../svg/ArrowUp';
// import Filtering from '../Filtering/Filtering';
import FilteringN from '../Filtering/FilteringN';
import styles from './Tabl.module.scss';

const Tabl = ({ search, setSearch, sortData, contactData, directionSort, onSearchSend, fieldTarget, setfieldTarget, fieldQuery, setfieldQuery, searchValue, setsearchValue }) => {

	const [fieldData, setfieldData] = useState('');

	const Arrow = () => {
		return (
			directionSort ? <ArrowDown /> : <ArrowUp />
		)
	}

	const fieldSortData = (field) => {
		sortData(field)
		console.log(field)
		setfieldData(field)
	}

	return (
		<div className={`container`}>
			<h1 className='title'>Таблица с сортировкой и фильтрацией</h1>
			<FilteringN
				onSearchSend={onSearchSend}
				fieldData={fieldData}
				fieldTarget={fieldTarget}
				setfieldTarget={setfieldTarget}
				fieldQuery={fieldQuery}
				setfieldQuery={setfieldQuery}
				searchValue={searchValue}
				setsearchValue={setsearchValue}
				search={search}
				setSearch={setSearch}
			/>
			<div className={styles.table}>
				{/* <Filtering onSearchSend={onSearchSend} fieldData={fieldData} /> */}
				<div className={styles.table__info}>
					<ul className={styles.table__items}>
						<li className={`${styles.table__item} ${styles.table__item_header}`}>Дата</li>
						<li className={`${styles.table__item} ${styles.table__item_header}`}>
							<button className={styles.table__button} onClick={() => { fieldSortData('name') }}>
								Название {fieldData === 'name' ? <Arrow /> : null}
							</button>

						</li>
						<li className={`${styles.table__item} ${styles.table__item_header}`}>
							<button className={styles.table__button} onClick={() => { fieldSortData('quantity') }}>
								Количество {fieldData === 'quantity' ? <Arrow /> : null}
							</button></li>
						<li className={`${styles.table__item} ${styles.table__item_header}`}>
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