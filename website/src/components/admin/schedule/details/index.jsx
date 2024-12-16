import { useEffect, useRef } from 'react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const eventsServicePlugin = createEventsServicePlugin();
const calendarControls = createCalendarControlsPlugin();

const icons = {
    "PENDING": '⏱️',
    "EXAMINED": '☑️',
    "CANCELLED": '⛔',
    "CONFIRMED": '✅',
};

const getConfigCalendarSchedule = (
    navigate,
    setSearchParams,
    doctorID,
    canDragDrop
) => {
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
            onRangeUpdate(range) {
                console.log('new calendar range start date', range.start);
                console.log('new calendar range end date', range.end);
            },
            onEventUpdate(updatedEvent) {
                if (canDragDrop) {
                    navigate(`/admin/schedules/form/${doctorID}/edit/${updatedEvent.id}`);
                    setSearchParams({
                        date: updatedEvent.start.slice(0, 10),
                        startTime: updatedEvent.start.slice(11, 16),
                        endTime: updatedEvent.end.slice(11, 16),
                    });
                }
            },
            onEventClick(calendarEvent) {
                console.log('onEventClick', calendarEvent);
            },
            onClickDate(date) {
                console.log('onClickDate', date);
            },
            onClickDateTime() { },
            onClickAgendaDate(date) {
                console.log('onClickAgendaDate', date);
            },
            onDoubleClickDate(date) {
                console.log('onClickDate', date);
            },
            onDoubleClickDateTime(dateTime) {
                console.log('onDoubleClickDateTime', dateTime);

                if (canDragDrop) {
                    navigate(`/admin/schedules/form/${doctorID}/create/`);
                    setSearchParams({
                        date: dateTime.slice(0, 10),
                        startTime: dateTime.slice(11, 16),
                    });
                }
            },
            onClickPlusEvents(date) {
                console.log('onClickPlusEvents', date);
            },
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
    const effectRan = useRef(false);

    const calendar = useCalendarApp(
        getConfigCalendarSchedule(
            navigate,
            setSearchParams,
            doctorID,
            canDragDrop
        )
    );

    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;

        if (defaultEvents?.length) {
            defaultEvents.forEach(event => {
                eventsServicePlugin?.add({
                    id: event._id,
                    title: event.clinic.name,
                    start: `${event.day} ${event.hour.startTime}`,
                    end: `${event.day} ${event.hour.endTime}`,
                    people: event?.appointments?.map(appointment => {
                        return `${appointment.patient} (${new Date(appointment.time).toTimeString().split(' ')[0].slice(0, 5) + ' ' + icons[appointment.status]})`;
                    }),
                });
            });
        }
    }, [defaultEvents]);

    return (
        <div className='w-full'>
            <ScheduleXCalendar calendarApp={ calendar } />
        </div>
    );
}

export default CalendarSchedule;
