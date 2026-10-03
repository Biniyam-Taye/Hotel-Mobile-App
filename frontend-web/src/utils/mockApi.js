// // src/utils/mockApi.js
// import { mockUsers, mockRooms, mockBookings, mockRevenue, mockNotifications } from '../mocks/data';

// const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// export const mockApi = {
//   // ===== AUTH =====
//   login: async (email, password) => {
//     await delay(600);
//     const user = mockUsers.find(u => u.email === email);
//     if (!user || password !== 'password123') {
//       throw new Error('Invalid email or password');
//     }
//     return { 
//       token: 'mock-jwt-token-' + Date.now(), 
//       user: { ...user } 
//     };
//   },

//   // ===== RECEPTION DASHBOARD =====
//   getTodayBookings: async () => {
//     await delay();
//     return mockBookings;
//   },

//   getRooms: async () => {
//     await delay();
//     return mockRooms;
//   },

//   getRoomStats: async () => {
//     await delay();
//     const total = mockRooms.length;
//     const available = mockRooms.filter(r => r.status === 'Available').length;
//     const occupied = mockRooms.filter(r => r.status === 'Occupied').length;
//     const maintenance = mockRooms.filter(r => r.status === 'Maintenance').length;
//     return { total, available, occupied, maintenance };
//   },

//   checkIn: async (bookingId, roomNumber) => {
//     await delay(800);
//     const booking = mockBookings.find(b => b.id === bookingId);
//     if (!booking) throw new Error('Booking not found');
//     booking.status = 'Checked In';
//     const room = mockRooms.find(r => r.number === roomNumber);
//     if (room) room.status = 'Occupied';
//     return { success: true, message: `Checked in to room ${roomNumber}` };
//   },

//   checkOut: async (bookingId) => {
//     await delay(800);
//     const booking = mockBookings.find(b => b.id === bookingId);
//     if (!booking) throw new Error('Booking not found');
//     booking.status = 'Checked Out';
//     const room = mockRooms.find(r => r.number === booking.roomNumber);
//     if (room) room.status = 'Available';
//     return { success: true, message: `Checked out from room ${booking.roomNumber}` };
//   },

//   // ===== ADMIN DASHBOARD =====
//   getRevenue: async () => {
//     await delay();
//     return mockRevenue;
//   },

//   getNotifications: async () => {
//     await delay();
//     return mockNotifications;
//   },

//   getAllUsers: async () => {
//     await delay();
//     return mockUsers;
//   },

//   updateRoom: async (roomId, updates) => {
//     await delay();
//     const room = mockRooms.find(r => r.id === roomId);
//     if (!room) throw new Error('Room not found');
//     Object.assign(room, updates);
//     return { success: true, room };
//   },

//   deleteBooking: async (bookingId) => {
//     await delay();
//     const index = mockBookings.findIndex(b => b.id === bookingId);
//     if (index === -1) throw new Error('Booking not found');
//     mockBookings.splice(index, 1);
//     return { success: true };
//   },
// };