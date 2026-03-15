import { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface IOSChatProps {
  chat: Chat;
  onBack: () => void;
  onVideoCall: () => void;
}

function VoiceBubble({ duration, isMe }: { duration: number; isMe: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setPlaying(true);
      const step = 100 / (duration * 10);
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return p + step;
        });
      }, 100);
    }
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[18px] ${isMe ? 'bubble-out' : 'bubble-in'}`} style={{ minWidth: 180 }}>
      <button
        onClick={toggle}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity active:opacity-70"
        style={{ background: isMe ? 'rgba(255,255,255,0.25)' : 'rgba(0,122,255,0.15)' }}
      >
        <Icon name={playing ? 'Pause' : 'Play'} size={14} style={{ color: isMe ? 'white' : 'var(--ios-blue)' }} />
      </button>

      {/* Waveform */}
      <div className="flex items-center gap-[2px] flex-1 h-7">
        {Array.from({ length: 20 }).map((_, i) => {
          const active = (i / 20) * 100 <= progress;
          const h = [4, 8, 12, 10, 16, 8, 14, 10, 6, 14, 8, 12, 10, 16, 6, 10, 14, 8, 12, 10][i];
          return (
            <div
              key={i}
              className="rounded-full flex-shrink-0"
              style={{
                width: 3,
                height: h,
                background: isMe
                  ? active ? 'white' : 'rgba(255,255,255,0.4)'
                  : active ? 'var(--ios-blue)' : 'var(--ios-gray3)',
              }}
            />
          );
        })}
      </div>

      <span className="text-[12px] font-medium flex-shrink-0" style={{ color: isMe ? 'rgba(255,255,255,0.8)' : 'var(--ios-gray)' }}>
        {fmt(duration)}
      </span>
    </div>
  );
}

export default function IOSChat({ chat, onBack, onVideoCall }: IOSChatProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: t,
      type: 'text',
      from: 'me',
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  const sendVoice = () => {
    setRecording(false);
    const msg: Message = {
      id: Date.now().toString(),
      type: 'voice',
      duration: Math.floor(Math.random() * 20) + 3,
      from: 'me',
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setMessages(prev => [...prev, msg]);
  };

  const groupByDate = (msgs: Message[]) => {
    return [{ date: 'Сегодня', msgs }];
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--ios-bg)' }}>
      {/* iOS Navigation Bar */}
      <div className="ios-navbar px-2 pt-12 pb-2 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2 py-1 rounded-lg active:opacity-60 transition-opacity"
          style={{ color: 'var(--ios-blue)' }}
        >
          <Icon name="ChevronLeft" size={24} />
          <span className="text-[17px]">Назад</span>
        </button>

        {/* Center: avatar + name */}
        <button className="flex-1 flex flex-col items-center active:opacity-70 transition-opacity">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white"
              style={{ background: chat.color }}
            >
              {chat.initials}
            </div>
            {chat.online && (
              <div
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{ background: 'var(--ios-green)' }}
              />
            )}
          </div>
          <span className="text-[12px] font-medium mt-0.5" style={{ color: 'var(--ios-label)' }}>
            {chat.name}
          </span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-60 transition-opacity"
            style={{ background: 'var(--ios-gray5)', color: 'var(--ios-blue)' }}
          >
            <Icon name="Phone" size={18} />
          </button>
          <button
            onClick={onVideoCall}
            className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-60 transition-opacity"
            style={{ background: 'var(--ios-gray5)', color: 'var(--ios-blue)' }}
          >
            <Icon name="Video" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3">
        {groupByDate(messages).map(group => (
          <div key={group.date}>
            {/* Date separator */}
            <div className="flex justify-center mb-4">
              <span
                className="text-[12px] px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.08)', color: 'var(--ios-gray)' }}
              >
                {group.date}
              </span>
            </div>

            {group.msgs.map((msg, i) => {
              const isMe = msg.from === 'me';
              const isFirst = i === 0 || group.msgs[i - 1].from !== msg.from;
              const isLast = i === group.msgs.length - 1 || group.msgs[i + 1].from !== msg.from;

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 mb-1 animate-ios-fade-in ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar for incoming */}
                  {!isMe && (
                    <div className="w-6 flex-shrink-0">
                      {isLast && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-white"
                          style={{ background: chat.color }}
                        >
                          {chat.initials.slice(0, 1)}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`max-w-[72%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    {msg.type === 'text' && (
                      <div className={`relative px-3 py-2 ${isMe ? 'bubble-out' : 'bubble-in'}`}>
                        <span className="text-[17px] leading-[1.35]">{msg.text}</span>
                      </div>
                    )}
                    {msg.type === 'voice' && (
                      <VoiceBubble duration={msg.duration || 10} isMe={isMe} />
                    )}

                    {/* Time + status */}
                    {isLast && (
                      <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[11px]" style={{ color: 'var(--ios-gray)' }}>{msg.time}</span>
                        {isMe && (
                          <Icon
                            name={msg.read ? 'CheckCheck' : 'Check'}
                            size={12}
                            style={{ color: msg.read ? 'var(--ios-blue)' : 'var(--ios-gray)' }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="px-3 py-2 flex items-end gap-2"
        style={{
          background: 'rgba(249,249,249,0.94)',
          backdropFilter: 'blur(20px)',
          borderTop: '0.5px solid var(--ios-separator)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
        }}
      >
        {/* + button */}
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5 flex-shrink-0 active:opacity-60"
          style={{ background: 'var(--ios-gray5)', color: 'var(--ios-blue)' }}
        >
          <Icon name="Plus" size={18} />
        </button>

        {/* Text input */}
        <div className="flex-1 relative">
          {recording ? (
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-[20px]"
              style={{ border: '1px solid var(--ios-red)', background: 'rgba(255,59,48,0.06)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[17px]" style={{ color: 'var(--ios-red)' }}>Запись...</span>
            </div>
          ) : (
            <textarea
              rows={1}
              placeholder="Сообщение"
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              className="w-full resize-none outline-none text-[17px] py-2.5 px-4 ios-input scrollbar-hide"
              style={{ maxHeight: 120, lineHeight: '1.4' }}
            />
          )}
        </div>

        {/* Send / mic */}
        {input.trim() ? (
          <button
            onClick={send}
            className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5 flex-shrink-0 active:scale-95 transition-transform"
            style={{ background: 'var(--ios-blue)' }}
          >
            <Icon name="ArrowUp" size={18} className="text-white" />
          </button>
        ) : (
          <button
            onMouseDown={() => setRecording(true)}
            onMouseUp={recording ? sendVoice : undefined}
            onTouchStart={() => setRecording(true)}
            onTouchEnd={recording ? sendVoice : undefined}
            className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5 flex-shrink-0 active:scale-95 transition-transform"
            style={{ background: recording ? 'var(--ios-red)' : 'var(--ios-gray5)', color: recording ? 'white' : 'var(--ios-blue)' }}
          >
            <Icon name="Mic" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
