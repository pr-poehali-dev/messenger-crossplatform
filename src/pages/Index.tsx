import { useState } from 'react';
import { chats } from '@/data/mockData';
import IOSChatList from '@/components/messenger/IOSChatList';
import IOSChat from '@/components/messenger/IOSChat';
import IOSVideoCall from '@/components/messenger/IOSVideoCall';

type Screen = 'list' | 'chat' | 'video';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('list');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [tab, setTab] = useState('all');

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const openChat = (id: string) => {
    setActiveChatId(id);
    setScreen('chat');
  };

  const goBack = () => {
    setScreen('list');
    setActiveChatId(null);
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center"
      style={{ background: '#000' }}
    >
      {/* iPhone frame wrapper — on desktop show as phone mockup */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '100%',
          maxWidth: 390,
          height: '100%',
          maxHeight: 844,
          background: 'var(--ios-bg)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
          borderRadius: 'clamp(0px, 4vw, 44px)',
        }}
      >
        {screen === 'list' && (
          <div className="absolute inset-0 animate-ios-fade-in">
            <IOSChatList
              chats={chats}
              activeId={activeChatId}
              onSelect={openChat}
              tab={tab}
              onTabChange={setTab}
            />
          </div>
        )}

        {screen === 'chat' && activeChat && (
          <div className="absolute inset-0 animate-slide-in-right">
            <IOSChat
              chat={activeChat}
              onBack={goBack}
              onVideoCall={() => setScreen('video')}
            />
          </div>
        )}

        {screen === 'video' && activeChat && (
          <div className="absolute inset-0 animate-ios-fade-in">
            <IOSVideoCall
              chat={activeChat}
              onEnd={() => setScreen('chat')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
