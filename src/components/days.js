
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { Context } from '../lib/Provider';
import { Day } from './day';

export const Days = observer(() => {
    const { data, isFetched } = useWeather();
    const store = useContext(Context);
    const filterOn = store.isFiltered;
    const filteredData = Array.isArray(data) && (filterOn
        ? store.filteredDays(data)
        : data);
    useEffect(() => {
        if (filteredData.length === 0) {
            store.setSelectedDay('');
        }
        if (filteredData[ 0 ]) {
            store.setSelectedDay(filteredData[ 0 ]);
        }
    }, [filteredData, isFetched]);

    let weatherJSX = Array.isArray(filteredData) && filteredData.map((date) => {
        return <Day
            key = { date.id } date = { date } />;
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
