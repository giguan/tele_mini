import React, { createContext, useContext, useState, ReactNode } from 'react';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessageContextProps {
  showMessage: (message: string, type?: MessageType, duration?: number) => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const useMessage = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messageInfo, setMessageInfo] = useState<{ message: string; type: MessageType } | null>(null);

  const showMessage = (message: string, type: MessageType = 'info', duration: number = 3000) => {
    setMessageInfo({ message, type });

    // 자동으로 메시지를 닫음
    setTimeout(() => {
      setMessageInfo(null);
    }, duration);
  };

  const closeMessage = () => {
    setMessageInfo(null);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {messageInfo && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg bg-${messageInfo.type === 'success' ? 'green' : messageInfo.type === 'error' ? 'red' : messageInfo.type === 'warning' ? 'yellow' : 'blue'}-500 text-white transition-opacity duration-300`}
          role="alert"
        >
          <span>{messageInfo.message}</span>
          <button
            onClick={closeMessage}
            className="ml-4 bg-transparent border-none text-xl leading-none text-white focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}
    </MessageContext.Provider>
  );
};
