import React, { useState } from 'react';
import './Messages.css';
import { Search, MoreVertical, Paperclip, Send, Smile } from 'lucide-react';

const mockContacts = [
  { id: 1, name: 'Alice Smith', role: 'Hotel Manager', lastMsg: 'The new supplies arrived today.', time: '10:42 AM', unread: 2, online: true },
  { id: 2, name: 'Bob Johnson', role: 'Front Desk', lastMsg: 'Can you approve my leave request?', time: 'Yesterday', unread: 0, online: false },
  { id: 3, name: 'Charlie Davis', role: 'Housekeeping', lastMsg: 'Room 304 is ready for inspection.', time: 'Yesterday', unread: 0, online: true },
];

const mockMessages = [
  { id: 1, sender: 'Alice Smith', text: 'Hi, I sent the monthly report.', time: '10:30 AM', isMine: false },
  { id: 2, sender: 'Me', text: 'Thanks Alice, I will review it shortly.', time: '10:35 AM', isMine: true },
  { id: 3, sender: 'Alice Smith', text: 'The new supplies arrived today.', time: '10:42 AM', isMine: false },
];

const Messages = () => {
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="messages-container">
      {/* Sidebar for Contacts */}
      <div className="msg-sidebar">
        <div className="msg-sidebar-header">
          <h2 className="font-semibold text-lg">Messages</h2>
          <div className="msg-search">
            <Search size={16} className="text-light" />
            <input type="text" placeholder="Search messages..." />
          </div>
        </div>

        <div className="msg-contacts-list">
          {mockContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`msg-contact-item ${activeContact.id === contact.id ? 'active' : ''}`}
              onClick={() => setActiveContact(contact)}
            >
              <div className="contact-avatar">
                {contact.name.charAt(0)}
                {contact.online && <div className="online-dot"></div>}
              </div>
              <div className="contact-info">
                <div className="contact-top">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.time}</span>
                </div>
                <div className="contact-bottom">
                  <span className="contact-lastmsg">{contact.lastMsg}</span>
                  {contact.unread > 0 && <span className="contact-unread">{contact.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="msg-chat-area">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="contact-avatar small">
              {activeContact.name.charAt(0)}
              {activeContact.online && <div className="online-dot"></div>}
            </div>
            <div>
              <div className="font-semibold">{activeContact.name}</div>
              <div className="text-xs text-light">{activeContact.role}</div>
            </div>
          </div>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>

        <div className="chat-messages">
          <div className="chat-date-divider"><span>Today</span></div>
          {mockMessages.map(msg => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.isMine ? 'mine' : 'theirs'}`}>
              <div className="chat-bubble">
                <p>{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <button className="icon-btn text-light"><Paperclip size={20} /></button>
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
            />
            <button className="icon-btn text-light"><Smile size={20} /></button>
          </div>
          <button className="chat-send-btn"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
