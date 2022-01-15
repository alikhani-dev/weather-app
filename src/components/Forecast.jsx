import { ISO_ALPHA2_TO_FULL_NAME } from '../utility'

const Forecast = ({ data, showSearch }) => {
	const { name } = data
	const { country: ISOName } = data.sys
	const { speed, deg } = data.wind
	const { main, description, icon } = data.weather[0]
	const { temp, humidity, temp_min, temp_max } = data.main
	const country = ISO_ALPHA2_TO_FULL_NAME(ISOName)

	return (
		<div className='container'>
			<div className='left'>
				<div className='upper-info'>
					<h2>{name}</h2>
					<p>{country}</p>
				</div>
				<div className='bottom-info'>
					<img className='air-info-img' src={`http://openweathermap.org/img/w/${icon}.png`} alt='icon' />
					<h2>{Math.trunc(temp)}°C</h2>
					<p>{main}</p>
				</div>
			</div>
			<div className='right'>
				<h2 className='city-name'>{name}</h2>
				<div className='info'>
					<div className='col'>
						<p>Wind Speed :</p>
						<p className='light-text '>{speed}</p>
					</div>
					<div className='col'>
						<p>Description :</p>
						<p className='light-text'>{description}</p>
					</div>
					<div className='col'>
						<p>Wind degree :</p>
						<p className='light-text'>{deg}</p>
					</div>
					<div className='col'>
						<p>Humidity degree :</p>
						<p className='light-text'>{humidity}</p>
					</div>
					<div className='col'>
						<p>Temp min / max:</p>
						<p className='light-text'>
							{Math.trunc(temp_min)} / {Math.trunc(temp_max)}°C
						</p>
					</div>
				</div>
				<div className='location'>
					<button onClick={showSearch}>Change location</button>
				</div>
			</div>
		</div>
	)
}

export default Forecast
