/// Mock data for the Receptionist App UI.
/// Contains realistic hotel front-desk data for demonstration purposes.
class ReceptionistMockData {
  ReceptionistMockData._();

  // ─── RECEPTIONIST INFO ──────────────────────────────────────────────
  static const Map<String, dynamic> currentReceptionist = {
    'name': 'Helen Tadesse',
    'hotel': 'LuxeStay Grand Palace',
    'shift': 'Morning (6:00 AM - 2:00 PM)',
    'rating': 4.9,
    'email': 'helen@luxestay.com',
    'phone': '+251 911 123 456',
    'employeeId': 'RC-001',
    'joinDate': '2024-03-15',
    'totalCheckIns': 1247,
    'avgRating': 4.9,
  };

  // ─── TODAY'S STATS ──────────────────────────────────────────────────
  static const Map<String, int> todayStats = {
    'checkIns': 8,
    'checkOuts': 5,
    'occupiedRooms': 92,
    'availableRooms': 28,
    'totalRooms': 120,
    'pendingRequests': 6,
  };

  // ─── ROOMS BY FLOOR ─────────────────────────────────────────────────
  static const List<Map<String, dynamic>> rooms = [
    // Floor 1
    {'number': '101', 'floor': 1, 'type': 'Standard', 'status': 'occupied', 'guest': 'John Smith', 'checkOut': '2026-07-10'},
    {'number': '102', 'floor': 1, 'type': 'Standard', 'status': 'available', 'guest': '', 'checkOut': ''},
    {'number': '103', 'floor': 1, 'type': 'Standard', 'status': 'occupied', 'guest': 'Maria Garcia', 'checkOut': '2026-07-09'},
    {'number': '104', 'floor': 1, 'type': 'Standard', 'status': 'maintenance', 'guest': '', 'checkOut': ''},
    {'number': '105', 'floor': 1, 'type': 'Standard', 'status': 'available', 'guest': '', 'checkOut': ''},
    {'number': '106', 'floor': 1, 'type': 'Standard', 'status': 'reserved', 'guest': 'Alex Wang', 'checkOut': '2026-07-12'},
    {'number': '107', 'floor': 1, 'type': 'Standard', 'status': 'occupied', 'guest': 'Fatima Ali', 'checkOut': '2026-07-08'},
    {'number': '108', 'floor': 1, 'type': 'Standard', 'status': 'occupied', 'guest': 'David Brown', 'checkOut': '2026-07-11'},
    // Floor 2
    {'number': '201', 'floor': 2, 'type': 'Deluxe', 'status': 'occupied', 'guest': 'Sarah Johnson', 'checkOut': '2026-07-12'},
    {'number': '202', 'floor': 2, 'type': 'Deluxe', 'status': 'maintenance', 'guest': '', 'checkOut': ''},
    {'number': '203', 'floor': 2, 'type': 'Deluxe', 'status': 'available', 'guest': '', 'checkOut': ''},
    {'number': '204', 'floor': 2, 'type': 'Deluxe', 'status': 'occupied', 'guest': 'Lisa Park', 'checkOut': '2026-07-09'},
    {'number': '205', 'floor': 2, 'type': 'Deluxe', 'status': 'reserved', 'guest': 'James Lee', 'checkOut': '2026-07-14'},
    {'number': '206', 'floor': 2, 'type': 'Deluxe', 'status': 'available', 'guest': '', 'checkOut': ''},
    // Floor 3
    {'number': '301', 'floor': 3, 'type': 'Suite', 'status': 'occupied', 'guest': 'Michael Chen', 'checkOut': '2026-07-10'},
    {'number': '302', 'floor': 3, 'type': 'Suite', 'status': 'available', 'guest': '', 'checkOut': ''},
    {'number': '303', 'floor': 3, 'type': 'Suite', 'status': 'occupied', 'guest': 'Anna Martinez', 'checkOut': '2026-07-08'},
    {'number': '304', 'floor': 3, 'type': 'Suite', 'status': 'reserved', 'guest': 'Robert Kim', 'checkOut': '2026-07-15'},
    // Floor 4
    {'number': '401', 'floor': 4, 'type': 'Presidential', 'status': 'occupied', 'guest': 'Emma Wilson', 'checkOut': '2026-07-09'},
    {'number': '402', 'floor': 4, 'type': 'Presidential', 'status': 'available', 'guest': '', 'checkOut': ''},
  ];

