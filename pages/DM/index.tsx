import React, { useCallback } from 'react';
import { Container, Header } from '@pages/DM/styles';
import gravata from 'gravatar';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';

const DM = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR('/api/users', fetcher);
  //채팅을 받아오는 api
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );
  const [chat, onChangeChat, setChat] = useInput('');
  //채팅 등록
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat();
            //채팅 등록한다음에 채팅창 글자지우기
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat],
  );
  if (!userData || !myData) {
    return null;
  }
  return (
    <Container>
      <Header>
        <img src={gravata.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};
export default DM;
