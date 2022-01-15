import { useState } from 'react'

const useForecast = () => {
	const [isLoading, setLoading] = useState(false)
	const [isError, setError] = useState(false)
	const [forecast, setForecast] = useState(null)

	const showSearch = () => setForecast(null)

	const findCity = async (location) => {
		setLoading(true)
		setError(false)
		try {
			await fetch(`${process.env.REACT_APP_BASE_URL}?q=${location}&units=metric&appid=${process.env.REACT_APP_KEY}`)
				.then((response) => response.json())
				.then((json) => setForecast(json))
				.finally(() => setLoading(false))
		} catch (e) {
			setError(e)
		}
	}

	const findByGPS = async (latitude, longitude) => {
		setLoading(true)
		setError(false)
		await fetch(
			`${process.env.REACT_APP_BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_KEY}`,
		)
			.then((response) => response.json())
			.then((json) => setForecast(json))
			.catch((err) => setError(err))
		setLoading(false)
	}

	const getLocation = () => navigator.geolocation.getCurrentPosition(success, error)

	const success = async ({ coords }) => {
		const { latitude, longitude } = coords
		showSearch()
		findByGPS(latitude, longitude)
	}

	const error = (err) => setError(`ERROR(${err.code}): ${err.message}`)

	return {
		isLoading,
		isError,
		forecast,
		findCity,
		showSearch,
		getLocation,
	}
}

export default useForecast
