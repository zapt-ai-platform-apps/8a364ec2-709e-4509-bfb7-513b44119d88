import React, { useState } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import { useAuth } from '@/shared/hooks/useAuth';
import 'stream-chat-react/dist/css/v2/index.css';

function ChatLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
      <span className="text-sm font-medium">Connecting...</span>
    </div>
  );
}

function CustomChannelHeader() {
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 m-0">Customer Support</h3>
    </div>
  );
}

const ChatWidget = () => {
  const { user } = useAuth();
  const { client, channel, connectChat, disconnectChat } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  if (!user) {
    return null;
  }

  const toggleChat = async () => {
    if (!isOpen) {
      setIsChatLoading(true);
      try {
        await connectChat();
        setIsOpen(true);
      } catch (error) {
        console.error('Error connecting chat:', error);
      } finally {
        setIsChatLoading(false);
      }
    } else {
      setIsOpen(false);
      await disconnectChat();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <button
        onClick={toggleChat}
        className="bg-primary-600 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center justify-center w-14 h-14"
        disabled={isChatLoading}
      >
        {isChatLoading ? (
          <ChatLoading />
        ) : isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {isOpen && client && channel && (
        <div className="mb-2 w-80 h-96 rounded-lg shadow-xl overflow-hidden bg-white">
          <Chat client={client} theme="messaging light">
            <Channel channel={channel}>
              <Window>
                <CustomChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;