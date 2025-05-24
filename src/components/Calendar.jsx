import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import eventsData from '../data/events.json';

const Calendar = () => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const getEventsForDate = (date) => {
    const formatted = date.format('YYYY-MM-DD');
    return events.filter((e) => e.date === formatted);
  };

  const renderEvents = (eventList) => {
    return (
      <div className="mt-0.5 w-full space-y-0.5">
        {eventList.map((event) => {
          const conflicts = eventList.filter(
            (e) => e.time === event.time && e.id !== event.id
          );
          const conflict = conflicts.length > 0;

          return (
            <div
              key={event.id}
              className={classNames(
                'text-[9px] px-1 py-[1px] rounded-sm shadow-sm truncate',
                conflict ? 'bg-red-200 text-red-800' : 'bg-indigo-200 text-indigo-900'
              )}
              title={`${event.title} at ${event.time} (${event.duration})`}
            >
              {event.title}
            </div>
          );
        })}
      </div>
    );
  };

  const generateCalendar = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentDate.date(i);
      const isToday = date.isSame(today, 'day');
      const isSelected = selectedDate?.isSame(date, 'day');
      const eventList = getEventsForDate(date);

      const isSunday = date.day() === 0;
      const isSaturday = date.day() === 6;

      days.push(
        <div
          key={i}
          onClick={() => setSelectedDate(date)}
          className={classNames(
            'p-1 h-14 rounded-lg border text-[11px] transition-all flex flex-col justify-start items-start cursor-pointer select-none',
            'hover:bg-indigo-50 hover:shadow-sm',
            isToday
              ? 'bg-indigo-300 border-indigo-500 ring-2 ring-indigo-600 text-white font-semibold'
              : isSunday
              ? 'bg-red-50 border-red-300 text-red-700'
              : isSaturday
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-gray-200 text-gray-900',
            isSelected ? 'ring-2 ring-indigo-700' : ''
          )}
        >
          <div className="font-semibold text-sm leading-none">{i}</div>
          {renderEvents(eventList)}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={prevMonth}
          className="text-indigo-600 hover:text-indigo-800 text-lg px-2"
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-indigo-900 select-none">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button
          onClick={nextMonth}
          className="text-indigo-600 hover:text-indigo-800 text-lg px-2"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      {/* Selected date event label & list above calendar */}
      {selectedDate && (
        <div className="mb-3 p-2 rounded-xl bg-indigo-50 border border-indigo-200 shadow-inner text-sm">
          <h3 className="text-indigo-900 font-semibold mb-1">
            Events on {selectedDate.format('MMM D, YYYY')}
          </h3>
          {getEventsForDate(selectedDate).length === 0 ? (
            <p className="text-indigo-600">No events scheduled.</p>
          ) : (
            <ul className="space-y-1 text-indigo-900">
              {getEventsForDate(selectedDate).map((event) => (
                <li key={event.id}>
                  🕒 <strong>{event.time}</strong> – {event.title} ({event.duration})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-[10px] uppercase font-semibold mb-1 tracking-wide select-none">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className={classNames(
              day === 'Sun' ? 'text-red-600 font-bold' : day === 'Sat' ? 'text-indigo-700' : 'text-indigo-500'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
