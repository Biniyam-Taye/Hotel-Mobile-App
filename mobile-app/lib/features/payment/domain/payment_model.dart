class PaymentIntentResponse {
  final String clientSecret;
  final String paymentIntentId;

  PaymentIntentResponse({
    required this.clientSecret,
    required this.paymentIntentId,
  });

  factory PaymentIntentResponse.fromJson(Map<String, dynamic> json) {
    return PaymentIntentResponse(
      clientSecret: json['clientSecret'] ?? '',
      paymentIntentId: json['paymentIntentId'] ?? '',
    );
  }
}
