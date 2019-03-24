import { User } from './constants';

const Query = {
  getAllUser: () => {
    return User;
  },

  getUser: (parent, { id }) => {
    return User.filter(data => data.id === id)[0];
  }
}

export default Query;