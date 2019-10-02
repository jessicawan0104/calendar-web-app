import { useState, useEffect } from 'react';
import * as firebase from 'firebase';

const useEvents = () => {
  const user = firebase.auth().currentUser;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore
      .collection('events')
      .doc(user.uid)
      .onSnapshot(doc => setEvents(doc.events || []));
    return () => unsubscribe()
  })

  return {
    events
  }
}