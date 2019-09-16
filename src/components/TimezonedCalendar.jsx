import React from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment-timezone'

export const convertDateTimeToDate = (datetime, timeZoneName) => {
  const m = moment.tz(datetime, timeZoneName);
  return new Date(m.year(), m.month(), m.date(), m.hour(), m.minute(), 0)
};

export const convertDateToDateTime = (date, timeZoneName) => {
  const dateM = moment.tz(date, Calendar.tz);
  return moment.tz({
    year: dateM.year(),
    month: dateM.month(),
    date: dateM.date(),
    hour: dateM.hour(),
    minute: dateM.minute(),
  }, Calendar.tz);
};

Calendar.tz = moment.tz.guess();
export const m = (...args) => moment.tz(...args, Calendar.tz);
m.localeData = moment.localeData;
const localizer = Calendar.momentLocalizer(m);



const TimeZoneAgnosticBigCalendar = ({ events, onSelectSlot, onEventDrop, timeZoneName, ...props }) => {
  const bigCalendarProps = {
      ...props,
      localizer,
      events: events.map(event => ({
        ...event,
        start: convertDateTimeToDate(event.start, timeZoneName),
        end: convertDateTimeToDate(event.end, timeZoneName),
      })),
      onSelectSlot: onSelectSlot && (({ start, end, slots }) => {
        onSelectSlot({
          start: convertDateToDateTime(start, timeZoneName),
          end: convertDateToDateTime(end, timeZoneName),
          slots: slots.map(date => convertDateToDateTime(date, timeZoneName)),
        })
      }),
      onEventDrop: onEventDrop && (({ event, start, end }) => {
        onEventDrop({
          event,
          start: convertDateToDateTime(start, timeZoneName),
          end: convertDateToDateTime(end, timeZoneName),
        })
      }),
  }
  return <Calendar {...bigCalendarProps} />
};

export default TimeZoneAgnosticBigCalendar;

