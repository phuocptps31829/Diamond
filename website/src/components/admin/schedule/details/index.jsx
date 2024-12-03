import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const eventsServicePlugin = createEventsServicePlugin();
const calendarControls = createCalendarControlsPlugin();

const getConfigCalendarSchedule = (
    allSchedules,
    navigate,
    setSearchParams,
    doctorID,
    canDragDrop) => {
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
            canDragDrop && createDragAndDropPlugin(),
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
                console.log('allSchedules', allSchedules);
                if (canDragDrop) {
                    navigate(`/admin/schedules/form/${doctorID}/edit/${updatedEvent.id}`);
                    setSearchParams({
                        date: updatedEvent.start.slice(0, 10),
                        startTime: updatedEvent.start.slice(11, 16),
                        endTime: updatedEvent.end.slice(11, 16),
                    });
                }
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
                // navigate(prev => ({
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
                console.log('onDoubleClickDateTime', dateTime);

                if (canDragDrop) {
                    navigate(`/admin/schedules/form/${doctorID}/create/`);
                    setSearchParams({
                        date: dateTime.slice(0, 10),
                        startTime: dateTime.slice(11, 16),
                    });
                }
                // document.querySelector('.sx-react-calendar-wrapper').style.display = 'none';
                // onSetInfoForm(prev => ({
                //     ...prev,
                //     isOpen: true,
                //     date: dateTime.slice(0, 10)
                // }));

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

function CalendarSchedule({ doctorID, defaultEvents }) {
    const [, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const userProfile = useSelector(state => state.auth.userProfile);
    const canDragDrop = userProfile?.role?._id === import.meta.env.VITE_ROLE_SUPER_ADMIN;

    const allSchedules = defaultEvents?.map(event => ({
        id: event._id,
        title: event.clinic.name,
        start: `${event.day} ${event.hour.startTime}`,
        end: `${event.day} ${event.hour.endTime}`,
        // people: event?.appointment?.map(appointment => appointment.patient)
    }));

    const calendar = useCalendarApp(
        getConfigCalendarSchedule(
            allSchedules,
            navigate,
            setSearchParams,
            doctorID,
            canDragDrop
        )
    );

    // calendarControls.setView('week');

    if (defaultEvents?.length) {
        defaultEvents?.forEach(event => {
            console.log(event);
            eventsServicePlugin?.add({
                id: event._id,
                title: event.clinic.name,
                start: `${event.day} ${event.hour.startTime}`,
                end: `${event.day} ${event.hour.endTime}`,
                // people: event?.appointment?.map(appointment => appointment.patient),
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