import { useState } from 'react';
import { Chat } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface ChatListProps {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const avatarColors = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-green-100 text-green-600',
  'bg-orange-100 text-orange-600',
  'bg-pink-100 text-pink-600',
  'bg-teal-100 text-teal-600',
];

export default function ChatList({ chats, activeId, onSelect }: ChatListProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filtered = chats.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'all' || c.unread > 0;
    return matchSearch && matchTab;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Сообщения</h1>
          <button className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Icon name="SquarePen" size={18} className="text-blue-500" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-100 text-sm outline-none placeholder:text-gray-400 focus:bg-gray-50 transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {[{ key: 'all', label: 'Все' }, { key: 'unread', label: 'Непрочитанные' }].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'all' | 'unread')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filtered.map((chat, i) => {
          const isActive = chat.id === activeId;
          const color = avatarColors[i % avatarColors.length];

          return (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all hover:bg-gray-50 ${
                isActive ? 'chat-item-active' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${color}`}>
                  {chat.avatar.startsWith('🚀') ? (
                    <span className="text-xl">{chat.avatar}</span>
                  ) : (
                    chat.avatar
                  )}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-gray-900 truncate">{chat.name}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.lastTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-gray-100 px-2 py-2 flex justify-around">
        {[
          { icon: 'MessageCircle', label: 'Чаты', active: true },
          { icon: 'Users', label: 'Контакты', active: false },
          { icon: 'Phone', label: 'Звонки', active: false },
          { icon: 'Settings', label: 'Настройки', active: false },
        ].map(item => (
          <button key={item.icon} className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
            item.active ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
          }`}>
            <Icon name={item.icon} size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
