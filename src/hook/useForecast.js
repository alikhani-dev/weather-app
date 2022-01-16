import { useState } from 'react'

const useForecast = () => {
	const [isLoading, setLoading] = useState(false)
	const [isError, setError] = useState(false)
	const [forecast, setForecast] = useState(null)

	const showSearch = () => setForecast(null)
	const removeError = () => setError(false)

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

	const getLocation = async () => {
		if ('geolocation' in navigator) {
			await navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true })
		} else {
			setError('browser not supported')
		}
	}

	const success = async ({ coords }) => {
		const { latitude, longitude } = coords
		showSearch()
		findByGPS(latitude, longitude)
	}

	const error = ({ code }) => {
		switch (code) {
			case 1:
				setError(
					`The acquisition of the geolocation information failed because the page didn't have the permission to do it.`,
				)
				break
			case 2:
				setError(
					`The acquisition of the geolocation failed because one or several internal sources of position returned an internal error.`,
				)
				break
			case 3:
				setError(`Geolocation information was not obtained in the allowed time.`)
				break
			default:
				setError(`Please see later`)
				break
		}
	}

	return {
		isLoading,
		isError,
		forecast,
		findCity,
		showSearch,
		getLocation,
		removeError,
	}
}

export default useForecast
