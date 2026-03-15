export interface Message {
  id: string;
  text?: string;
  type: 'text' | 'voice';
  duration?: number;
  from: 'me' | 'them';
  time: string;
  read?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  initials: string;
  color: string;
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
    initials: 'АС',
    color: '#FF6B6B',
    online: true,
    lastMessage: 'Окей, завтра встретимся!',
    lastTime: '14:32',
    unread: 2,
    messages: [
      { id: 'm1', text: 'Привет! Как дела?', type: 'text', from: 'them', time: '14:10' },
      { id: 'm2', text: 'Всё отлично, спасибо! Ты как?', type: 'text', from: 'me', time: '14:11', read: true },
      { id: 'm3', type: 'voice', duration: 12, from: 'them', time: '14:20' },
      { id: 'm4', text: 'Слышу, слышу 😄 Ты завтра свободна?', type: 'text', from: 'me', time: '14:25', read: true },
      { id: 'm5', text: 'Да, с трёх часов точно!', type: 'text', from: 'them', time: '14:30' },
      { id: 'm6', text: 'Окей, завтра встретимся!', type: 'text', from: 'them', time: '14:32' },
    ]
  },
  {
    id: '2',
    name: 'Команда',
    initials: '🚀',
    color: '#5856D6',
    online: false,
    lastMessage: 'Дедлайн перенесли на пятницу',
    lastTime: '12:05',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Народ, дедлайн перенесли на пятницу', type: 'text', from: 'them', time: '12:00' },
      { id: 'm2', text: 'Отлично, значит успеем!', type: 'text', from: 'me', time: '12:03', read: true },
      { id: 'm3', text: 'Дедлайн перенесли на пятницу', type: 'text', from: 'them', time: '12:05' },
    ]
  },
  {
    id: '3',
    name: 'Михаил Петров',
    initials: 'МП',
    color: '#34C759',
    online: true,
    lastMessage: 'Голосовое: 0:24',
    lastTime: 'Вчера',
    unread: 1,
    messages: [
      { id: 'm1', text: 'Привет! Слушай, есть минутка?', type: 'text', from: 'them', time: '18:00' },
      { id: 'm2', type: 'voice', duration: 24, from: 'them', time: '18:05' },
    ]
  },
  {
    id: '4',
    name: 'Катя Иванова',
    initials: 'КИ',
    color: '#FF9500',
    online: false,
    lastMessage: 'Увидимся завтра 👋',
    lastTime: 'Вчера',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Всё готово к встрече?', type: 'text', from: 'them', time: '10:30' },
      { id: 'm2', text: 'Да, буду вовремя!', type: 'text', from: 'me', time: '10:35', read: true },
      { id: 'm3', text: 'Увидимся завтра 👋', type: 'text', from: 'them', time: '10:40' },
    ]
  },
  {
    id: '5',
    name: 'Дмитрий Козлов',
    initials: 'ДК',
    color: '#007AFF',
    online: false,
    lastMessage: 'Буду в 19:00',
    lastTime: 'Пн',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Встретимся вечером?', type: 'text', from: 'me', time: '15:00', read: true },
      { id: 'm2', text: 'Буду в 19:00', type: 'text', from: 'them', time: '15:10' },
    ]
  },
  {
    id: '6',
    name: 'Ольга Смирнова',
    initials: 'ОС',
    color: '#AF52DE',
    online: true,
    lastMessage: 'Спасибо большое!',
    lastTime: 'Пн',
    unread: 0,
    messages: [
      { id: 'm1', text: 'Можешь помочь с задачей?', type: 'text', from: 'them', time: '11:00' },
      { id: 'm2', type: 'voice', duration: 45, from: 'me', time: '11:05', read: true },
      { id: 'm3', text: 'Спасибо большое!', type: 'text', from: 'them', time: '11:10' },
    ]
  },
];
