import React from 'react';
import styled from 'styled-components';
import events from './events';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import EventPopOver from '../components/EventPopOver';
import Event from '../components/Event';
import TimeZonedCalendar from '../components/TimezonedCalendar'
import Calendar from "react-big-calendar";
import moment from 'moment-timezone'

import { Container } from '../App';
import Side from './Side';
import * as firebase from 'firebase';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import 'react-big-calendar/lib/sass/styles.scss'
import { Box } from '@material-ui/core';

const DndCalendar = withDragAndDrop(TimeZonedCalendar)

export const convertISOStringTOMoment = (events) => {
  return events.map(event => {
    return {
      ...event,
      start: moment(event.start),
      end: moment(event.end)
    }
  })
}
export const convertMomentTOIsoString = (events) => {
  return events.map(event => {
    return {
      ...event,
      start: moment.isMoment(event.start) || moment.isDate(event.start) ? event.start.toISOString() : event.start,
      end: moment.isMoment(event.end) || moment.isDate(event.end) ? event.end.toISOString() : event.end,
    }
  })
}

class MyCalendar extends React.Component {
  unsubscribeEvents = null;
  unsubscribeUsers = null;
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      users: [],
      selectedEvent: {},
      selectedEventEl: null,
      newEventId: null,
      checkedTypes: ['NONE', 'TODO', 'EVENT', 'REMINDER'],
      view: 'month',
    };
  }

  getUserInfo = () => {
    return firebase.auth().currentUser;
  }

  getDocRef = () => {
    const { uid } = this.getUserInfo();
    return firebase.firestore().collection('events').doc(uid);
  }

  getUserList = () => {
    const { uid, email, displayName } = this.getUserInfo();
    const userRef = firebase.firestore().collection('users').doc(uid);
    userRef.get().then(doc => {
      if(!doc.exists) {
        userRef.set({
          email: email,
          name: displayName
        });
      }
    }).then(() => {

      const selfId = this.getUserInfo().uid;
      const setUser = (snapShot) => {
        const users = snapShot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          email: doc.data().email,
        })).filter(user => user.id !== selfId);
        this.setState({users});
      }
      this.unsubscribeUsers = firebase.firestore().collection('users').onSnapshot(snapShot => {
        setUser(snapShot)
      });
      firebase.firestore().collection('users').get().then(snapShot => {
        setUser(snapShot)
      });
    })
  }

  componentDidMount() {
    const { displayName } = this.getUserInfo();
    const docRef = this.getDocRef()
    this.getUserList();
    this.unsubscribeEvents = docRef
    .onSnapshot((doc) => {
      if(doc.exists) {
        this.setState({events: convertISOStringTOMoment(doc.data().events)})
      } else {
        this.setState({events: []})
      }
    });

    docRef.get().then((doc) => {
      if(doc.exists) {
        this.setState({events: doc.data().events})
      } else {
        docRef.set({
          name: displayName,
          events: [],
        });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeUsers();
    this.unsubscribeEvents();
  }

  // moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
  //   const { events } = this.state

  //   const idx = events.indexOf(event)
  //   let allDay = event.allDay

  //   if (!event.allDay && droppedOnAllDaySlot) {
  //     allDay = true
  //   } else if (event.allDay && !droppedOnAllDaySlot) {
  //     allDay = false
  //   }

  //   const newEnd = end

  //   const updatedEvent = { ...event, start, end: newEnd, allDay }
  //   const nextEvents = [...events]
  //   nextEvents.splice(idx, 1, updatedEvent)

  //   this.setState({
  //     events: nextEvents,
  //   })
  // }

  // resizeEvent = ({ event, start, end }) => {
  //   const { events } = this.state

  //   const nextEvents = events.map(existingEvent => {
  //     return existingEvent.id === event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent
  //   })

  //   this.setState({
  //     events: nextEvents,
  //   })

  // }

  // onDragStart = ({ event, start, end }) => {
  //   console.log('on drag start', event, start, end)
  // }

  handleDelete = (event) => {
    const docRef = this.getDocRef();
    const events = this.state.events.filter(evt => evt.id !== event.id)
    docRef.update({
      events: convertMomentTOIsoString(events)
    }).then(() => {
      this.setState({
        selectedEvent: {},
        selectedEventEl: null,
      });
    })
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
      newEvent.end = moment(newEvent.end).minute(moment(newEvent.end).minute() + 1).toISOString();
    }
    
    this.setState({
      newEventId: newId,
      events: convertISOStringTOMoment(this.state.events.concat([newEvent])),
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
        this.setState({
          events: newEvents,
          newEventId: null,
          selectedEvent: {},
        })
      } else {
        newEvents = this.state.events;
        const docRef = this.getDocRef();
        docRef.update({
          events: convertMomentTOIsoString(newEvents),
        }).then(() => {
          this.setState({
            newEventId: null,
            selectedEvent: {},
          })
        })
      }

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
              users={this.state.users}
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
