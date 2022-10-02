import React, { useState } from 'react';
import styles from './Filtering.module.scss';

const Filtering = ({ onSearchSend }) => {
	const [searchValue, setsearchValue] = useState('');
	const [searchTarget, setsearchTarget] = useState('name');
	const [searchQuery, setsearchQuery] = useState('');

	return (
		<div className={styles.filters}>
			<fieldset>
				<legend>Колонка</legend>
				<select
					id="filter-target"
					value={searchTarget}
					name='target'
					className={styles.filter}
					onChange={(e) => {
						setsearchTarget(e.target.value)
					}}
				>
					<option value="name" onClick={() => {
						setsearchTarget('name')
					}}>Название</option>
					<option value="quantity" onClick={() => {
						setsearchTarget('quantity')
					}}>Количество</option>
					<option value="distance" onClick={() => {
						setsearchTarget('distance')
					}}>Расстояние</option>
				</select>
			</fieldset>
			<fieldset>
				<legend>Условие</legend>
				<select
					id="filter-query"
					value={searchQuery}
					name='query'
					className={styles.filter}
					onChange={(e) => {
						setsearchQuery(e.target.value)
					}}
				>
					{searchTarget !== 'name' ?
						<>
							<option value="equally" onClick={() => {
								setsearchQuery('equally')
							}}>Равно</option>
							<option value="more" onClick={() => {
								setsearchQuery('more')
							}}>Больше</option>
							<option value="less" onClick={() => {
								setsearchQuery('less')
							}}>Меньше</option>
						</> :
						<option value="contains" onClick={() => {
							setsearchQuery('contains')
						}}>Содержит</option>
					}
				</select>
			</fieldset>
			<div className={styles.search}>
				<input
					name="argument"
					type="text"
					placeholder="Значение"
					value={searchValue}
					onChange={(e) => {
						setsearchValue(e.target.value)
					}}
				/>
				<button
					className={styles.search__button}
					type="button"
					onClick={() => onSearchSend(searchValue, searchTarget, searchQuery)}
				>
					Применить
				</button>
			</div>
		</div>
	)
}

export default Filtering