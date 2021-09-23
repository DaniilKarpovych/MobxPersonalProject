import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { Context } from '../lib/Provider';
import { schema } from './config/config';

export const Filters = observer(() => {
    const store = useContext(Context);
    const form = useForm({
        mode:          'onTouched',
        resolver:      yupResolver(schema),
        defaultValues: {
            type:    '',
            minTemp: '',
            maxTemp: '',
        },
    });
    form.watch();
    const onSubmit = form.handleSubmit((filter) => {
        store.applyFilter({
            type:           filter.type,
            minTemperature: filter.minTemp,
            maxTemperature: filter.maxTemp,
        });
    });
    const onClickTypeSet = (event) => {
        if (!store.isFiltered) {
            form.setValue('type', event.target.getAttribute('name'));
        }
    };
    const onClickReset = () => {
        store.resetFilter();
        form.reset();
    };

    const checkBox = store.isFiltered ? 'checkbox blocked' : 'checkbox';
    const dayType = form.getValues('type');
    const buttonBlock = dayType || form.getValues('minTemp') || form.getValues('maxTemp');
    console.log(buttonBlock);

    return (
        <form
            className = 'filter' onSubmit = { onSubmit }>
            <span
                className = { `${checkBox} ${dayType === 'cloudy' ? 'selected' : ''}` }
                onClick = { onClickTypeSet }
                { ...form.register('cloudy') }>Облачно</span>
            <span
                className = { `${checkBox} ${dayType === 'sunny' ? 'selected' : ''}` }
                onClick = { onClickTypeSet }
                { ...form.register('sunny') }>Солнечно</span>
            <p className = 'custom-input'>

                <label
                    htmlFor = 'min-temperature'>Минимальная температура</label>
                <input
                    id = 'min-temperature'
                    error = { form.formState.errors.minTemp }
                    type = 'number'
                    disabled = { store.isFiltered }
                    { ...form.register('minTemp') } />
            </p>
            <p className = 'custom-input'>
                <label htmlFor = 'min-temperature'>Максимальная температура</label>
                <input
                    id = 'max-temperature'
                    type = 'number'
                    disabled = { store.isFiltered }
                    error = { form.formState.errors.maxTemp }
                    { ...form.register('maxTemp') } />
            </p>
            { !store.isFiltered && <button type = 'submit' disabled = { !buttonBlock }>Отфильтровать</button> }
            { store.isFiltered
                && <button onClick = { onClickReset }>сбросить</button> }
        </form>
    );
});
