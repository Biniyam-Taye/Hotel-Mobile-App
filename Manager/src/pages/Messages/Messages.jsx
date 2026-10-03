import React, { useState, useEffect, useRef } from 'react';
import './Messages.css';
import { Search, Send, Paperclip, Smile, Loader, MessageSquare, MoreVertical } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // 1. Fetch Contacts (which will be the Owner/Admin in the manager's view)
  const loadContacts = async (silent = false) => {
    if (!silent) setLoadingContacts(true);
    try {
      const res = await fetch(`${API_BASE}/messages/contacts`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok && data?.data?.contacts) {
        setContacts(data.data.contacts);
        // Auto select first admin
        if (!activeContact && data.data.contacts.length > 0) {
          setActiveContact(data.data.contacts[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load contacts:', err);
    } finally {
      if (!silent) setLoadingContacts(false);
    }
  };

  // 2. Fetch Conversation
  const loadConversation = async (contactId, silent = false) => {
    if (!contactId) return;
    if (!silent) setLoadingChat(true);
    try {
      const res = await fetch(`${API_BASE}/messages/${contactId}`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok && data?.data?.messages) {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.error('Failed to load conversation:', err);
    } finally {
      if (!silent) setLoadingChat(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Poll conversation every 3 seconds
  useEffect(() => {
    if (!activeContact) return;
    loadConversation(activeContact._id, true);

    const interval = setInterval(() => {
      loadContacts(true);
      loadConversation(activeContact._id, true);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!msgInput.trim() || !activeContact) return;

    const textToSend = msgInput.trim();
    setMsgInput('');

    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          recipientId: activeContact._id,
          text: textToSend,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.data?.message) {
        setMessages((prev) => [...prev, data.data.message]);
        loadContacts(true);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  const getAvatarLetter = (c) =>
    ((c.firstName?.[0] || '') + (c.lastName?.[0] || '')).toUpperCase() || '?';

  const formatMsgTime = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="manager-chat-container">
      {/* Sidebar for Contacts */}
      <div className="manager-chat-sidebar">
        <div className="manager-chat-sidebar-header">
          <h2 className="font-semibold text-lg" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} style={{ color: '#2563eb' }} />
            <span>Messages</span>
          </h2>
          <div className="manager-chat-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search admin/owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="manager-chat-contacts-list">
          {loadingContacts && contacts.length === 0 ? (
            <div className="chat-loading-placeholder">
              <Loader size={20} className="spin" />
              <span>Loading owners...</span>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="chat-empty-placeholder">No admins found</div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact._id}
                className={`manager-chat-contact-item ${activeContact?._id === contact._id ? 'active' : ''}`}
                onClick={() => setActiveContact(contact)}
              >
                <div className="contact-avatar-wrapper">
                  <div className="contact-avatar">
                    {getAvatarLetter(contact)}
                  </div>
                  {contact.online && <div className="online-dot" />}
                </div>
                <div className="contact-info">
                  <div className="contact-top">
                    <span className="contact-name">
                      {contact.firstName} {contact.lastName}
                    </span>
                    <span className="contact-time">
                      {contact.lastMessageTime ? formatMsgTime(contact.lastMessageTime) : ''}
                    </span>
                  </div>
                  <div className="contact-bottom">
                    <span className="contact-lastmsg">
                      {contact.lastMessage || 'Start a conversation'}
                    </span>
                    {contact.unreadCount > 0 && (
                      <span className="contact-unread">{contact.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="manager-chat-area">
        {activeContact ? (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="contact-avatar-wrapper small">
                  <div className="contact-avatar">
                    {getAvatarLetter(activeContact)}
                  </div>
                  {activeContact.online && <div className="online-dot" />}
                </div>
                <div>
                  <div className="font-semibold">
                    {activeContact.firstName} {activeContact.lastName}
                  </div>
                  <div className="text-xs text-muted" style={{ textTransform: 'capitalize' }}>
                    {activeContact.role === 'admin' ? 'Hotel Owner' : activeContact.role}
                  </div>
                </div>
              </div>
              <button className="icon-btn">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {loadingChat && messages.length === 0 ? (
                <div className="chat-loading-placeholder">
                  <Loader size={24} className="spin" />
                  <span>Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="chat-empty-placeholder">
                  No messages yet. Say hello to the hotel owner!
                </div>
              ) : (
                messages.map((msg) => {
                  const currentUser = JSON.parse(localStorage.getItem('user'));
                  const msgIsMine = msg.sender === currentUser?.id || msg.sender === currentUser?._id;

                  return (
                    <div
                      key={msg._id}
                      className={`chat-bubble-wrapper ${msgIsMine ? 'mine' : 'theirs'}`}
                    >
                      <div className="chat-bubble">
                        <p>{msg.text}</p>
                        <span className="chat-time">{formatMsgTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <button type="button" className="icon-btn text-muted">
                <Paperclip size={20} />
              </button>
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  required
                />
                <button type="button" className="icon-btn text-muted">
                  <Smile size={20} />
                </button>
              </div>
              <button type="submit" className="chat-send-btn">
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="chat-select-placeholder">
            <h3>Select the hotel owner to start messaging</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
