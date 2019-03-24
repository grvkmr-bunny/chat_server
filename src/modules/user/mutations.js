
import { User, id } from './constants';
import { pubsub, USER_ADDED } from '../../subscription';

const Mutation = {
  addUser: (parent, { name, friends }) => {
    const temp = {
      id: id + 1,
      name,
      friends: User.filter(data => friends.indexOf(data.id) !== -1).map(user => user.id),
    };
    User.push(temp);
    pubsub.publish(USER_ADDED, { userAdded: temp });
    return temp;
  },
}

export default Mutation;