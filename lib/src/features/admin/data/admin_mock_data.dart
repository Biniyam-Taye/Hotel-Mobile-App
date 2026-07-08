import 'dart:math';

/// Mock data for all Admin Dashboard screens.
/// Provides realistic sample data for UI development.
class AdminMockData {
  AdminMockData._();

  // ─── DASHBOARD KPIs ─────────────────────────────────────────────────
  static const double totalRevenue = 284750.00;
  static const double revenueTrend = 12.5;
  static const int totalBookings = 1247;
  static const double bookingsTrend = 8.3;
  static const double occupancyRate = 78.4;
  static const double occupancyTrend = -2.1;
  static const double avgRating = 4.7;
  static const double ratingTrend = 0.3;
  static const int totalCustomers = 3842;
  static const int totalStaff = 156;
  static const int totalRooms = 342;
  static const int availableRooms = 74;

  // ─── MONTHLY REVENUE DATA ───────────────────────────────────────────
  static const List<Map<String, dynamic>> monthlyRevenue = [
    {'month': 'Jan', 'revenue': 18500},
    {'month': 'Feb', 'revenue': 22300},
    {'month': 'Mar', 'revenue': 19800},
    {'month': 'Apr', 'revenue': 25600},
    {'month': 'May', 'revenue': 28900},
    {'month': 'Jun', 'revenue': 32100},
    {'month': 'Jul', 'revenue': 35400},
    {'month': 'Aug', 'revenue': 31200},
    {'month': 'Sep', 'revenue': 27800},
    {'month': 'Oct', 'revenue': 29500},
    {'month': 'Nov', 'revenue': 33600},
    {'month': 'Dec', 'revenue': 38200},
  ];

  // ─── WEEKLY BOOKINGS ────────────────────────────────────────────────
  static const List<Map<String, dynamic>> weeklyBookings = [
    {'day': 'Mon', 'bookings': 32},
    {'day': 'Tue', 'bookings': 28},
    {'day': 'Wed', 'bookings': 45},
    {'day': 'Thu', 'bookings': 38},
    {'day': 'Fri', 'bookings': 52},
    {'day': 'Sat', 'bookings': 61},
    {'day': 'Sun', 'bookings': 48},
  ];

  // ─── ROOM AVAILABILITY BY TYPE ──────────────────────────────────────
  static const List<Map<String, dynamic>> roomAvailability = [
    {'type': 'Standard', 'occupied': 85, 'available': 15, 'maintenance': 4},
    {'type': 'Deluxe', 'occupied': 62, 'available': 28, 'maintenance': 2},
    {'type': 'Suite', 'occupied': 38, 'available': 12, 'maintenance': 1},
    {'type': 'Presidential', 'occupied': 8, 'available': 4, 'maintenance': 0},
    {'type': 'Villa', 'occupied': 14, 'available': 6, 'maintenance': 1},
  ];

  // ─── REVENUE BY SOURCE ──────────────────────────────────────────────
  static const List<Map<String, dynamic>> revenueSources = [
    {'source': 'Room Bookings', 'amount': 198325, 'percentage': 69.7},
    {'source': 'Restaurant', 'amount': 42712, 'percentage': 15.0},
    {'source': 'Spa & Wellness', 'amount': 22780, 'percentage': 8.0},
    {'source': 'Events', 'amount': 14237, 'percentage': 5.0},
    {'source': 'Other', 'amount': 6696, 'percentage': 2.3},
  ];

