import { useState, useEffect } from 'react';
import { Chat } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface IOSVideoCallProps {
  chat: Chat;
  onEnd: () => void;
}

export default function IOSVideoCall({ chat, onEnd }: IOSVideoCallProps) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div
      className="flex flex-col h-full relative animate-ios-fade-in"
      style={{ background: '#1C1C1E' }}
    >
      {/* Fake remote video — gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${chat.color}55 0%, #1C1C1E 60%)`,
        }}
      />

      {/* Top info */}
      <div className="relative z-10 flex flex-col items-center pt-16 gap-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-[32px] font-semibold text-white mb-2"
          style={{ background: chat.color }}
        >
          {chat.initials}
        </div>
        <h2 className="text-[28px] font-semibold text-white">{chat.name}</h2>
        <p className="text-[17px] text-white/70">{fmt(duration)}</p>
      </div>

      {/* Self preview (picture-in-picture) */}
      <div
        className="absolute top-16 right-4 w-24 h-36 rounded-2xl overflow-hidden z-20"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)' }}
      >
        {cameraOff ? (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="VideoOff" size={28} className="text-white/50" />
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))` }}
          >
            <span className="text-white/40 text-[11px] text-center px-2">Ваша камера</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 px-8">
        <div className="flex items-center justify-around">
          {/* Mute */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ background: muted ? 'var(--ios-blue)' : 'rgba(255,255,255,0.2)' }}
            >
              <Icon name={muted ? 'MicOff' : 'Mic'} size={24} className="text-white" />
            </button>
            <span className="text-[12px] text-white/70">{muted ? 'Вкл. звук' : 'Выкл. звук'}</span>
          </div>

          {/* End call */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onEnd}
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95 animate-call-ring"
              style={{ background: 'var(--ios-red)' }}
            >
              <Icon name="PhoneOff" size={30} className="text-white" />
            </button>
            <span className="text-[12px] text-white/70">Завершить</span>
          </div>

          {/* Camera */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setCameraOff(!cameraOff)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ background: cameraOff ? 'var(--ios-blue)' : 'rgba(255,255,255,0.2)' }}
            >
              <Icon name={cameraOff ? 'VideoOff' : 'Video'} size={24} className="text-white" />
            </button>
            <span className="text-[12px] text-white/70">{cameraOff ? 'Вкл. камеру' : 'Выкл. камеру'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
