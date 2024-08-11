import React, { useState } from 'react';
import { createPortal } from 'react-dom';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface MessageProps {
  message: string;
  type: MessageType;
  onClose: () => void;
}

const Message: React.FC<MessageProps> = ({ message, type, onClose }) => {
  const typeStyles: { [key in MessageType]: string } = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  return createPortal(
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-transparent border-none text-xl leading-none text-white focus:outline-none"
      >
        &times;
      </button>
    </div>,
    document.body
  );
};

interface UseMessageResult {
  showMessage: (message: string, type?: MessageType, duration?: number) => void;
  MessageComponent: React.FC;
}

const useMessage = (): UseMessageResult => {
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

  const MessageComponent: React.FC = () =>
    messageInfo && (
      <Message
        message={messageInfo.message}
        type={messageInfo.type}
        onClose={closeMessage}
      />
    );

  return { showMessage, MessageComponent };
};

export default function App() {
  const { showMessage, MessageComponent } = useMessage();

  return (
    <div className="p-5">
      <button
        onClick={() => showMessage('This is a success message!', 'success')}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Show Success Message
      </button>
      <button
        onClick={() => showMessage('This is an error message!', 'error')}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        Show Error Message
      </button>
      <button
        onClick={() => showMessage('This is an info message!', 'info')}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Show Info Message
      </button>
      <button
        onClick={() => showMessage('This is a warning message!', 'warning')}
        className="bg-yellow-500 text-black px-4 py-2 rounded ml-2"
      >
        Show Warning Message
      </button>

      <MessageComponent />
    </div>
  );
}
