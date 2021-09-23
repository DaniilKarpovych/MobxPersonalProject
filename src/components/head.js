import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../lib/Provider';

export const Head = observer(() => {
    let weatheDay;
    let weatheDayMonth;
    const store = useContext(Context);
    if (store.selectedDay) {
        weatheDay = format(new Date(store.selectedDay.day), 'eeee', { locale: ru });
        weatheDayMonth = format(new Date(store.selectedDay.day), 'dd MMMM', { locale: ru });


        return (
            <div className = 'head'>
                <div className = { `icon ${store.selectedDay.type}` }></div>
                <div className = 'current-date'>
                    <p>{ weatheDay }</p>
                    <span>{ weatheDayMonth }</span>
                </div>
            </div>
        );
    }

    return null;
});
