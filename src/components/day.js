
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../lib/Provider';


export const Day = observer((props) => {
    const store = useContext(Context);
    const weatheDate = format(new Date(props.date.day), 'eeee', { locale: ru });
    const onClickSet = () => {
        store.setSelectedDay(props.date);
    };
    const dayType = props.date.id === store.selectedDay.id
        ? `${props.date.type} selected`
        : props.date.type;

    return (
        <div
            className = { `day ${dayType}` }
            key = { props.date.id }
            onClick = { onClickSet }>
            <p>{ weatheDate }</p>
            <span>{ props.date.temperature }</span>
        </div>
    );
});
