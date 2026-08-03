// // src/components/common/Layout.jsx
// import { Outlet, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   LayoutDashboard, 
//   Hotel, 
//   Calendar, 
//   Users, 
//   LogOut, 
//   UserCog,
//   TrendingUp,
//   Bell
// } from 'lucide-react';

// const Layout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isAdmin = user?.role === 'admin';
//   const isReception = user?.role === 'reception';

//   const sidebarItems = isAdmin ? [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
//     { icon: Hotel, label: 'Rooms', path: '/admin/rooms' },
//     { icon: Users, label: 'Users', path: '/admin/users' },
//     { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics' },
//     { icon: UserCog, label: 'Settings', path: '/admin/settings' },
//   ] : [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/reception' },
//     { icon: Calendar, label: 'Bookings', path: '/reception/bookings' },
//     { icon: Hotel, label: 'Rooms', path: '/reception/rooms' },
//     { icon: Users, label: 'Guests', path: '/reception/guests' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
//         <div className="p-6 border-b border-gray-200">
//           <h1 className="text-2xl font-bold text-blue-600">🏨 AI Hotel</h1>
//           <p className="text-sm text-gray-500 mt-1 capitalize">{user?.role} Panel</p>
//         </div>
//         <nav className="flex-1 p-4 space-y-1">
//           {sidebarItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center gap-3 px-4 py-2">
//             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
//               {user?.name?.[0] || 'U'}
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">{user?.name}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 mt-2 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Welcome back, {user?.name} 👋
//           </h2>
//           <div className="flex items-center gap-4">
//             <button className="relative p-2 rounded-full hover:bg-gray-100">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;