import { pubsub, USER_ADDED } from '../../subscription';

const Subscription = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator(USER_ADDED),
  },
};

export default Subscription;