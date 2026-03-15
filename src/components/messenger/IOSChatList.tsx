import { useState } from 'react';
import { Chat } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface IOSChatListProps {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
  tab: string;
  onTabChange: (t: string) => void;
}

export default function IOSChatList({ chats, activeId, onSelect, tab, onTabChange }: IOSChatListProps) {
  const [search, setSearch] = useState('');

  const filtered = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: 'all', label: 'Все' },
    { key: 'unread', label: 'Непрочитанные' },
  ];

  const displayed = tab === 'unread' ? filtered.filter(c => c.unread > 0) : filtered;

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--ios-bg)' }}>
      {/* iOS Large Title Nav */}
      <div className="ios-navbar px-4 pt-12 pb-2 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[34px] font-bold tracking-tight" style={{ color: 'var(--ios-label)' }}>
            Сообщения
          </h1>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--ios-gray5)', color: 'var(--ios-blue)' }}
          >
            <Icon name="SquarePen" size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <div className="flex items-center ios-search px-3 py-2 gap-2">
            <Icon name="Search" size={15} style={{ color: 'var(--ios-gray)' }} />
            <input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[17px] placeholder:text-[color:var(--ios-gray)] text-[color:var(--ios-label)]"
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <Icon name="X" size={14} style={{ color: 'var(--ios-gray)' }} />
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 pb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className="px-4 py-1.5 rounded-full text-[13px] font-medium transition-all"
              style={tab === t.key
                ? { background: 'var(--ios-blue)', color: 'white' }
                : { background: 'var(--ios-gray5)', color: 'var(--ios-blue)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ background: 'var(--ios-surface)' }}>
        {displayed.map((chat, i) => {
          const isActive = chat.id === activeId;
          const isLast = i === displayed.length - 1;

          return (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className="w-full flex items-center gap-3 px-4 transition-all active:opacity-60 text-left"
              style={{
                background: isActive ? 'rgba(0,122,255,0.08)' : 'transparent',
                paddingTop: 12,
                paddingBottom: 12,
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-[54px] h-[54px] rounded-full flex items-center justify-center text-[20px] font-semibold text-white"
                  style={{ background: chat.color }}
                >
                  {chat.initials.startsWith('🚀') ? chat.initials : (
                    <span className="text-[17px] font-semibold text-white">{chat.initials}</span>
                  )}
                </div>
                {chat.online && (
                  <div
                    className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: 'var(--ios-green)' }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className="flex-1 min-w-0 py-0"
                style={!isLast ? { borderBottom: '0.5px solid var(--ios-separator)' } : {}}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[17px] font-semibold truncate" style={{ color: 'var(--ios-label)' }}>
                    {chat.name}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <span className="text-[15px]" style={{ color: 'var(--ios-gray)' }}>{chat.lastTime}</span>
                    <Icon name="ChevronRight" size={14} style={{ color: 'var(--ios-gray3)' }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] truncate pr-2" style={{ color: 'var(--ios-label2)' }}>
                    {chat.lastMessage}
                  </span>
                  {chat.unread > 0 && (
                    <div
                      className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0"
                      style={{ background: 'var(--ios-blue)' }}
                    >
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* iOS Tab Bar */}
      <div className="ios-tabbar px-1 pt-2 pb-6">
        <div className="flex justify-around">
          {[
            { icon: 'MessageCircle', label: 'Чаты', active: true },
            { icon: 'Phone', label: 'Звонки', active: false },
            { icon: 'Users', label: 'Контакты', active: false },
            { icon: 'Settings', label: 'Настройки', active: false },
          ].map(item => (
            <button
              key={item.icon}
              className="flex flex-col items-center gap-1 px-3 py-1 transition-opacity active:opacity-60"
              style={{ color: item.active ? 'var(--ios-blue)' : 'var(--ios-gray)' }}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
