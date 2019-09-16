import React from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment'
import styled from 'styled-components';
import events from './events';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import EventPopOver from '../components/EventPopOver';
import Event from '../components/Event';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/sass/styles.scss'

const localizer = Calendar.momentLocalizer(moment);
const DndCalendar = withDragAndDrop(Calendar)

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      selectedEvent: {},
      selectedEventEl: null,
      newEventId: null,
    };
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }
    // const diff = moment(event.end).diff(event.start, 'milliseconds');
    // console.log('dfiff', diff)
    // const newEnd = moment(start).add(diff, 'milliseconds').toISOString();
    const newEnd = end

    const updatedEvent = { ...event, start, end: newEnd, allDay }
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

  }

  onDragStart = ({ event, start, end }) => {
    console.log('on drag start', event, start, end)
  }

  handleDelete = (event) => {
    const events = this.state.events.filter(evt => evt.id !== event.id)
    this.setState({
      events,
      selectedEvent: {},
      selectedEventEl: null,
    });
  }


  newEvent = (event) => {
    console.log(event.start)
    let idList = this.state.events.map(a => a.id)
    let newId = Math.max(...idList) + 1
    let newEvent = {
      id: newId,
      title: '',
      allDay: event.slots.length === 1,
      start: event.start,
      end: event.end,
    }
    this.setState({
      newEventId: newId,
      events: this.state.events.concat([newEvent]),
    }, () => {
      const node = document.getElementById(`event-${newId}`);
      this.setState({
        selectedEvent: newEvent,
        selectedEventEl: node
      })
    });
  }

  handleEventClick = (event, e) => {
    this.setState({
      selectedEvent: event,
      selectedEventEl: e.currentTarget
    })
  }

  handleClosePopOver = () => {
    this.setState({
      selectedEventEl: null
    }, () => {
      let newEvents;
      if(this.state.newEventId !== null) {
        newEvents = this.state.events.filter(evt => evt.id !== this.state.newEventId);
      } else {
        newEvents = this.state.events;
      }
      this.setState({
        newEventId: null,
        events: newEvents,
        selectedEvent: {},
      })
    })
  }

  handlePopOverSave = (editEvent) => {
    const newEvents = this.state.events.map(evt => {
      return evt.id === editEvent.id
        ? editEvent
        : evt;
    })
    this.setState({events: newEvents, newEventId: null});
  }



  render() {
    console.log('this.state.selectedEvent', this.state.selectedEvent)
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Calendar
          selectable
          resizable
          className={this.props.className}
          localizer={localizer}
          events={this.state.events}
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          onSelectEvent={this.handleEventClick}
          onEventDrop={this.moveEvent}
          onDragStart={console.log}
          popup
          startAccessor="start"
          endAccessor="end"
          titleAccessor={(event) => event.title || '(No Title)'}
          components={{event: Event}}
        />
        <EventPopOver
          anchorEl={this.state.selectedEventEl}
          onClose={this.handleClosePopOver}
          event={this.state.selectedEvent}
          onSave={this.handlePopOverSave}
          onDelete={this.handleDelete}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default styled(MyCalendar)`
button {
  font-size: 16px;
}
height: calc(100vh - 120px);
`;
