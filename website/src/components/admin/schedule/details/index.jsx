import { ScheduleXCalendar } from '@schedule-x/react';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import {
    createCalendar,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect } from 'react';

const eventsServicePlugin = createEventsServicePlugin();
const calendarControls = createCalendarControlsPlugin();

const getConfigCalendarSchedule = (onSetInfoForm) => {
    return {
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda()
        ],
        events: [],
        dayBoundaries: {
            start: '07:00',
            end: '22:00',
        },
        monthGridOptions: {
            /**
            * Number of events to display in a day cell before the "+ N events" button is shown
            * */
            nEventsPerDay: 1
        },
        locale: 'vi-VN',
        plugins: [
            createDragAndDropPlugin(),
            createEventModalPlugin(),
            eventsServicePlugin,
            calendarControls
        ],
        callbacks: {
            /**
             * Is called when:
             * 1. Selecting a date in the date picker
             * 2. Selecting a new view
             * */
            onRangeUpdate(range) {
                console.log('new calendar range start date', range.start);
                console.log('new calendar range end date', range.end);
            },

            /**
             * Is called when an event is updated through drag and drop
             * */
            onEventUpdate(updatedEvent) {
                console.log('onEventUpdate', updatedEvent);
                onSetInfoForm(prev => ({
                    ...prev,
                    isOpen: true,
                    date: new Date(updatedEvent.start).toISOString().slice(0, 10)
                }));
            },

            /**
            * Is called when an event is clicked
            * */
            onEventClick(calendarEvent) {
                console.log('onEventClick', calendarEvent);
            },

            /**
            * Is called when clicking a date in the month grid
            * */
            onClickDate(date) {
                console.log('onClickDate', date); // e.g. 2024-01-01
            },

            /**
            * Is called when clicking somewhere in the time grid of a week or day view
            * */
            onClickDateTime(dateTime) {
                // console.log('ll');
                // eventsServicePlugin.add({
                //     title: 'Ngày' + dateTime.slice(0, 10),
                //     start: dateTime,
                //     end: dateTime.slice(0, 10) + ' 18:00',
                //     description: 'Moi' + dateTime,
                //     id: Date.now()
                // });
                // onSetInfoForm(prev => ({
                //     ...prev,
                //     isOpen: true,
                //     date: dateTime.slice(0, 10)
                // }));
            },

            /**
            * Is called when selecting a day in the month agenda
            * */
            onClickAgendaDate(date) {
                console.log('onClickAgendaDate', date); // e.g. 2024-01-01
            },

            /**
            * Is called when double clicking a date in the month grid
            * */
            onDoubleClickDate(date) {
                console.log('onClickDate', date); // e.g. 2024-01-01
            },

            /**
            * Is called when double clicking somewhere in the time grid of a week or day view
            * */
            onDoubleClickDateTime(dateTime) {
                onSetInfoForm(prev => ({
                    ...prev,
                    isOpen: true,
                    date: dateTime.slice(0, 10)
                }));
            },

            /**
            * Is called when clicking the "+ N events" button of a month grid-day
            * */
            onClickPlusEvents(date) {
                console.log('onClickPlusEvents', date); // e.g. 2024-01-01
            },

            /**
            * Is called when the selected date is updated
            * */
            onSelectedDateUpdate(date) {
                console.log('onSelectedDateUpdate', date);
            },
        }
    };
};

function CalendarSchedule({ newSchedule, onSetInfoForm, defaultEvents }) {
    console.log('render');
    const calendar = createCalendar(
        getConfigCalendarSchedule(onSetInfoForm)
    );
    // useEffect(() => {
    //     calendarControls.setView('week');
    //     calendarControls.setDate('2024-10-19');
    // }, [onSetInfoForm]);

    useEffect(() => {
        if (newSchedule) {
            console.log(newSchedule);
            eventsServicePlugin.add(newSchedule);
            // eventsServicePlugin.add({
            //     title: 'Ngày' + '2024-10-26',
            //     start: '2024-10-26 08:00',
            //     end: '2024-10-26 18:00',
            //     id: Date.now()
            // });
        }
    }, [newSchedule]);

    if (defaultEvents.length) {
        defaultEvents?.forEach(event => {
            eventsServicePlugin.add({
                id: event._id,
                title: event.clinic.name,
                start: `${event.day} ${event.hour.startTime}`,
                end: `${event.day} ${event.hour.endTime}`,
            });
        });
    }

    return (
        <div className='w-full'>
            <ScheduleXCalendar calendarApp={ calendar } />
        </div>
    );
}

export default CalendarSchedule;