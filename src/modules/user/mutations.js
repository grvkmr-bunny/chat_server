import { User, Messages } from './constants';
import { pubsub, USER_ADDED, MESSAGE_SEND } from '../../subscription';

const Mutation = {
  addUser: (parent, { name, email }) => {
    let temp;
    const newData = User.filter(user => user.email === email);
    if (newData.length === 0) {
      temp = {
        id: User.length,
        name,
        email,
      };
      User.push(temp);
      pubsub.publish(USER_ADDED, { userAdded: temp });
    } else {
      temp = {
        id: newData[0].id,
        name: newData[0].name,
        email: newData[0].email,
      };
      // pubsub.publish(USER_ADDED, { userAdded: temp });
    }
    return temp;
  },

  sendMessage: (parent, { text, sender, receiver }) => {
    const temp = {
      id: Messages.length,
      text,
      sender,
      receiver,
    };
    Messages.push(temp)
    pubsub.publish(MESSAGE_SEND, { messageSend: temp });
    return temp
  },
}

export default Mutation;
