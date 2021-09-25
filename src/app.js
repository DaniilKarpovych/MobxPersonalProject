// Components
import { Days } from './components/days';
import { Filters } from './components/filters';
import { Head } from './components/head';
import { SelectedWeather } from './components/selectedWeather';
// Instruments


export const App = () => {
    return (

        <main>
            <Filters />
            <Head />
            <SelectedWeather />
            <Days />

        </main>
    );
};

