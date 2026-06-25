/// Design token constants for spacing, border radius, elevation, and sizing.
/// Ensures consistent dimensions across the entire luxury hotel app.
class AppDimensions {
  AppDimensions._();

  // ─── SPACING ───────────────────────────────────────────────────────
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double base = 16.0;
  static const double lg = 20.0;
  static const double xl = 24.0;
  static const double xxl = 32.0;
  static const double xxxl = 40.0;
  static const double huge = 48.0;
  static const double massive = 64.0;

  // ─── PADDING ───────────────────────────────────────────────────────
  static const double paddingScreen = 20.0;
  static const double paddingCard = 16.0;
  static const double paddingSection = 24.0;

  // ─── BORDER RADIUS ─────────────────────────────────────────────────
  static const double radiusXs = 8.0;
  static const double radiusSm = 12.0;
  static const double radiusMd = 16.0;
  static const double radiusLg = 20.0;
  static const double radiusXl = 24.0;
  static const double radiusXxl = 28.0;
  static const double radiusCard = 32.0;
  static const double radiusHotelCard = 36.0;
  static const double radiusImage = 30.0;
  static const double radiusButton = 999.0;
  static const double radiusInput = 20.0;
  static const double radiusBottomSheet = 32.0;
  static const double radiusChip = 999.0;

  // ─── ELEVATION / SHADOW ────────────────────────────────────────────
  static const double elevationNone = 0.0;
  static const double elevationXs = 2.0;
  static const double elevationSm = 4.0;
  static const double elevationMd = 8.0;
  static const double elevationLg = 16.0;
  static const double elevationXl = 24.0;

  // ─── SIZES ─────────────────────────────────────────────────────────
  static const double iconSm = 18.0;
  static const double iconMd = 22.0;
  static const double iconLg = 26.0;
  static const double iconXl = 32.0;

  static const double avatarSm = 36.0;
  static const double avatarMd = 48.0;
  static const double avatarLg = 64.0;
  static const double avatarXl = 96.0;

  static const double buttonHeight = 56.0;
  static const double buttonHeightSm = 44.0;
  static const double inputHeight = 56.0;

  static const double hotelCardHeight = 340.0;
  static const double hotelCardImageHeight = 220.0;
  static const double offerCardHeight = 180.0;
  static const double categoryChipHeight = 44.0;
  static const double cityChipSize = 80.0;

  static const double bottomNavHeight = 72.0;
  static const double bottomNavMargin = 20.0;

  static const double searchBarHeight = 56.0;

  // ─── BREAKPOINTS ───────────────────────────────────────────────────
  static const double mobileBreakpoint = 600.0;
  static const double tabletBreakpoint = 900.0;
  static const double desktopBreakpoint = 1200.0;

  // ─── ANIMATION DURATIONS (ms) ──────────────────────────────────────
  static const int animFast = 200;
  static const int animNormal = 300;
  static const int animSlow = 500;
  static const int animVerySlow = 800;
  static const int splashDuration = 2500;
}
