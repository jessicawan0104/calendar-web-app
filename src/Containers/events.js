const now = new Date()

export default [
  {
    id: 0,
    title: 'Event very long title',
    allDay: true,
    start: new Date(2019, 8, 14),
    end: new Date(2019, 8 , 14),
    desc: '',
    type: 'EVENT'
  },
  {
    id: 1,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    desc: 'Description about today',
    type: 'TODO'
  },
  {
    id: 2,
    title: 'Point in Time Event',
    start: now,
    end: now,
    desc: 'Test description',
    type: 'REMINDER'
  },
]