  // ─── TODAY'S ARRIVALS ───────────────────────────────────────────────
  static const List<Map<String, dynamic>> todayArrivals = [
    {'guest': 'Alex Wang', 'room': '106', 'type': 'Standard', 'time': '10:00 AM', 'status': 'confirmed', 'nights': 3, 'source': 'Online'},
    {'guest': 'James Lee', 'room': '205', 'type': 'Deluxe', 'time': '11:30 AM', 'status': 'confirmed', 'nights': 2, 'source': 'Phone'},
    {'guest': 'Robert Kim', 'room': '304', 'type': 'Suite', 'time': '2:00 PM', 'status': 'confirmed', 'nights': 5, 'source': 'Walk-in'},
    {'guest': 'Sophie Turner', 'room': '102', 'type': 'Standard', 'time': '3:00 PM', 'status': 'pending', 'nights': 1, 'source': 'Online'},
    {'guest': 'Ahmed Hassan', 'room': '203', 'type': 'Deluxe', 'time': '4:30 PM', 'status': 'confirmed', 'nights': 4, 'source': 'Agent'},
    {'guest': 'Yuki Tanaka', 'room': '302', 'type': 'Suite', 'time': '5:00 PM', 'status': 'pending', 'nights': 2, 'source': 'Online'},
  ];

  // ─── TODAY'S DEPARTURES ─────────────────────────────────────────────
  static const List<Map<String, dynamic>> todayDepartures = [
    {'guest': 'Fatima Ali', 'room': '107', 'type': 'Standard', 'time': '11:00 AM', 'balance': 0.0, 'status': 'ready', 'nights': 3},
    {'guest': 'Anna Martinez', 'room': '303', 'type': 'Suite', 'time': '12:00 PM', 'balance': 45.0, 'status': 'pending_bill', 'nights': 5},
    {'guest': 'Peter Okonkwo', 'room': '105', 'type': 'Standard', 'time': '10:00 AM', 'balance': 0.0, 'status': 'checked_out', 'nights': 2},
    {'guest': 'Clara Dubois', 'room': '206', 'type': 'Deluxe', 'time': '1:00 PM', 'balance': 120.0, 'status': 'pending_bill', 'nights': 4},
    {'guest': 'Max Müller', 'room': '402', 'type': 'Presidential', 'time': '2:00 PM', 'balance': 0.0, 'status': 'ready', 'nights': 7},
  ];

  // ─── GUEST SERVICE REQUESTS ─────────────────────────────────────────
  static const List<Map<String, dynamic>> serviceRequests = [
    {'id': 'SR-001', 'guest': 'John Smith', 'room': '101', 'type': 'Room Service', 'description': 'Breakfast - Continental', 'time': '7:15 AM', 'status': 'in_progress', 'priority': 'normal'},
    {'id': 'SR-002', 'guest': 'Sarah Johnson', 'room': '201', 'type': 'Housekeeping', 'description': 'Extra towels & pillows', 'time': '8:00 AM', 'status': 'pending', 'priority': 'normal'},
    {'id': 'SR-003', 'guest': 'Emma Wilson', 'room': '401', 'type': 'Wake-up Call', 'description': 'Wake-up call at 6:30 AM', 'time': '6:30 AM', 'status': 'completed', 'priority': 'high'},
    {'id': 'SR-004', 'guest': 'Michael Chen', 'room': '301', 'type': 'Maintenance', 'description': 'AC not cooling properly', 'time': '9:00 AM', 'status': 'pending', 'priority': 'urgent'},
    {'id': 'SR-005', 'guest': 'Lisa Park', 'room': '204', 'type': 'Room Service', 'description': 'Lunch - Club Sandwich + Juice', 'time': '12:30 PM', 'status': 'pending', 'priority': 'normal'},
    {'id': 'SR-006', 'guest': 'David Brown', 'room': '108', 'type': 'Concierge', 'description': 'Airport taxi booking for tomorrow', 'time': '10:45 AM', 'status': 'in_progress', 'priority': 'normal'},
  ];

  // ─── RECENT ACTIVITY ────────────────────────────────────────────────
  static const List<Map<String, dynamic>> recentActivity = [
    {'action': 'Checked in guest', 'detail': 'John Smith → Room 101', 'time': '7:05 AM', 'icon': 'login'},
    {'action': 'Processed room service', 'detail': 'Room 401 - Breakfast', 'time': '7:20 AM', 'icon': 'room_service'},
    {'action': 'Assigned housekeeping', 'detail': 'Room 302 - Deep clean', 'time': '8:10 AM', 'icon': 'cleaning'},
    {'action': 'Checked out guest', 'detail': 'Peter Okonkwo ← Room 105', 'time': '9:00 AM', 'icon': 'logout'},
    {'action': 'Resolved maintenance', 'detail': 'Room 202 - Plumbing fixed', 'time': '9:30 AM', 'icon': 'build'},
    {'action': 'Updated room status', 'detail': 'Room 104 → Maintenance', 'time': '10:00 AM', 'icon': 'update'},
  ];
}
