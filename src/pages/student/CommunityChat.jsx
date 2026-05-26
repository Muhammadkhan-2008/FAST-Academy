import React, { useState } from 'react';
import { Search, MoreVertical, Paperclip, Send, UserPlus, X, CheckCheck, Hash, Mic, Smile, Phone, Video, Users, Lock } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const MOCK_CONTACTS = [
  { id: 'FST-9021', name: 'Prof. Alexander', role: 'Faculty', avatar: 'A', online: true, lastSeen: 'Just now' },
  { id: 'FST-8812', name: 'Sarah Connor', role: 'Scholar', avatar: 'S', online: false, lastSeen: '2h ago' },
  { id: 'FST-7104', name: 'John Doe', role: 'Scholar', avatar: 'J', online: true, lastSeen: 'Just now' },
];

const MOCK_GROUPS = [
  { id: 'GRP-101', name: 'CS-401 Study Group', isGroup: true, avatar: 'CS', members: 45 },
  { id: 'GRP-102', name: 'Neural Hackathon 26', isGroup: true, avatar: 'NH', members: 12 },
]

const MOCK_MESSAGES = {
  'FST-9021': [
    { text: 'Have you submitted the neural architecture proposal?', sender: 'FST-9021', time: '10:30 AM' },
    { text: 'Yes professor, I uploaded it to the workspace.', sender: 'me', time: '10:35 AM' },
    { text: 'Excellent. I will review it shortly.', sender: 'FST-9021', time: '10:36 AM' },
  ],
  'GRP-101': [
    { text: 'Who is ready for the mid-terms?', sender: 'Sarah', time: '09:00 AM' },
    { text: 'Still reviewing chapter 4.', sender: 'John', time: '09:05 AM' },
    { text: 'Let me know if you need the notes!', sender: 'me', time: '09:10 AM' },
  ]
};

