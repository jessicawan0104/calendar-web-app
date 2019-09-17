import React from 'react';
import styled from 'styled-components';
import events from './events';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import EventPopOver from '../components/EventPopOver';
import Event from '../components/Event';
import TimeZonedCalendar from '../components/TimezonedCalendar'

import { Container } from '../App';
import Side from './Side';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/sass/styles.scss'
import { Box } from '@material-ui/core';

const DndCalendar = withDragAndDrop(TimeZonedCalendar)

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      selectedEvent: {},
      selectedEventEl: null,
      newEventId: null,
      checkedTypes: ['NONE', 'TODO', 'EVENT', 'REMINDER'],
      view: 'month',
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

    let idList = this.state.events.map(a => a.id)
    let newId = idList.length === 0 ? 1 : Math.max(...idList) + 1;
    let newEvent = {
      id: newId,
      title: '',
      allDay: event.slots.length === 1,
      start: event.start,
      end: event.end,
      type: 'NONE'
    }
    if(this.state.view === 'month' && event.slots.length !== 1) {
      newEvent.end.minute(newEvent.end.minute() + 1);
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
      if (this.state.newEventId !== null) {
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
    this.setState({ events: newEvents, newEventId: null });
  }

  handleCheckChange = (name) => {
    const types = [...this.state.checkedTypes];
    const hasType = types.indexOf(name) !== -1;
    let newTypes;
    if(hasType) {
      newTypes = types.filter(type => type !== name)
    } else {
      newTypes = [ ...types, name];
    }
    this.setState({checkedTypes: newTypes});
  }

  getEvents = () => this.state.events.filter( evt => this.state.checkedTypes.includes(evt.type));

  render() {
    return (
      <Container>
        <Side 
          onCreate={this.newEvent}
          checkedTypes={this.state.checkedTypes}
          onCheckChange={this.handleCheckChange}
        />
        <Box className="main">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <TimeZonedCalendar
              selectable
              resizable
              view={this.state.view}
              onView={(view) => this.setState({view})}
              views={['month', 'day', 'week']}
              className={this.props.className}
              events={this.getEvents()}
              onEventResize={this.resizeEvent}
              onSelectSlot={this.newEvent}
              onSelectEvent={this.handleEventClick}
              onEventDrop={this.moveEvent}
              popup
              startAccessor="start"
              endAccessor="end"
              titleAccessor={(event) => event.title || '(No Title)'}
              components={{ event: Event }}
            />
            <EventPopOver
              anchorEl={this.state.selectedEventEl}
              onClose={this.handleClosePopOver}
              event={this.state.selectedEvent}
              onSave={this.handlePopOverSave}
              onDelete={this.handleDelete}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Container>
    );
  }
}

export default styled(MyCalendar)`
button {
  font-size: 16px;
}
height: calc(100vh - 120px);
`;
