import React, { useCallback } from 'react';
import { Container, Header } from './styles';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
  }, []);
  return (
    <Container>
      <Header>channel</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};
export default Channel;
