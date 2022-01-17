import { useState } from 'react'

const useForecast = () => {
	const [isLoading, setLoading] = useState(false)
	const [isError, setError] = useState(false)
	const [forecast, setForecast] = useState(null)

	const showSearch = () => setForecast(null)
	const removeError = () => setError(false)

	const geolocationByIP = async () => {
		setLoading(true)
		setError(false)
		const { Latitude, Longitude } = await fetch(`${process.env.REACT_APP_IP_ADDRESS}?apikey=${process.env.REACT_APP_IP_ADDRESS_KEY}`)
			.then((res) => res.json())
			.finally(() => setLoading(false))
		if (Latitude && Longitude) {
			findByGPS(Latitude, Longitude)
		} else {
			setError('Error server')
		}
	}

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
			await navigator.geolocation.getCurrentPosition(success, geolocationByIP, { enableHighAccuracy: true })
		} else {
			setError('browser not supported')
		}
	}

	const success = async ({ coords }) => {
		const { latitude, longitude } = coords
		showSearch()
		findByGPS(latitude, longitude)
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
