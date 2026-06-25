/// Data models for the hotel booking application.
/// All models use immutable classes with copyWith support.

class Hotel {
  final String id;
  final String name;
  final String description;
  final String location;
  final String city;
  final String country;
  final double latitude;
  final double longitude;
  final double distance;
  final double rating;
  final int reviewCount;
  final double pricePerNight;
  final double? originalPrice;
  final String currency;
  final List<String> images;
  final List<String> amenities;
  final List<Room> rooms;
  final List<Review> reviews;
  final String? discount;
  final bool isFavorite;
  final bool isAvailable;
  final String category;
  final String? videoUrl;
  final Map<String, String>? contact;
  final List<String>? awards;
  final String? cancellationPolicy;
  final List<String>? rules;
  final List<String>? languages;
  final List<NearbyPlace>? nearbyPlaces;

  const Hotel({
    required this.id,
    required this.name,
    required this.description,
    required this.location,
    required this.city,
    required this.country,
    this.latitude = 0,
    this.longitude = 0,
    this.distance = 0,
    required this.rating,
    required this.reviewCount,
    required this.pricePerNight,
    this.originalPrice,
    this.currency = 'USD',
    required this.images,
    required this.amenities,
    this.rooms = const [],
    this.reviews = const [],
    this.discount,
    this.isFavorite = false,
    this.isAvailable = true,
    this.category = 'Hotels',
    this.videoUrl,
    this.contact,
    this.awards,
    this.cancellationPolicy,
    this.rules,
    this.languages,
    this.nearbyPlaces,
  });

  Hotel copyWith({
    String? id,
    String? name,
    String? description,
    String? location,
    String? city,
    String? country,
    double? latitude,
    double? longitude,
    double? distance,
    double? rating,
    int? reviewCount,
    double? pricePerNight,
    double? originalPrice,
    String? currency,
    List<String>? images,
    List<String>? amenities,
    List<Room>? rooms,
    List<Review>? reviews,
    String? discount,
    bool? isFavorite,
    bool? isAvailable,
    String? category,
  }) {
    return Hotel(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      location: location ?? this.location,
      city: city ?? this.city,
      country: country ?? this.country,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      distance: distance ?? this.distance,
      rating: rating ?? this.rating,
      reviewCount: reviewCount ?? this.reviewCount,
      pricePerNight: pricePerNight ?? this.pricePerNight,
      originalPrice: originalPrice ?? this.originalPrice,
      currency: currency ?? this.currency,
      images: images ?? this.images,
      amenities: amenities ?? this.amenities,
      rooms: rooms ?? this.rooms,
      reviews: reviews ?? this.reviews,
      discount: discount ?? this.discount,
      isFavorite: isFavorite ?? this.isFavorite,
      isAvailable: isAvailable ?? this.isAvailable,
      category: category ?? this.category,
    );
  }
}

class Room {
  final String id;
  final String name;
  final String type;
  final String description;
  final double pricePerNight;
  final double? originalPrice;
  final int capacity;
  final String bedType;
  final int bedCount;
  final double roomSize;
  final String view;
  final List<String> images;
  final List<String> amenities;
  final bool isAvailable;
  final bool breakfastIncluded;

  const Room({
    required this.id,
    required this.name,
    required this.type,
    required this.description,
    required this.pricePerNight,
    this.originalPrice,
    required this.capacity,
    required this.bedType,
    this.bedCount = 1,
    required this.roomSize,
    required this.view,
    required this.images,
    required this.amenities,
    this.isAvailable = true,
    this.breakfastIncluded = false,
  });
}

class Review {
  final String id;
  final String userName;
  final String userAvatar;
  final double rating;
  final String comment;
  final DateTime date;
  final List<String>? photos;
  final bool isVerified;
  final int helpfulCount;

  const Review({
    required this.id,
    required this.userName,
    required this.userAvatar,
    required this.rating,
    required this.comment,
    required this.date,
    this.photos,
    this.isVerified = false,
    this.helpfulCount = 0,
  });
}

class Booking {
  final String id;
  final Hotel hotel;
  final Room room;
  final DateTime checkIn;
  final DateTime checkOut;
  final int guests;
  final double totalPrice;
  final BookingStatus status;
  final String? specialRequests;
  final String? couponCode;
  final PaymentMethod paymentMethod;
  final DateTime createdAt;

  const Booking({
    required this.id,
    required this.hotel,
    required this.room,
    required this.checkIn,
    required this.checkOut,
    required this.guests,
    required this.totalPrice,
    required this.status,
    this.specialRequests,
    this.couponCode,
    required this.paymentMethod,
    required this.createdAt,
  });

  int get nights => checkOut.difference(checkIn).inDays;
}

enum BookingStatus {
  upcoming,
  active,
  completed,
  cancelled,
  refunded,
}

enum PaymentMethod {
  visa,
  mastercard,
  googlePay,
  applePay,
  telebirr,
  cbe,
  bankTransfer,
  wallet,
}

class UserProfile {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? avatar;
  final String? location;
  final LoyaltyTier loyaltyTier;
  final int rewardPoints;
  final double walletBalance;
  final List<String> preferences;

  const UserProfile({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    this.avatar,
    this.location,
    this.loyaltyTier = LoyaltyTier.silver,
    this.rewardPoints = 0,
    this.walletBalance = 0,
    this.preferences = const [],
  });
}

enum LoyaltyTier {
  silver,
  gold,
  platinum,
  diamond,
}

class Offer {
  final String id;
  final String title;
  final String subtitle;
  final String description;
  final String image;
  final String? couponCode;
  final double discountPercent;
  final DateTime validUntil;
  final String? terms;

  const Offer({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.image,
    this.couponCode,
    required this.discountPercent,
    required this.validUntil,
    this.terms,
  });
}

class City {
  final String id;
  final String name;
  final String country;
  final String image;
  final int hotelCount;

  const City({
    required this.id,
    required this.name,
    required this.country,
    required this.image,
    required this.hotelCount,
  });
}

class NearbyPlace {
  final String name;
  final String type;
  final double distance;
  final String? icon;

  const NearbyPlace({
    required this.name,
    required this.type,
    required this.distance,
    this.icon,
  });
}

class NotificationItem {
  final String id;
  final String title;
  final String message;
  final String type;
  final DateTime timestamp;
  final bool isRead;
  final String? actionUrl;

  const NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.type,
    required this.timestamp,
    this.isRead = false,
    this.actionUrl,
  });
}

class WalletTransaction {
  final String id;
  final String title;
  final String description;
  final double amount;
  final bool isCredit;
  final DateTime date;
  final String type;

  const WalletTransaction({
    required this.id,
    required this.title,
    required this.description,
    required this.amount,
    required this.isCredit,
    required this.date,
    required this.type,
  });
}

class ChatMessage {
  final String id;
  final String content;
  final bool isUser;
  final DateTime timestamp;
  final String? imageUrl;
  final bool isTyping;

  const ChatMessage({
    required this.id,
    required this.content,
    required this.isUser,
    required this.timestamp,
    this.imageUrl,
    this.isTyping = false,
  });
}
