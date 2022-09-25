import { useState } from 'react';
// import { items } from '../../const/items';

const FilteringN = ({ onSearchSend }) => {
	const [fieldTarget, setfieldTarget] = useState('');
	const [fieldQuery, setfieldQuery] = useState('');
	const [searchValue, setsearchValue] = useState('');
	const [searchTarget, setsearchTarget] = useState('');
	const [searchQuery, setsearchQuery] = useState('');
	// const [innerSearch, setInnerSearch] = useState(search);

	const fieldTargetData = (field) => {
		setfieldTarget(field)
		console.log('field', field)
	}

	const fieldQueryData = (field) => {
		setfieldQuery(field)
		console.log('field', field)
	}

	function handleSubmit(e) {
		e.preventDefault();
	}


	return (
		<form className="input-group" onSubmit={handleSubmit}>
			<button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Колонка</button>
			<ul className="dropdown-menu" value={searchTarget} name="target" onChange={(e) => { setsearchTarget(e.target.value) }}>
				<li><a className="dropdown-item" href="/#" value="name" onClick={() => {
					fieldTargetData('Название')
					setsearchTarget('name')
				}}>Название</a></li>
				<li><a className="dropdown-item" href="/#" value="quantity" onClick={() => {
					fieldTargetData('Количество')
					setsearchTarget('quantity')
				}}>Количество</a></li>
				<li><a className="dropdown-item" href="/#" value="distance" onClick={() => {
					fieldTargetData('Расстояние')
					setsearchTarget('distance')
				}} >Расстояние</a></li>
				<li><hr className="dropdown-divider" /></li>
				<li><a className="dropdown-item" href="/#">{fieldTarget}</a></li>
			</ul>
			<ul className="dropdown-menu dropdown-menu-end" value={searchQuery} name="query">
				<li><a className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('равно')
					setsearchQuery('equally')
				}} >равно</a></li>
				<li><a className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('содержит')
					setsearchQuery('contains')
				}} >содержит</a></li>
				<li><a className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('больше')
					setsearchQuery('more')
				}} >больше</a></li>
				<li><a className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('меньше')
					setsearchQuery('less')
				}} >меньше</a></li>
				<li><hr className="dropdown-divider" /></li>
				<li><a className="dropdown-item" href="/#">{fieldQuery}</a></li>
			</ul>
			<button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Условие</button>
			<input
				name="argument"
				type="text"
				placeholder="Значение"
				className="form-control"
				aria-label="Text input with 2 dropdown buttons"
				value={searchValue}
				onChange={(e) => { setsearchValue(e.target.value) }}
			/>
			<button
				type="button"
				className="btn btn-outline-secondary"
				onClick={() => onSearchSend(searchValue)}
			>
				Фильтр
			</button>
		</form>
	)
}

export default FilteringN