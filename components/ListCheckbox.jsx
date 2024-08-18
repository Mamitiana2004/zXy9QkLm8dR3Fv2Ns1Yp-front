import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import style from './../style/components/ListCheckbox.module.css';
import UrlConfig from '@/util/config';

export default function ListCheckbox(props) {
    const [specifications, setSpecifications] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        // Fetch specifications from the API
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`)
            .then(response => response.json())
            .then(data => {
                // Transform the data to match the MultiSelect format
                const formattedOptions = data.map(spec => ({
                    label: spec.type_specification,
                    value: spec.id
                }));
                setSpecifications(formattedOptions);
            })
            .catch(error => {
                console.error('Error fetching specifications:', error);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    const handleChange = (e) => {
        setSelectedValues(e.value);
    };

    return (
        <div className={style.container}>
            <span className={style.title}>Specifications</span>
            <div className={style.multiSelectContainer}>
                <MultiSelect
                    value={selectedValues}
                    options={specifications}
                    onChange={handleChange}
                    optionLabel="label"
                    placeholder="Select specifications"
                    className={style.multiSelect}
                />
            </div>
        </div>
    );
}
