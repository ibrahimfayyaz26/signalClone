import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly lastMessage?: Message;
  readonly Messages?: (Message | null)[];
  readonly Users?: (ChatRoomUsers | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomLastMessageId?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly usersID: string;
  readonly chatroomID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class Users {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly Messages?: (Message | null)[];
  readonly chatrooms?: (ChatRoomUsers | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}

export declare class ChatRoomUsers {
  readonly id: string;
  readonly chatRoom: ChatRoom;
  readonly users: Users;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUsers, ChatRoomUsersMetaData>);
  static copyOf(source: ChatRoomUsers, mutator: (draft: MutableModel<ChatRoomUsers, ChatRoomUsersMetaData>) => MutableModel<ChatRoomUsers, ChatRoomUsersMetaData> | void): ChatRoomUsers;
}