// // src/pages/Login.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Mail, Lock, Hotel, Eye, EyeOff } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('reception@hotel.com');
//   const [password, setPassword] = useState('password123');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await login(email, password);
//       if (response.user.role === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate('/reception');
//       }
//     } catch (err) {
//       setError(err.message || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
//             <Hotel className="w-12 h-12 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-white mt-4">AI Hotel System</h1>
//           <p className="text-blue-100 mt-1">Sign in to your dashboard</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-500/20 border border-red-400/30 text-white px-4 py-2 rounded-xl text-sm">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-blue-50 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>

//           <div className="text-center text-white/60 text-sm mt-4">
//             <p>Demo Credentials:</p>
//             <p className="text-white/80">
//               <span className="font-medium">Admin:</span> admin@hotel.com / password123
//             </p>
//             <p className="text-white/80">
//               <span className="font-medium">Reception:</span> reception@hotel.com / password123
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;