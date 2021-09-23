import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../lib/Provider';

export const SelectedWeather = observer(() => {
    const store = useContext(Context);
    if (store.selectedDay) {
        return (
            <div className = 'current-weather'>
                <p className = 'temperature'>{ store.selectedDay.temperature }</p>
                <p className = 'meta'>
                    <span className = 'rainy'>{ `%${store.selectedDay.rain_probability}` }</span>
                    <span className = 'humidity'>{ `%${store.selectedDay.humidity}` }</span>
                </p>
            </div>
        );
    }

    return null;
});
