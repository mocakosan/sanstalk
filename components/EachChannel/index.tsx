import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  channel: IChannel;
}
const EachChannel: VFC<Props> = ({ channel }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  console.log('location', location.pathname);
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  //console.log('userdata', userData);
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;
  console.log('date', new Date(date), userData);
  const { data: count, mutate } = useSWR<number>( // 채팅 갯수 가져오는 api , count:n개
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );
  console.log('count', count);

  useEffect(() => {
    //location.pathname이 `/workspace/${workspace}/channel/${channel.name}`이랑 같으면 mutate가 0으로 재캐싱된다
    if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, channel]);

  return (
    <NavLink key={channel.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}># {channel.name}</span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}3
    </NavLink>
  );
};

export default EachChannel;
