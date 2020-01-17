import { useState, useEffect } from 'react';

export const useFetchWeather = (url, city) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method: "POST",
            body: JSON.stringify({city: city})
        })
            .then(r => r.json())
            .then(res => {
                if (res.cod === 404) {
                    setError(true);
                    setLoading(false);
                }
                return res;
            })
            .then(res => {
                const data = {
                    temp: res.main.temp.toFixed(0),
                    city: res.name,
                    country: res.sys.country,
                    weather: res.weather
                };
                setData(data);
                setLoading(false);
                setError(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });
    }, [city]);
    return {data, error, loading };
};
