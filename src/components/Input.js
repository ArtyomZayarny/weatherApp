import React, { useState } from 'react';
import moment from 'moment';
import { kelvinToCelsius } from '../utils'
import { apiClient } from '../apiClient';
import { setData } from '../redux/actions';
import { useDispatch } from 'react-redux'

export default function Input(props) {
    const [city, setCity] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather(city)

    }

    const normalizeData = (list) => {
        const filterData = [];
        let result = { name: "", values: [] };
        let date = "";
        list.forEach((item, index) => {
            date = moment(item.dt_txt).format("D");

            if (result.name === "") {
                result.name = parseInt(date);
                result.values.push(item.main);
            } else {
                if (result.name == date) {
                    result.values.push(item.main);
                    //check if last
                    if (!list[index + 1]) {
                        filterData.push({ ...result });
                    }
                }
                if (result.name < date) {
                    filterData.push({ ...result });
                    result.name = "";
                    result.values = [];
                }
            }
        });
        const chartBarDate = filterData.map((day) => {
            const minVal = day.values.sort((a, b) => {
                return parseFloat(a.temp_min) - parseFloat(b.temp_min);
            })[0].temp_min;
            const maxVal = day.values.sort((a, b) => {
                return parseFloat(b.temp_max) - parseFloat(a.temp_max);
            })[0].temp_max;

            let minMaxValuesArr = [kelvinToCelsius(minVal), kelvinToCelsius(maxVal)];
            return { name: day.name, values: minMaxValuesArr };
        });
        return chartBarDate
    }

    const getWeather = (city) => {
        apiClient.get(`forecast?q=${city}&appid=df7065d3aeff74b31072ae05b0f5ba9f`)
            .then((res) => {
                if (res.data.hasOwnProperty('list')) {
                    const list = res.data.list;
                    const barChartData = normalizeData(list)
                    //Set to the store 
                    dispatch(setData({ data: barChartData, isErro: false, msg: '' }))
                }
            })
            .catch((e) => {
                //No city was founded
                dispatch(setData({ data: [], isError: true, msg: 'There is no city for your request' }))
            })
    }

    const handleChange = (value) => {
        setCity(value)
    }

    return (
        <>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input
                    autoComplete="off"
                    type="text"
                    name="city"
                    value={city}
                    placeholder={'City'}
                    onChange={(e) => { handleChange(e.target.value) }} />
                <button>search</button>
            </form>
        </>
    )
}
