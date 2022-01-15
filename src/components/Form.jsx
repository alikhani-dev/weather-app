import { useState } from 'react'

const Form = ({ findCity, findLocation }) => {
	const [location, setLocation] = useState('')

	const formHandler = (e) => {
		e.preventDefault()

		if (location.length) {
			findCity(location)
		}
	}

	return (
		<div className='modal'>
			<h4>select your city</h4>
			<div className='inputs'>
				<div>
					<input value={location} onChange={(e) => setLocation(e.target.value)} type='text' placeholder='Qazvin ....' />
					<button onClick={formHandler}>send</button>
					<button onClick={findLocation}>My Location</button>
				</div>
			</div>
		</div>
	)
}

export default Form
