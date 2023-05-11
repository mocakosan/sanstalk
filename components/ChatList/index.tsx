import Chat from '@components/Chat';
import { ChatZone, Section } from '@components/ChatList/styles';
import { IDM } from '@typings/db';
import React, { VFC } from 'react';

interface Props {
  chatData?: IDM[];
}

const ChatList: VFC<Props> = ({ chatData }) => {
  return (
    <ChatZone>
      {chatData?.map((chat) => (
        <Chat key={chat.id} data={chat} />
      ))}
    </ChatZone>
  );
};

export default ChatList;
