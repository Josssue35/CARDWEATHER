import React, { useState } from 'react';
import './style.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: './Images/cloudy.png'
    });
    const [name, setName] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=de6e0b8eb716f85a508dc767a774b28a`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    let imagePath = '';
                    if (data.weather && data.weather.length > 0) {
                        switch (data.weather[0].main) {
                            case "Clouds":
                                imagePath = "./Images/cloudy.png";
                                break;
                            case "Clear":
                                imagePath = "./Images/clear_day.png";
                                break;
                            case "Rain":
                                imagePath = "./Images/heavy_rain.png";
                                break;
                            case "Drizzle":
                                imagePath = "./Images/showers_rain.png";
                                break;
                            case "Mist":
                                imagePath = "./Images/sleet_hail.png";
                                break;
                            default:
                                imagePath = './Images/cloudy.png';
                                break;
                        }
                    }

                    const tempCelcius = data.main.temp - 273.15;

                    setData({
                        celcius: tempCelcius,
                        name: data.name,
                        humidity: data.main.humidity,
                        speed: data.wind.speed,
                        image: imagePath
                    });
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    };

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src='./Images/search.png' alt='' /></button>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" className='icon' />
                    <h1>{Math.round(data.celcius)}°c </h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src='./Images/haze_fog_dust_smoke.png' alt='' />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humedad</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="./Images/windy_breezy.png" alt='' />
                            <div className="wind">
                                <p>{Math.round(data.speed)}km/h</p>
                                <p>Vientos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
