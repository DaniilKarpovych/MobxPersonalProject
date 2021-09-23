
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { Context } from '../lib/Provider';

export const Days = observer(() => {
    const { data, isFetched } = useWeather();
    const store = useContext(Context);
    const filteredData = Array.isArray(data) && store.filteredDays(data);

    useEffect(() => {
        if (filteredData.length === 0) {
            store.setSelectedDayId('');
            store.setSelectedDay('');
        }
        if (filteredData[ 0 ]) {
            store.setSelectedDay(filteredData[ 0 ]);
        }
    }, [filteredData, isFetched]);

    let weatherJSX = Array.isArray(filteredData) && filteredData.map((date) => {
        const weatheDate = format(new Date(date.day), 'eeee', { locale: ru });
        const onClickSet = () => {
            store.setSelectedDay(date);
        };
        let dayType = date.type;
        if (date.id === store.selectedDay.id) {
            dayType = `${date.type} selected`;
        }

        return (
            <div
                className = { `day ${dayType}` }
                key = { date.id }
                onClick = { onClickSet }>
                <p>{ weatheDate }</p>
                <span>{ date.temperature }</span>
            </div>
        );
    }).splice(0, 7);
    if (filteredData.length === 0) {
        weatherJSX = <p className = 'message'>По заданным критериям нет доступных дней!</p>;
    }

    return (
        <div className = 'forecast'>
            { weatherJSX }

        </div>
    );
});