const CommunityChat = () => {
  const { user } = useSchool();
  const [activeChat, setActiveChat] = useState(MOCK_CONTACTS[0]);
  const [chats, setChats] = useState([...MOCK_CONTACTS, ...MOCK_GROUPS]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  // Modals
  const [showNewChat, setShowNewChat] = useState(false);
  const [searchFastId, setSearchFastId] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const newMsg = { text: inputText, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
    }));
    setInputText('');
  };

  const handleStartNewChat = (e) => {
    e.preventDefault();
    if (searchFastId.trim() === '') return;
    
    const newContact = { id: searchFastId, name: `Scholar ${searchFastId}`, role: 'Scholar', avatar: searchFastId[0] || 'U', online: true, lastSeen: 'Just now' };
    setChats([newContact, ...chats]);
    setActiveChat(newContact);
    setSearchFastId('');
    setShowNewChat(false);
  };

  // WhatsApp Exact Colors
  const wa = {
    bgLeftHeader: '#f0f2f5',
    bgLeftSearch: '#ffffff',
    bgLeftSearchContainer: '#f0f2f5',
    bgLeftHover: '#f5f6f6',
    bgRightHeader: '#f0f2f5',
    bgRightInput: '#f0f2f5',
    bgChatRoom: '#efeae2',
    bubbleSent: '#d9fdd3',
    bubbleReceived: '#ffffff',
    textMain: '#111b21',
    textMuted: '#667781',
    textGreen: '#00a884',
    borderLight: '#e9edef'
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', background: 'white', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
      
      {/* 🟢 LEFT PANE: Chat List */}
      <div style={{ width: '400px', borderRight: `1px solid ${wa.borderLight}`, display: 'flex', flexDirection: 'column', background: 'white' }}>
        
        {/* Header */}
        <div style={{ padding: '0.6rem 1rem', background: wa.bgLeftHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dfe5e7', color: wa.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, overflow: 'hidden' }}>
              {user?.imageUrl ? <img src={user.imageUrl} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover'}}/> : (user?.name?.[0] || 'U')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: '#54656f' }}>
            <Users size={20} cursor="pointer" title="Communities" />
            <div onClick={() => setShowNewChat(true)} style={{ cursor: 'pointer' }} title="New Chat via FAST ID">
              <UserPlus size={20} />
            </div>
            <MoreVertical size={20} cursor="pointer" />
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '0.5rem 0.8rem', background: wa.bgLeftSearch }}>
          <div style={{ background: wa.bgLeftSearchContainer, display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.4rem 1rem', borderRadius: '8px' }}>
             <Search size={16} color="#54656f" />
             <input type="text" placeholder="Search or start new chat" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem', color: wa.textMain }} />
          </div>
        </div>

        {/* List */}
        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
          {chats.map((chat, idx) => {
            const msgs = messages[chat.id] || [];
            const lastMsg = msgs[msgs.length - 1];
            const isActive = activeChat?.id === chat.id;

            return (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                style={{ 
                  display: 'flex', alignItems: 'center', padding: '0 1rem', cursor: 'pointer',
                  background: isActive ? wa.bgLeftHover : 'white',
                }}
              >
                <div style={{ padding: '0.8rem 0', marginRight: '1rem' }}>
                  <div style={{ width: '49px', height: '49px', borderRadius: '50%', background: chat.isGroup ? '#dfe5e7' : '#dfe5e7', color: '#54656f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                    {chat.isGroup ? <Users size={24} /> : chat.avatar}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '0.8rem 0', borderBottom: idx !== chats.length - 1 ? `1px solid ${wa.borderLight}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.1rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 400, color: wa.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: lastMsg && lastMsg.sender === 'me' ? wa.textMuted : wa.textGreen }}>{lastMsg ? lastMsg.time : ''}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: wa.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </p>
                    {chat.id === 'GRP-101' && <span style={{ background: wa.textGreen, color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px', fontWeight: 700 }}>3</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 🟢 RIGHT PANE: Active Chat */}
      {activeChat ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: wa.bgChatRoom, position: 'relative' }}>
          
          {/* Header */}
          <div style={{ padding: '0.6rem 1rem', background: wa.bgRightHeader, borderLeft: `1px solid ${wa.borderLight}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dfe5e7', color: '#54656f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  {activeChat.isGroup ? <Users size={20} /> : activeChat.avatar}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <h3 style={{ fontSize: '1rem', fontWeight: 400, color: wa.textMain }}>{activeChat.name}</h3>
                 <p style={{ fontSize: '0.8rem', color: wa.textMuted }}>
                   {activeChat.isGroup ? `${activeChat.members} participants` : (activeChat.online ? 'online' : `last seen at ${activeChat.lastSeen}`)}
                 </p>
               </div>
             </div>
             <div style={{ display: 'flex', gap: '1.5rem', color: '#54656f', paddingRight: '0.5rem' }}>
               <Video size={20} cursor="pointer" />
               <Phone size={20} cursor="pointer" />
               <Search size={20} cursor="pointer" />
               <MoreVertical size={20} cursor="pointer" />
             </div>
          </div>

          {/* Messages Area */}
          {/* Default WhatsApp Web Doodle Pattern overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundSize: '400px', backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp-thumbnail.jpg")', pointerEvents: 'none' }} />
          
          <div className="custom-scrollbar" style={{ flex: 1, padding: '1rem 5%', overflowY: 'auto', position: 'relative', zIndex: 5 }}>
             <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ background: '#ffeecd', padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', color: '#54656f', boxShadow: '0 1px 0.5px rgba(11,20,26,.13)' }}>
                  Messages are end-to-end encrypted under FAST protocols.
                </span>
             </div>

             {(messages[activeChat.id] || []).map((msg, i) => {
               const isMe = msg.sender === 'me';
               return (
                 <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', marginBottom: '0.5rem' }}>
                   <div style={{ 
                     background: isMe ? wa.bubbleSent : wa.bubbleReceived, 
                     color: wa.textMain, 
                     padding: '0.4rem 0.5rem 0.2rem 0.6rem', 
                     borderRadius: '7.5px', 
                     borderTopRightRadius: isMe && i === 0 ? '0px' : '7.5px',
                     borderTopLeftRadius: !isMe && i === 0 ? '0px' : '7.5px',
                     maxWidth: '65%',
                     boxShadow: '0 1px 0.5px rgba(11,20,26,.13)',
                     position: 'relative'
                   }}>
                      {!isMe && activeChat.isGroup && (
                        <span style={{ display: 'block', fontSize: '0.8rem', color: wa.textGreen, fontWeight: 500, marginBottom: '0.2rem' }}>
                          {msg.sender}
                        </span>
                      )}
                      <span style={{ fontSize: '0.9rem', lineHeight: 1.4, display: 'inline-block', paddingRight: isMe ? '45px' : '35px' }}>
                        {msg.text}
                      </span>
                      <div style={{ position: 'absolute', right: '0.4rem', bottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                         <span style={{ fontSize: '0.65rem', color: wa.textMuted }}>{msg.time}</span>
                         {isMe && <CheckCheck size={14} color="#53bdeb" />}
                      </div>
                   </div>
                 </div>
               )
             })}
          </div>

          {/* Input Area */}
          <div style={{ padding: '0.6rem 1rem', background: wa.bgRightInput, display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '1rem', color: '#54656f' }}>
              <Smile size={24} cursor="pointer" />
              <Paperclip size={24} cursor="pointer" />
            </div>
            <form onSubmit={handleSendMessage} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message" 
                style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '8px', border: 'none', outline: 'none', fontSize: '0.95rem', color: wa.textMain, background: 'white' }} 
              />
              <button type="submit" disabled={!inputText.trim()} style={{ background: 'transparent', border: 'none', marginLeft: '1rem', color: '#54656f', cursor: inputText.trim() ? 'pointer' : 'default', display: inputText.trim() ? 'block' : 'none' }}>
                <Send size={24} />
              </button>
            </form>
            {!inputText.trim() && (
               <div style={{ color: '#54656f', cursor: 'pointer' }}>
                 <Mic size={24} />
               </div>
            )}
          </div>

        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: wa.bgChatRoom, color: wa.textMuted, borderBottom: '6px solid #43c960' }}>
           <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" style={{ width: '100px', height: '100px', opacity: 0.3, marginBottom: '2rem' }} />
           <h2 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1rem', color: '#41525d' }}>WhatsApp for Web</h2>
           <p style={{ textAlign: 'center', maxWidth: '450px', lineHeight: 1.6, fontSize: '0.9rem' }}>Send and receive messages without keeping your phone online.<br/>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
           <p style={{ position: 'absolute', bottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}><Lock size={12}/> End-to-end encrypted</p>
        </div>
      )}

      {/* 🔴 NEW CHAT MODAL via FAST ID */}
      {showNewChat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
               <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: wa.textMain }}>New Chat</h2>
               <button onClick={() => setShowNewChat(false)} style={{ background: 'transparent', border: 'none', color: wa.textMuted, cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleStartNewChat}>
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.85rem', color: wa.textMuted, marginBottom: '1rem' }}>Enter the FAST ID of the scholar or faculty you want to message.</p>
                <div style={{ borderBottom: `2px solid ${wa.textGreen}` }}>
                  <input 
                    type="text" 
                    value={searchFastId}
                    onChange={(e) => setSearchFastId(e.target.value.toUpperCase())}
                    placeholder="FAST ID (e.g. FST-1234)" 
                    autoFocus
                    style={{ width: '100%', padding: '0.5rem 0', border: 'none', outline: 'none', fontSize: '1rem', color: wa.textMain }}
                  />
                </div>
              </div>
              <button type="submit" disabled={!searchFastId.trim()} style={{ width: '100%', padding: '0.8rem', background: wa.textGreen, color: 'white', borderRadius: '24px', border: 'none', fontWeight: 600, cursor: searchFastId.trim() ? 'pointer' : 'default', opacity: searchFastId.trim() ? 1 : 0.5 }}>
                Start Chat
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;
