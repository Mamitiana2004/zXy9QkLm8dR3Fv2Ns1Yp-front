// components/RoomPlanning.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import style from './Planning.module.css';
import { formatDate } from '@fullcalendar/core';

const RoomPlanning = (props) => {
  const resources = [
    { id: '101', title: 'Chambre 101' },
    { id: '102', title: 'Chambre 102' },
    { id: '103', title: 'Chambre 103' },
    { id: '104', title: 'Chambre 104' }
  ];

  const eventTemplate = (value) =>{
    return (
      <div className={style.evenement_container}>
        <span>{value.event.title}</span>
        <div className={style.evenement_duree}>
          <span><i className='pi pi-sun'/> {value.event.extendedProps.jour} jour</span>
          <span>-</span>
          <span><i className='pi pi-moon'/> {value.event.extendedProps.nuit} nuit</span>
        </div>
      </div>
    )
  }

  return (
    <div className={style.calendarContainer}>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        headerToolbar={{
            left:'prev',
            center:'title',
            right: 'next',
        }}
        resources={props.rooms}
        events={props.events}
        eventContent={eventTemplate}
        views={{
            resourceTimelineMonth: {
              titleFormat: { year: 'numeric', month: 'long' }, 
              dayHeaderFormat:{ weekday: 'short', day: 'numeric', omitCommas: true }
            }
        }}
        slotDuration="24:00" // Durée de 24 heures pour chaque slot
        slotLabelInterval={{ days: 1 }} // Intervalle de 1 jour pour les slots
        slotLabelFormat={{ weekday: 'short', day: 'numeric', omitCommas: true }} // Format de la date
        height="auto"
        contentHeight="auto"
        slotMinWidth={100}
        resourceAreaWidth="150px"
        className="fc"
      />
    </div>
  );
};

export default RoomPlanning;
