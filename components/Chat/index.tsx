import { IChat, IDM, IUser } from '@typings/db';
import React, { FC, memo, useMemo } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';

interface Props {
  data: IDM | IChat;
}

const Chat: FC<Props> = memo(({ data }) => {
  console.log('@@@', data);
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  //data안에 Sender라는 키가 있음
  const user: IUser = 'Sender' in data ? data.Sender : data.User;

  //@[이름](id)
  // \d 숫자 , + 는 1개이상, ?는 0개나1개, *이 0개 이상
  //useMemo : 개별 훅스값 캐싱
  //memo 부모 컴포넌트가 바뀌어도 자식 컴포넌트는 props가 바뀌지 않는이상 바뀌지 않는다
  const result = useMemo(
    () =>
      regexifyString({
        pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
        decorator(match, index) {
          const arr = match.match(/@\[(.+?)]\((\d+?)\)/)!;
          if (arr) {
            return (
              <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                @{arr[1]}
              </Link>
            );
          }
          return <br key={index} />;
        },
        input: data.content,
      }),
    [data.content, workspace],
  );
  console.log('@@@@@', result);
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
