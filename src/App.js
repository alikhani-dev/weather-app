import { Form, Error, Forecast, Loading } from './components'
import useForecast from './hook/useForecast'

const App = () => {
	const { isLoading, isError, forecast, findCity, showSearch, getLocation, removeError } = useForecast()

    return (
		<>
			{forecast?.cod === 200 ? (
				<Forecast data={forecast} showSearch={showSearch} getLocation={getLocation} />
			) : (
				<>
					{!isLoading && <Form findCity={findCity} findLocation={getLocation} />}

					{isLoading && <Loading />}

					{isError && <Error message={isError} removeError={removeError} />}
				</>
			)}
		</>
	)
}

export default App
