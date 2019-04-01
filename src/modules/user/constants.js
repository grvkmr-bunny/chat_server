const id = 2;
const User = [
  { id: '0', name: 'John', email: 'john@gmail.com' },
  { id: '1', name: 'Alice', email: 'alice@gmail.com' },
  { id: '2', name: 'Bob', email: 'bob@gmail.com' },
];

const Messages = [
  { id: '0', text: 'Hello World!', sender: '0', receiver: '1' },
  { id: '1', text: 'Hello World1235455', sender: '0', receiver: '1' },
  { id: '2', text: 'Hey', sender: '1', receiver: '2' },
  { id: '3', text: 'Welcome!', sender: '2', receiver: '1' },
]

export {
  User,
  id,
  Messages,
};
