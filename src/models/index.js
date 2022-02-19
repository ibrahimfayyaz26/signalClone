// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ChatRoom, Message, Users, ChatRoomUsers } = initSchema(schema);

export {
  ChatRoom,
  Message,
  Users,
  ChatRoomUsers
};