  // ─── HOTELS ─────────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> hotels = [
    {
      'id': 'h1',
      'name': 'LuxeStay Grand Palace',
      'location': 'Addis Ababa, Ethiopia',
      'rooms': 120,
      'rating': 4.8,
      'occupancy': 82,
      'status': 'Active',
      'revenue': 89500,
    },
    {
      'id': 'h2',
      'name': 'LuxeStay Marina Resort',
      'location': 'Hawassa, Ethiopia',
      'rooms': 85,
      'rating': 4.6,
      'occupancy': 75,
      'status': 'Active',
      'revenue': 67200,
    },
    {
      'id': 'h3',
      'name': 'LuxeStay Mountain Lodge',
      'location': 'Lalibela, Ethiopia',
      'rooms': 45,
      'rating': 4.9,
      'occupancy': 91,
      'status': 'Active',
      'revenue': 52300,
    },
    {
      'id': 'h4',
      'name': 'LuxeStay Safari Camp',
      'location': 'Omo Valley, Ethiopia',
      'rooms': 30,
      'rating': 4.7,
      'occupancy': 68,
      'status': 'Active',
      'revenue': 38900,
    },
    {
      'id': 'h5',
      'name': 'LuxeStay City Center',
      'location': 'Dire Dawa, Ethiopia',
      'rooms': 62,
      'rating': 4.4,
      'occupancy': 55,
      'status': 'Maintenance',
      'revenue': 36850,
    },
  ];

  // ─── ROOMS ──────────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> rooms = [
    {'id': 'r1', 'number': '101', 'hotel': 'Grand Palace', 'type': 'Standard', 'floor': 1, 'price': 120, 'status': 'Occupied', 'guest': 'John Smith'},
    {'id': 'r2', 'number': '102', 'hotel': 'Grand Palace', 'type': 'Standard', 'floor': 1, 'price': 120, 'status': 'Available', 'guest': ''},
    {'id': 'r3', 'number': '201', 'hotel': 'Grand Palace', 'type': 'Deluxe', 'floor': 2, 'price': 220, 'status': 'Occupied', 'guest': 'Sarah Johnson'},
    {'id': 'r4', 'number': '202', 'hotel': 'Grand Palace', 'type': 'Deluxe', 'floor': 2, 'price': 220, 'status': 'Maintenance', 'guest': ''},
    {'id': 'r5', 'number': '301', 'hotel': 'Grand Palace', 'type': 'Suite', 'floor': 3, 'price': 450, 'status': 'Occupied', 'guest': 'Michael Chen'},
    {'id': 'r6', 'number': '302', 'hotel': 'Grand Palace', 'type': 'Suite', 'floor': 3, 'price': 450, 'status': 'Available', 'guest': ''},
    {'id': 'r7', 'number': '401', 'hotel': 'Grand Palace', 'type': 'Presidential', 'floor': 4, 'price': 850, 'status': 'Occupied', 'guest': 'Emma Wilson'},
    {'id': 'r8', 'number': '103', 'hotel': 'Marina Resort', 'type': 'Standard', 'floor': 1, 'price': 95, 'status': 'Available', 'guest': ''},
    {'id': 'r9', 'number': '204', 'hotel': 'Marina Resort', 'type': 'Deluxe', 'floor': 2, 'price': 185, 'status': 'Occupied', 'guest': 'Lisa Park'},
    {'id': 'r10', 'number': '305', 'hotel': 'Mountain Lodge', 'type': 'Villa', 'floor': 1, 'price': 680, 'status': 'Available', 'guest': ''},
  ];

  // ─── BOOKINGS ───────────────────────────────────────────────────────
  static List<Map<String, dynamic>> get bookings => [
    {'id': 'BK-001', 'guest': 'John Smith', 'hotel': 'Grand Palace', 'room': '101', 'checkIn': DateTime(2026, 7, 5), 'checkOut': DateTime(2026, 7, 10), 'status': 'Active', 'amount': 600.0, 'paymentMethod': 'Visa'},
    {'id': 'BK-002', 'guest': 'Sarah Johnson', 'hotel': 'Grand Palace', 'room': '201', 'checkIn': DateTime(2026, 7, 8), 'checkOut': DateTime(2026, 7, 12), 'status': 'Upcoming', 'amount': 880.0, 'paymentMethod': 'Mastercard'},
    {'id': 'BK-003', 'guest': 'Michael Chen', 'hotel': 'Grand Palace', 'room': '301', 'checkIn': DateTime(2026, 7, 1), 'checkOut': DateTime(2026, 7, 7), 'status': 'Completed', 'amount': 2700.0, 'paymentMethod': 'Apple Pay'},
    {'id': 'BK-004', 'guest': 'Emma Wilson', 'hotel': 'Grand Palace', 'room': '401', 'checkIn': DateTime(2026, 7, 6), 'checkOut': DateTime(2026, 7, 9), 'status': 'Active', 'amount': 2550.0, 'paymentMethod': 'Visa'},
    {'id': 'BK-005', 'guest': 'Lisa Park', 'hotel': 'Marina Resort', 'room': '204', 'checkIn': DateTime(2026, 7, 3), 'checkOut': DateTime(2026, 7, 6), 'status': 'Completed', 'amount': 555.0, 'paymentMethod': 'TeleBirr'},
    {'id': 'BK-006', 'guest': 'David Brown', 'hotel': 'Mountain Lodge', 'room': '105', 'checkIn': DateTime(2026, 7, 10), 'checkOut': DateTime(2026, 7, 15), 'status': 'Upcoming', 'amount': 1250.0, 'paymentMethod': 'CBE'},
    {'id': 'BK-007', 'guest': 'Anna Martinez', 'hotel': 'Safari Camp', 'room': '201', 'checkIn': DateTime(2026, 6, 28), 'checkOut': DateTime(2026, 7, 2), 'status': 'Cancelled', 'amount': 980.0, 'paymentMethod': 'Visa'},
    {'id': 'BK-008', 'guest': 'James Lee', 'hotel': 'City Center', 'room': '302', 'checkIn': DateTime(2026, 7, 12), 'checkOut': DateTime(2026, 7, 14), 'status': 'Upcoming', 'amount': 380.0, 'paymentMethod': 'Google Pay'},
  ];

  // ─── CUSTOMERS ──────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> customers = [
    {'id': 'c1', 'name': 'John Smith', 'email': 'john@example.com', 'phone': '+1 234 567 890', 'bookings': 12, 'totalSpent': 8400, 'tier': 'Gold', 'joined': '2024-03-15', 'status': 'Active'},
    {'id': 'c2', 'name': 'Sarah Johnson', 'email': 'sarah@example.com', 'phone': '+1 345 678 901', 'bookings': 8, 'totalSpent': 5200, 'tier': 'Silver', 'joined': '2024-06-22', 'status': 'Active'},
    {'id': 'c3', 'name': 'Michael Chen', 'email': 'michael@example.com', 'phone': '+86 123 456 7890', 'bookings': 25, 'totalSpent': 32000, 'tier': 'Platinum', 'joined': '2023-11-08', 'status': 'Active'},
    {'id': 'c4', 'name': 'Emma Wilson', 'email': 'emma@example.com', 'phone': '+44 789 012 345', 'bookings': 5, 'totalSpent': 4100, 'tier': 'Silver', 'joined': '2025-01-10', 'status': 'Active'},
    {'id': 'c5', 'name': 'Lisa Park', 'email': 'lisa@example.com', 'phone': '+82 10 1234 5678', 'bookings': 18, 'totalSpent': 15600, 'tier': 'Gold', 'joined': '2024-01-20', 'status': 'Active'},
    {'id': 'c6', 'name': 'David Brown', 'email': 'david@example.com', 'phone': '+1 456 789 012', 'bookings': 3, 'totalSpent': 1890, 'tier': 'Silver', 'joined': '2025-05-12', 'status': 'Inactive'},
  ];

  // ─── RECEPTIONISTS ──────────────────────────────────────────────────
  static const List<Map<String, dynamic>> receptionists = [
    {'id': 'rc1', 'name': 'Helen Tadesse', 'hotel': 'Grand Palace', 'shift': 'Morning', 'status': 'On Duty', 'email': 'helen@luxestay.com', 'phone': '+251 911 123 456', 'rating': 4.9},
    {'id': 'rc2', 'name': 'Abel Kebede', 'hotel': 'Grand Palace', 'shift': 'Evening', 'status': 'Off Duty', 'email': 'abel@luxestay.com', 'phone': '+251 922 234 567', 'rating': 4.7},
    {'id': 'rc3', 'name': 'Meron Haile', 'hotel': 'Marina Resort', 'shift': 'Morning', 'status': 'On Duty', 'email': 'meron@luxestay.com', 'phone': '+251 933 345 678', 'rating': 4.8},
    {'id': 'rc4', 'name': 'Solomon Girma', 'hotel': 'Mountain Lodge', 'shift': 'Night', 'status': 'On Duty', 'email': 'solomon@luxestay.com', 'phone': '+251 944 456 789', 'rating': 4.6},
    {'id': 'rc5', 'name': 'Tigist Alemu', 'hotel': 'City Center', 'shift': 'Morning', 'status': 'On Leave', 'email': 'tigist@luxestay.com', 'phone': '+251 955 567 890', 'rating': 4.5},
  ];

  // ─── STAFF ──────────────────────────────────────────────────────────
  static const List<Map<String, dynamic>> staff = [
    {'id': 's1', 'name': 'Abebe Tesfaye', 'role': 'General Manager', 'department': 'Management', 'hotel': 'Grand Palace', 'hireDate': '2022-01-15', 'status': 'Active', 'salary': 5500},
    {'id': 's2', 'name': 'Fatima Ahmed', 'role': 'Head Chef', 'department': 'Kitchen', 'hotel': 'Grand Palace', 'hireDate': '2022-06-20', 'status': 'Active', 'salary': 3800},
    {'id': 's3', 'name': 'Daniel Mekonnen', 'role': 'Housekeeping Manager', 'department': 'Housekeeping', 'hotel': 'Marina Resort', 'hireDate': '2023-03-10', 'status': 'Active', 'salary': 2800},
    {'id': 's4', 'name': 'Sara Bekele', 'role': 'Spa Therapist', 'department': 'Spa & Wellness', 'hotel': 'Grand Palace', 'hireDate': '2023-08-01', 'status': 'Active', 'salary': 2200},
    {'id': 's5', 'name': 'Yohannes Desta', 'role': 'Security Guard', 'department': 'Security', 'hotel': 'Mountain Lodge', 'hireDate': '2024-01-05', 'status': 'Active', 'salary': 1800},
    {'id': 's6', 'name': 'Lidya Gebre', 'role': 'Event Coordinator', 'department': 'Events', 'hotel': 'Grand Palace', 'hireDate': '2023-11-15', 'status': 'On Leave', 'salary': 3200},
    {'id': 's7', 'name': 'Tewodros Hailu', 'role': 'Maintenance Tech', 'department': 'Maintenance', 'hotel': 'City Center', 'hireDate': '2024-04-20', 'status': 'Active', 'salary': 2000},
  ];

  // ─── REVIEWS ────────────────────────────────────────────────────────
  static List<Map<String, dynamic>> get reviews => [
    {'id': 'rv1', 'guest': 'John Smith', 'hotel': 'Grand Palace', 'rating': 5.0, 'comment': 'Absolutely stunning hotel! The service was impeccable and the room was beyond expectations.', 'date': DateTime(2026, 7, 5), 'responded': true},
    {'id': 'rv2', 'guest': 'Sarah Johnson', 'hotel': 'Grand Palace', 'rating': 4.0, 'comment': 'Great stay overall. The breakfast buffet was amazing but the pool area could use more seating.', 'date': DateTime(2026, 7, 3), 'responded': false},
    {'id': 'rv3', 'guest': 'Michael Chen', 'hotel': 'Mountain Lodge', 'rating': 5.0, 'comment': 'One of the best experiences I have had. The mountain views are breathtaking and the staff is incredibly friendly.', 'date': DateTime(2026, 7, 1), 'responded': true},
    {'id': 'rv4', 'guest': 'Emma Wilson', 'hotel': 'Marina Resort', 'rating': 3.0, 'comment': 'Decent hotel but the WiFi was unreliable and the check-in took too long.', 'date': DateTime(2026, 6, 28), 'responded': false},
    {'id': 'rv5', 'guest': 'Lisa Park', 'hotel': 'Grand Palace', 'rating': 5.0, 'comment': 'Perfect in every way! Will definitely be coming back. The spa treatments were heavenly.', 'date': DateTime(2026, 6, 25), 'responded': true},
    {'id': 'rv6', 'guest': 'David Brown', 'hotel': 'Safari Camp', 'rating': 4.0, 'comment': 'Unique experience! The wildlife tours were incredible. Food could be more varied.', 'date': DateTime(2026, 6, 22), 'responded': false},
  ];

  // ─── PROMOTIONS ─────────────────────────────────────────────────────
  static List<Map<String, dynamic>> get promotions => [
    {'id': 'p1', 'code': 'SUMMER25', 'name': 'Summer Special', 'discount': 25, 'type': 'Percentage', 'usageCount': 142, 'usageLimit': 500, 'validFrom': DateTime(2026, 6, 1), 'validUntil': DateTime(2026, 8, 31), 'status': 'Active'},
    {'id': 'p2', 'code': 'WELCOME10', 'name': 'New User Welcome', 'discount': 10, 'type': 'Percentage', 'usageCount': 389, 'usageLimit': 0, 'validFrom': DateTime(2026, 1, 1), 'validUntil': DateTime(2026, 12, 31), 'status': 'Active'},
    {'id': 'p3', 'code': 'FLAT50', 'name': 'Flat \$50 Off', 'discount': 50, 'type': 'Fixed', 'usageCount': 78, 'usageLimit': 200, 'validFrom': DateTime(2026, 7, 1), 'validUntil': DateTime(2026, 7, 31), 'status': 'Active'},
    {'id': 'p4', 'code': 'LOYALTY20', 'name': 'Loyalty Reward', 'discount': 20, 'type': 'Percentage', 'usageCount': 256, 'usageLimit': 300, 'validFrom': DateTime(2026, 3, 1), 'validUntil': DateTime(2026, 6, 30), 'status': 'Expired'},
    {'id': 'p5', 'code': 'WEEKEND15', 'name': 'Weekend Getaway', 'discount': 15, 'type': 'Percentage', 'usageCount': 0, 'usageLimit': 100, 'validFrom': DateTime(2026, 8, 1), 'validUntil': DateTime(2026, 9, 30), 'status': 'Scheduled'},
  ];

  // ─── ROLES & PERMISSIONS ────────────────────────────────────────────
  static const List<Map<String, dynamic>> roles = [
    {'id': 'role1', 'name': 'Super Admin', 'description': 'Full system access', 'members': 2, 'permissions': ['all']},
    {'id': 'role2', 'name': 'Hotel Manager', 'description': 'Manage hotel operations', 'members': 5, 'permissions': ['hotels', 'rooms', 'bookings', 'staff', 'reports']},
    {'id': 'role3', 'name': 'Receptionist', 'description': 'Front desk operations', 'members': 12, 'permissions': ['bookings', 'guests', 'rooms']},
    {'id': 'role4', 'name': 'Finance', 'description': 'Revenue and payments', 'members': 3, 'permissions': ['revenue', 'reports', 'payments']},
    {'id': 'role5', 'name': 'Marketing', 'description': 'Promotions and reviews', 'members': 4, 'permissions': ['promotions', 'reviews', 'notifications']},
    {'id': 'role6', 'name': 'Support', 'description': 'Customer support', 'members': 8, 'permissions': ['guests', 'bookings', 'reviews']},
  ];

  static const List<String> allPermissions = [
    'hotels', 'rooms', 'bookings', 'guests', 'staff',
    'revenue', 'reports', 'reviews', 'notifications',
    'promotions', 'roles', 'settings', 'logs', 'payments',
  ];

  // ─── ACTIVITY LOGS ──────────────────────────────────────────────────
  static List<Map<String, dynamic>> get activityLogs => [
    {'id': 'log1', 'user': 'Admin', 'action': 'Updated room price', 'target': 'Room 301 - Grand Palace', 'timestamp': DateTime(2026, 7, 8, 14, 30), 'type': 'update', 'ip': '192.168.1.1'},
    {'id': 'log2', 'user': 'Helen Tadesse', 'action': 'Checked in guest', 'target': 'John Smith - Room 101', 'timestamp': DateTime(2026, 7, 8, 13, 15), 'type': 'create', 'ip': '192.168.1.5'},
    {'id': 'log3', 'user': 'Admin', 'action': 'Created promotion', 'target': 'SUMMER25 - 25% off', 'timestamp': DateTime(2026, 7, 8, 11, 45), 'type': 'create', 'ip': '192.168.1.1'},
    {'id': 'log4', 'user': 'Abel Kebede', 'action': 'Processed payment', 'target': 'Booking BK-004 - \$2,550', 'timestamp': DateTime(2026, 7, 8, 10, 20), 'type': 'update', 'ip': '192.168.1.8'},
    {'id': 'log5', 'user': 'Admin', 'action': 'Disabled user account', 'target': 'David Brown (c6)', 'timestamp': DateTime(2026, 7, 7, 16, 50), 'type': 'delete', 'ip': '192.168.1.1'},
    {'id': 'log6', 'user': 'System', 'action': 'Automated backup completed', 'target': 'Database backup v2026.07.07', 'timestamp': DateTime(2026, 7, 7, 3, 0), 'type': 'system', 'ip': 'localhost'},
    {'id': 'log7', 'user': 'Meron Haile', 'action': 'Updated room status', 'target': 'Room 202 - Maintenance', 'timestamp': DateTime(2026, 7, 6, 15, 30), 'type': 'update', 'ip': '192.168.1.12'},
    {'id': 'log8', 'user': 'Admin', 'action': 'Added new staff member', 'target': 'Tewodros Hailu - Maintenance', 'timestamp': DateTime(2026, 7, 6, 9, 0), 'type': 'create', 'ip': '192.168.1.1'},
  ];

  // ─── NOTIFICATIONS (ADMIN) ──────────────────────────────────────────
  static List<Map<String, dynamic>> get adminNotifications => [
    {'id': 'n1', 'title': 'New Booking Alert', 'message': 'James Lee booked Room 302 at City Center for Jul 12-14', 'type': 'booking', 'timestamp': DateTime(2026, 7, 8, 14, 0), 'isRead': false},
    {'id': 'n2', 'title': 'Low Occupancy Warning', 'message': 'City Center hotel occupancy dropped below 60%', 'type': 'alert', 'timestamp': DateTime(2026, 7, 8, 10, 30), 'isRead': false},
    {'id': 'n3', 'title': 'New Review', 'message': 'Sarah Johnson left a 4-star review for Grand Palace', 'type': 'review', 'timestamp': DateTime(2026, 7, 7, 18, 45), 'isRead': true},
    {'id': 'n4', 'title': 'Payment Received', 'message': 'Payment of \$2,550 received for booking BK-004', 'type': 'payment', 'timestamp': DateTime(2026, 7, 7, 14, 20), 'isRead': true},
    {'id': 'n5', 'title': 'Staff Leave Request', 'message': 'Lidya Gebre requested leave from Jul 15-22', 'type': 'system', 'timestamp': DateTime(2026, 7, 6, 11, 0), 'isRead': true},
    {'id': 'n6', 'title': 'System Update', 'message': 'Scheduled maintenance on Jul 15 from 2:00-4:00 AM', 'type': 'system', 'timestamp': DateTime(2026, 7, 5, 9, 0), 'isRead': true},
  ];

  // ─── TRANSACTIONS ───────────────────────────────────────────────────
  static List<Map<String, dynamic>> get transactions => [
    {'id': 't1', 'description': 'Room Booking - BK-001', 'guest': 'John Smith', 'amount': 600.0, 'method': 'Visa', 'date': DateTime(2026, 7, 5), 'status': 'Completed'},
    {'id': 't2', 'description': 'Room Booking - BK-002', 'guest': 'Sarah Johnson', 'amount': 880.0, 'method': 'Mastercard', 'date': DateTime(2026, 7, 8), 'status': 'Pending'},
    {'id': 't3', 'description': 'Room Booking - BK-003', 'guest': 'Michael Chen', 'amount': 2700.0, 'method': 'Apple Pay', 'date': DateTime(2026, 7, 1), 'status': 'Completed'},
    {'id': 't4', 'description': 'Room Booking - BK-004', 'guest': 'Emma Wilson', 'amount': 2550.0, 'method': 'Visa', 'date': DateTime(2026, 7, 6), 'status': 'Completed'},
    {'id': 't5', 'description': 'Room Booking - BK-005', 'guest': 'Lisa Park', 'amount': 555.0, 'method': 'TeleBirr', 'date': DateTime(2026, 7, 3), 'status': 'Completed'},
    {'id': 't6', 'description': 'Refund - BK-007', 'guest': 'Anna Martinez', 'amount': -980.0, 'method': 'Visa', 'date': DateTime(2026, 7, 2), 'status': 'Refunded'},
  ];

  // ─── PAYMENT METHOD DISTRIBUTION ────────────────────────────────────
  static const List<Map<String, dynamic>> paymentMethods = [
    {'method': 'Visa', 'count': 412, 'percentage': 33.0},
    {'method': 'Mastercard', 'count': 287, 'percentage': 23.0},
    {'method': 'TeleBirr', 'count': 224, 'percentage': 18.0},
    {'method': 'CBE', 'count': 162, 'percentage': 13.0},
    {'method': 'Apple Pay', 'count': 99, 'percentage': 8.0},
    {'method': 'Google Pay', 'count': 63, 'percentage': 5.0},
  ];

  // ─── RATING DISTRIBUTION ────────────────────────────────────────────
  static const List<Map<String, dynamic>> ratingDistribution = [
    {'stars': 5, 'count': 524, 'percentage': 52.4},
    {'stars': 4, 'count': 312, 'percentage': 31.2},
    {'stars': 3, 'count': 108, 'percentage': 10.8},
    {'stars': 2, 'count': 38, 'percentage': 3.8},
    {'stars': 1, 'count': 18, 'percentage': 1.8},
  ];

  // ─── ADMIN PROFILE ──────────────────────────────────────────────────
  static const Map<String, dynamic> adminProfile = {
    'name': 'Biniyam Taye',
    'email': 'admin@luxestay.com',
    'phone': '+251 911 000 000',
    'role': 'Super Admin',
    'avatar': '',
    'joined': '2023-01-01',
    'lastLogin': '2026-07-08 14:30',
    'twoFactorEnabled': true,
  };

  // ─── REPORT CARDS ───────────────────────────────────────────────────
  static const List<Map<String, dynamic>> reportCards = [
    {'title': 'Occupancy Report', 'description': 'Room occupancy rates across all hotels', 'icon': 'bed', 'lastGenerated': '2 hours ago', 'trend': 'up'},
    {'title': 'Revenue Report', 'description': 'Revenue breakdown by source and period', 'icon': 'revenue', 'lastGenerated': '1 hour ago', 'trend': 'up'},
    {'title': 'Guest Satisfaction', 'description': 'Customer reviews and satisfaction scores', 'icon': 'star', 'lastGenerated': '3 hours ago', 'trend': 'stable'},
    {'title': 'Staff Performance', 'description': 'Staff ratings and attendance metrics', 'icon': 'people', 'lastGenerated': '5 hours ago', 'trend': 'up'},
    {'title': 'Booking Trends', 'description': 'Booking patterns and forecasts', 'icon': 'calendar', 'lastGenerated': '30 min ago', 'trend': 'down'},
    {'title': 'Financial Summary', 'description': 'Expenses, profits, and tax overview', 'icon': 'finance', 'lastGenerated': '1 day ago', 'trend': 'up'},
  ];

  // ─── HELPER: GENERATE SPARKLINE DATA ────────────────────────────────
  static List<double> generateSparkline({int length = 7}) {
    final random = Random(42);
    return List.generate(length, (i) => 20 + random.nextDouble() * 80);
  }
}
