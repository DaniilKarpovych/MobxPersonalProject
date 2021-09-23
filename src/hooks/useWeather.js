import { useQuery } from 'react-query';
import { api } from '../api/api';


export const useWeather = () => {
    const query = useQuery('weather', api.getWeather);

    return query;
};
