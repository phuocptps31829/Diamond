import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';

const eventsServicePlugin = createEventsServicePlugin();

const getConfigCalendarSchedule = (onSetInfoForm) => {
    return {
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
                id: '1',
                title: 'Event 1',
                start: '2024-09-19 09:00',
                end: '2024-09-19 18:00',
                people: ['chinh(7:30)', 'phuoc', 'phuong', 'chinh', 'phuoc', 'phuong']
            },
            {
                id: '2',
                title: 'Event 1',
                start: '2024-09-19 09:00',
                end: '2024-09-19 18:00',
                people: ['chinh(7:30)', 'phuoc', 'phuong', 'chinh', 'phuoc', 'phuong']
            },
        ],
        dayBoundaries: {
            start: '08:00',
            end: '22:00',
        },
        monthGridOptions: {
            /**
            * Number of events to display in a day cell before the "+ N events" button is shown
            * */
            nEventsPerDay: 1
        },
        locale: 'vi-VN',
        plugins: [createDragAndDropPlugin(), createEventModalPlugin(), eventsServicePlugin],
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
                console.log(dateTime, dateTime.slice(0, 10) + ' 18:00');
                onSetInfoForm(prev => ({
                    ...prev,
                    isOpen: true,
                    date: dateTime.slice(0, 10)
                }));
                // eventsServicePlugin.add({
                //     title: 'Ngày' + dateTime.slice(0, 10),
                //     start: dateTime,
                //     end: dateTime.slice(0, 10) + ' 18:00',
                //     description: 'Moi' + dateTime,
                //     id: Date.now()
                // });
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
                console.log('onDoubleClickDateTime', dateTime); // e.g. 2024-01-01 12:37
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


function CalendarSchedule({ onSetInfoForm }) {
    const calendar = useCalendarApp(
        getConfigCalendarSchedule(onSetInfoForm)
    );

    return (
        <div className='overflow-x-scroll w-full'>
            <ScheduleXCalendar calendarApp={ calendar } />
        </div>
    );
}

export default CalendarSchedule;