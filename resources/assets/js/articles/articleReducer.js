const initialState = {
  id: 1,
  heading: 'aaa',
  body: 'asdf',
  created_at: '2017-03-14',
  user: {
    name: 'no name',
  },
};

export default function articleDetailReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
