import { createContext, useState, useContext } from 'react';

type ChatBadgeContextType = {
  badgeCount: number;
  setBadgeCount: (count: number) => void;
};

const ChatBadgeContext = createContext<ChatBadgeContextType | undefined>(undefined);

export const ChatBadgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badgeCount, setBadgeCount] = useState(0);

  return (
    <ChatBadgeContext.Provider value={{ badgeCount, setBadgeCount }}>
      {children}
    </ChatBadgeContext.Provider>
  );
};

export const useChatBadgeContext = (): ChatBadgeContextType => {
  const context = useContext(ChatBadgeContext);
  if (!context) {
    throw new Error('useChatBadge must be used within a ChatBadgeProvider');
  }
  return context;
};
