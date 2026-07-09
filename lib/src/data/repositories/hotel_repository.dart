import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/core/network/dio_client.dart';
import 'package:luxestay/src/data/models/models.dart';

class HotelFilters {
  const HotelFilters({
    this.query,
    this.city,
    this.category,
    this.minPrice,
    this.maxPrice,
    this.minRating,
    this.checkIn,
    this.checkOut,
    this.guests,
    this.sort,
    this.page = 1,
    this.limit = 20,
  });

  final String? query;
  final String? city;
  final String? category;
  final double? minPrice;
  final double? maxPrice;
  final double? minRating;
  final DateTime? checkIn;
  final DateTime? checkOut;
  final int? guests;
  final String? sort;
  final int page;
  final int limit;
}

class HotelRepository {
  HotelRepository(this._dio);

  final Dio _dio;

  Future<List<Hotel>> getHotels([HotelFilters filters = const HotelFilters()]) async {
    try {
      final response = await _dio.get('/hotels', queryParameters: {
        if (filters.query != null) 'q': filters.query,
        if (filters.city != null) 'city': filters.city,
        if (filters.category != null) 'category': filters.category,
        if (filters.minPrice != null) 'minPrice': filters.minPrice,
        if (filters.maxPrice != null) 'maxPrice': filters.maxPrice,
        if (filters.minRating != null) 'minRating': filters.minRating,
        if (filters.checkIn != null)
          'checkIn': filters.checkIn!.toIso8601String().split('T').first,
        if (filters.checkOut != null)
          'checkOut': filters.checkOut!.toIso8601String().split('T').first,
        if (filters.guests != null) 'guests': filters.guests,
        if (filters.sort != null) 'sort': filters.sort,
        'page': filters.page,
        'limit': filters.limit,
      });

      final list = response.data['data'] as List<dynamic>;
      return list.map((json) => _hotelFromJson(json as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to load hotels');
    }
  }

  Future<Hotel> getHotelById(String id) async {
    try {
      final response = await _dio.get('/hotels/$id');
      return _hotelFromJson(response.data['data'] as Map<String, dynamic>, detailed: true);
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to load hotel');
    }
  }

  Future<List<City>> getCities() async {
    try {
      final response = await _dio.get('/hotels/cities');
      final list = response.data['data'] as List<dynamic>;
      return list
          .map(
            (json) => City(
              id: json['id'] as String,
              name: json['name'] as String,
              country: json['country'] as String,
              image: json['image'] as String? ?? '',
              hotelCount: (json['hotelCount'] as num?)?.toInt() ?? 0,
            ),
          )
          .toList();
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to load cities');
    }
  }

  Hotel _hotelFromJson(Map<String, dynamic> json, {bool detailed = false}) {
    final images = (json['images'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        [];

    final rooms = detailed
        ? (json['rooms'] as List<dynamic>?)
                ?.map((r) => _roomFromJson(r as Map<String, dynamic>))
                .toList() ??
            []
        : <Room>[];

    final reviews = detailed
        ? (json['reviews'] as List<dynamic>?)
                ?.map((r) => _reviewFromJson(r as Map<String, dynamic>))
                .toList() ??
            []
        : <Review>[];

    final contactRaw = json['contact'] as Map<String, dynamic>?;
    final nearby = (json['nearbyPlaces'] as List<dynamic>?)
        ?.map(
          (p) => NearbyPlace(
            name: p['name'] as String,
            type: p['type'] as String,
            distance: (p['distanceKm'] as num?)?.toDouble() ?? 0,
            icon: p['icon'] as String?,
          ),
        )
        .toList();

    return Hotel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String? ?? '',
      location: json['location'] as String? ?? '',
      city: json['city'] as String? ?? '',
      country: json['country'] as String? ?? '',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0,
      rating: (json['rating'] as num?)?.toDouble() ?? 0,
      reviewCount: (json['reviewCount'] as num?)?.toInt() ?? 0,
      pricePerNight: (json['pricePerNight'] as num?)?.toDouble() ?? 0,
      originalPrice: (json['originalPrice'] as num?)?.toDouble(),
      currency: json['currency'] as String? ?? 'USD',
      images: images,
      amenities: (json['amenities'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      rooms: rooms,
      reviews: reviews,
      discount: json['discount'] as String?,
      isFavorite: json['isFavorite'] as bool? ?? false,
      isAvailable: json['isAvailable'] as bool? ?? true,
      category: json['category'] as String? ?? 'Hotels',
      videoUrl: json['videoUrl'] as String?,
      contact: contactRaw != null
          ? {
              if (contactRaw['phone'] != null) 'phone': contactRaw['phone'].toString(),
              if (contactRaw['email'] != null) 'email': contactRaw['email'].toString(),
            }
          : null,
      awards: (json['awards'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      cancellationPolicy: json['cancellationPolicy'] as String?,
      rules: (json['rules'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      languages: (json['languages'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      nearbyPlaces: nearby,
    );
  }

  Room _roomFromJson(Map<String, dynamic> json) {
    return Room(
      id: json['id'] as String,
      name: json['name'] as String,
      type: json['type'] as String,
      description: json['description'] as String? ?? '',
      pricePerNight: (json['pricePerNight'] as num).toDouble(),
      originalPrice: (json['originalPrice'] as num?)?.toDouble(),
      capacity: (json['capacity'] as num).toInt(),
      bedType: json['bedType'] as String,
      bedCount: (json['bedCount'] as num?)?.toInt() ?? 1,
      roomSize: (json['roomSize'] as num).toDouble(),
      view: json['view'] as String,
      images: (json['images'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      amenities: (json['amenities'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      isAvailable: json['isAvailable'] as bool? ?? true,
      breakfastIncluded: json['breakfastIncluded'] as bool? ?? false,
    );
  }

  Review _reviewFromJson(Map<String, dynamic> json) {
    return Review(
      id: json['id'] as String,
      userName: json['userName'] as String,
      userAvatar: json['userAvatar'] as String? ?? '',
      rating: (json['rating'] as num).toDouble(),
      comment: json['comment'] as String,
      date: DateTime.parse(json['date'] as String),
      photos: (json['photos'] as List<dynamic>?)?.map((e) => e.toString()).toList(),
      isVerified: json['isVerified'] as bool? ?? false,
      helpfulCount: (json['helpfulCount'] as num?)?.toInt() ?? 0,
    );
  }
}

final hotelRepositoryProvider = Provider<HotelRepository>((ref) {
  return HotelRepository(ref.watch(dioProvider));
});
