import { IDM, IChat } from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatList: (IChat | IDM)[]) {
  const sections: { [key: string]: (IChat | IDM)[] } = {};
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
