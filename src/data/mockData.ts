export interface Message {
  id: string;
  text?: string;
  type: 'text' | 'voice' | 'image';
  duration?: number;
  from: 'me' | 'them';
  time: string;
  read?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Анна Сорокина',
    avatar: 'АС',
    online: true,
    lastMessage: 'Окей, завтра встретимся!',
    lastTime: '14:32',
    unread: 2,
    messages: [
      { id: 'm1', text: 'Привет! Как дела?', type: 'text', from: 'them', time: '14:10', read: true },
      { id: 'm2', text: 'Всё отлично, спасибо! Ты как?', type: 'text', from: 'me', time: '14:11', read: true },
      { id: 'm3', type: 'voice', duration: 12, from: 'them', time: '14:20', read: true },
      { id: 'm4', text: 'Слышу, слышу 😄 Ты завтра свободна?', type: 'text', from: 'me', time: '14:25', read: true },
      { id: 'm5', text: 'Да, с трёх часов точно!', type: 'text', from: 'them', time: '14:30', read: true },
      { id: 'm6', text: 'Окей, завтра встретимся!', type: 'text', from: 'them', time: '14:32', read: false },
    ]
  },
  {
    id: '2',
    name: 'Команда проекта',
    avatar: '🚀',
    online: false,
    lastMessage: 'Дедлайн перенесли на пятницу',
    lastTime: '12:05',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Народ, дедлайн перенесли на пятницу', type: 'text', from: 'them', time: '12:00', read: true },
      { id: 'm2', text: 'Отлично, значит успеем!', type: 'text', from: 'me', time: '12:03', read: true },
      { id: 'm3', text: 'Дедлайн перенесли на пятницу', type: 'text', from: 'them', time: '12:05', read: true },
    ]
  },
  {
    id: '3',
    name: 'Михаил Петров',
    avatar: 'МП',
    online: true,
    lastMessage: 'Голосовое: 0:24',
    lastTime: 'Вчера',
    unread: 1,
    messages: [
      { id: 'm1', text: 'Привет! Слушай, есть минутка?', type: 'text', from: 'them', time: '18:00', read: true },
      { id: 'm2', type: 'voice', duration: 24, from: 'them', time: '18:05', read: false },
    ]
  },
  {
    id: '4',
    name: 'Катя Иванова',
    avatar: 'КИ',
    online: false,
    lastMessage: 'Посмотри это фото!',
    lastTime: 'Вчера',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Посмотри это фото!', type: 'text', from: 'them', time: '10:30', read: true },
      { id: 'm2', text: 'Вау, красота! 😍', type: 'text', from: 'me', time: '10:35', read: true },
    ]
  },
  {
    id: '5',
    name: 'Дмитрий Козлов',
    avatar: 'ДК',
    online: false,
    lastMessage: 'Буду в 19:00',
    lastTime: 'Пн',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Встретимся вечером?', type: 'text', from: 'me', time: '15:00', read: true },
      { id: 'm2', text: 'Буду в 19:00', type: 'text', from: 'them', time: '15:10', read: true },
    ]
  },
  {
    id: '6',
    name: 'Ольга Смирнова',
    avatar: 'ОС',
    online: true,
    lastMessage: 'Спасибо большое!',
    lastTime: 'Пн',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Можешь помочь с задачей?', type: 'text', from: 'them', time: '11:00', read: true },
      { id: 'm2', type: 'voice', duration: 45, from: 'me', time: '11:05', read: true },
      { id: 'm3', text: 'Спасибо большое!', type: 'text', from: 'them', time: '11:10', read: true },
    ]
  },
];
