import { withFilter } from 'apollo-server';
import { pubsub, USER_ADDED, MESSAGE_SEND } from '../../subscription';

const Subscription = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator(USER_ADDED),
  },

  messageSend: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(MESSAGE_SEND),
      (payload, variables) => payload.messageSend.sender === variables.sender
        && payload.messageSend.receiver === variables.receiver,
    ),
  },
};

export default Subscription;
