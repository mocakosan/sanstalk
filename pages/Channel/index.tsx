import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { DragOver } from '@pages/Channel/styles';
import { Header, Container } from '@pages/DM/styles';
import { IChannel, IChat, IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
import axios from 'axios';
import { channel } from 'diagnostics_channel';
import gravatar from 'gravatar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const PAGE_SIZE = 20;
const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [socket] = useSocket(workspace);
  const { data: myData } = useSWR('/api/users', fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<IChat[]>(
    (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
    {
      onSuccess(data) {
        if (data?.length === 1) {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 100);
        }
      },
    },
  );
  const { data: channelMembersData } = useSWR<IUser[]>(
    myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );
  const { data: channelsData } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);
  const channelData = channelsData?.find((v) => v.name === channel);
  const [chat, onChangeChat, setChat] = useInput('');
  const scrollbarRef = useRef<Scrollbars>(null);
  const [dragOver, setDragOver] = useState(false);

  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData && channelData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: myData.id,
            User: myData,
            ChannelId: channelData.id,
            Channel: channelData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          // localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
          setChat('');
          if (scrollbarRef.current) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            scrollbarRef.current.scrollToBottom();
          }
        });
        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
            content: chat,
          })
          .catch(console.error);
      }
    },
    [chat, workspace, channel, myData, channelData, chatData, mutateChat, setChat],
  );

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  const onMessage = useCallback(
    (data: IChat) => {
      if (data.Channel.name === channel && data.UserId !== myData.id) {
        mutateChat((chatData) => {
          chatData?.[0].unshift(data);
          return chatData;
        }, false).then(() => {
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
            ) {
              console.log('scrollToBottom!', scrollbarRef.current?.getValues());
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, 100);
            } else {
              toast.success('새 메시지가 도착했습니다.', {
                onClick() {
                  scrollbarRef.current?.scrollToBottom();
                },
                closeOnClick: true,
              });
            }
          }
        });
      }
    },
    [channel, myData],
  );

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // useEffect(() => {
  //   localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
  // }, [workspace, id]);

  // const onDrop = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     const formData = new FormData();
  //     if (e.dataTransfer.items) {
  //       // Use DataTransferItemList interface to access the file(s)
  //       for (let i = 0; i < e.dataTransfer.items.length; i++) {
  //         // If dropped items aren't files, reject them
  //         if (e.dataTransfer.items[i].kind === 'file') {
  //           const file = e.dataTransfer.items[i].getAsFile();
  //           console.log('... file[' + i + '].name = ' + file.name);
  //           formData.append('image', file);
  //         }
  //       }
  //     } else {
  //       // Use DataTransfer interface to access the file(s)
  //       for (let i = 0; i < e.dataTransfer.files.length; i++) {
  //         console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
  //         formData.append('image', e.dataTransfer.files[i]);
  //       }
  //     }
  //     axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, formData).then(() => {
  //       setDragOver(false);
  //       localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
  //       mutateChat();
  //     });
  //   },
  //   [workspace, id, mutateChat],
  // );

  // const onDragOver = useCallback((e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   setDragOver(true);
  // }, []);

  if (!myData || !myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <ChatList
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        setSize={setSize}
      />
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message ${myData.nickname}`}
        data={[]}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      {/* {dragOver && <DragOver>업로드!</DragOver>} */}
    </Container>
  );
};

export default Channel;
