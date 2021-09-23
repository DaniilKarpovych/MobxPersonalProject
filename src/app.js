// Components

import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Days } from './components/days';
import { Filters } from './components/filters';
import { Head } from './components/head';
import { SelectedWeather } from './components/selectedWeather';
import { store } from './lib/mobx';


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

