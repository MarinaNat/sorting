import { useState } from 'react';
import { Link } from 'react-router-dom';
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
				<li><Link className="dropdown-item" href="/#" value="name" onClick={() => {
					fieldTargetData('Название')
					setsearchTarget('name')
				}}>Название</Link></li>
				<li><Link className="dropdown-item" href="/#" value="quantity" onClick={() => {
					fieldTargetData('Количество')
					setsearchTarget('quantity')
				}}>Количество</Link></li>
				<li><Link className="dropdown-item" href="/#" value="distance" onClick={() => {
					fieldTargetData('Расстояние')
					setsearchTarget('distance')
				}} >Расстояние</Link></li>
				<li><hr className="dropdown-divider" /></li>
				<li><a className="dropdown-item" href="/#">{fieldTarget}</a></li>
			</ul>
			<ul className="dropdown-menu dropdown-menu-end" value={searchQuery} name="query">
				<li><Link className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('равно')
					setsearchQuery('equally')
				}} >равно</Link></li>
				<li><Link className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('содержит')
					setsearchQuery('contains')
				}} >содержит</Link></li>
				<li><Link className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('больше')
					setsearchQuery('more')
				}} >больше</Link></li>
				<li><Link className="dropdown-item" href="/#" onClick={() => {
					fieldQueryData('меньше')
					setsearchQuery('less')
				}} >меньше</Link></li>
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