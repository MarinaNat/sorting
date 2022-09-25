import React from 'react'
import { useState } from 'react'

const Search = ({ onSearchSend }) => {

	const [serchValue, setSerchValue] = useState('');

	return (
		<div className="input-group mb-3">
			<input
				type="text"
				className="form-control"
				placeholder="Поле для ввода значения"
				aria-label="Recipient's username"
				aria-describedby="basic-addon2"
				value={serchValue}
				onChange={(e) => { setSerchValue(e.target.value) }}
			/>
			<div className="input-group-append">
				<button
					className="btn btn-outline-secondary"
					type="button"
					onClick={() => onSearchSend(serchValue)}
				>
					Поиск
				</button>
			</div>
		</div>
	)
}

export default Search