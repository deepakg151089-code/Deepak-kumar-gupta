/// ZenNomad App Configuration Constants
/// All app-wide constants, contact info, and configuration

class AppConfig {
  // ============ APP INFO ============
  static const String appName = "ZenNomad";
  static const String appTagline = "Movement without chaos, Ambition without anxiety.";
  static const String appVersion = "1.0.0";
  static const String appBuild = "1";

  // ============ FOUNDER INFO ============
  static const String founderName = "Deepak Kumar Gupta";
  static const String founderBio = "Lifestyle Designer | Digital Nomad | Content Creator";
  static const String founderPhone = "8840778831";
  static const String founderEmail = "deepak151089@gmail.com";
  static const String founderLocation = "Mirzapur, U.P., India";

  // ============ SOCIAL MEDIA LINKS ============
  static const String linkedInUrl = "https://linkedin.com/in/deepakgupta";
  static const String twitterUrl = "https://twitter.com/deepakgupta";
  static const String instagramUrl = "https://instagram.com/deepakgupta";

  // ============ SUPPORT LINKS ============
  static const String websiteUrl = "https://zenomad.app";
  static const String supportEmail = "support@zenomad.app";
  static const String privacyPolicyUrl = "https://zenomad.app/privacy";
  static const String termsOfServiceUrl = "https://zenomad.app/terms";

  // ============ API ENDPOINTS ============
  static const String baseApiUrl = "https://api.zenomad.app";
  static const String articlesEndpoint = "/api/v1/articles";
  static const String productsEndpoint = "/api/v1/products";
  static const String commentsEndpoint = "/api/v1/comments";
  static const String goalsEndpoint = "/api/v1/goals";
  static const String partnersEndpoint = "/api/v1/partners";

  // ============ FIREBASE CONFIG ============
  static const String firebaseProjectId = "zenomad-app";
  static const String firebaseWebApiKey = "AIzaSyD_xxxxx";
  static const String firebaseAppId = "1:123456789:web:abcdef";
  static const String firebaseMessagingSenderId = "123456789";
}

/// Revenue Cat Configuration for Subscriptions
class RevenueCatConfig {
  static const String apiKey = "appl_xxxxxxxxxxxxxxxxxxxxxx";
  static const String monthlyPrice = "4.99";
  static const String annualPrice = "39.99";
  static const String lifetimePrice = "99.99";

  static const String monthlyProductId = "zen_nomad_monthly";
  static const String annualProductId = "zen_nomad_annual";
  static const String lifetimeProductId = "zen_nomad_lifetime";
}

/// AdMob Configuration for Advertisements
class AdMobConfig {
  static const String appId = "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy";
  static const String bannerAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy";
  static const String interstitialAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy";
  static const String rewardedAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy";
  static const String nativeAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy";
}

/// App Feature Flags
class FeatureFlags {
  static const bool enablePremiumContent = true;
  static const bool enableAffiliateShopping = true;
  static const bool enableCommunityHub = true;
  static const bool enableAdMob = true;
  static const bool enableAnalytics = true;
  static const bool enablePushNotifications = true;
  static const bool enableOfflineMode = true;
  static const bool enableDarkMode = false;
}

/// Article Categories
class ArticleCategory {
  static const String all = "All";
  static const String dailyWisdom = "Daily Wisdom";
  static const String globalNews = "Global News";
  static const String mindset = "Mindset";
  static const String lifestyle = "Lifestyle";
  static const String technology = "Technology";

  static const List<String> all_categories = [
    all,
    dailyWisdom,
    globalNews,
    mindset,
    lifestyle,
    technology,
  ];
}

/// Product Categories
class ProductCategory {
  static const String all = "All";
  static const String travel = "Travel Gear";
  static const String technology = "Technology";
  static const String wellness = "Wellness";
  static const String productivity = "Productivity";
  static const String books = "Books & Learning";

  static const List<String> all_categories = [
    all,
    travel,
    technology,
    wellness,
    productivity,
    books,
  ];
}

/// Ambition Goal Categories
class GoalCategory {
  static const String fitness = "Fitness";
  static const String learning = "Learning";
  static const String career = "Career";
  static const String finance = "Finance";
  static const String personal = "Personal Growth";
  static const String health = "Health";

  static const List<String> all_categories = [
    fitness,
    learning,
    career,
    finance,
    personal,
    health,
  ];
}

/// Content Types
class ContentType {
  static const String article = "article";
  static const String video = "video";
  static const String audio = "audio";
  static const String podcast = "podcast";

  static const List<String> all_types = [article, video, audio, podcast];
}

/// User Roles
class UserRole {
  static const String admin = "admin";
  static const String moderator = "moderator";
  static const String creator = "creator";
  static const String member = "member";
  static const String guest = "guest";
}

/// Error Messages
class ErrorMessages {
  static const String networkError = "Network connection failed. Please try again.";
  static const String serverError = "Server error occurred. Please try again later.";
  static const String notFound = "Resource not found.";
  static const String unauthorized = "You are not authorized to perform this action.";
  static const String invalidInput = "Please check your input and try again.";
  static const String cacheError = "Failed to load cached data.";
  static const String permissionDenied = "Permission denied. Please check your settings.";
  static const String unknownError = "An unexpected error occurred.";
}

/// Success Messages
class SuccessMessages {
  static const String articleSaved = "Article saved successfully.";
  static const String articleDeleted = "Article deleted successfully.";
  static const String commentPosted = "Comment posted successfully.";
  static const String goalCreated = "Goal created successfully.";
  static const String goalUpdated = "Goal updated successfully.";
  static const String profileUpdated = "Profile updated successfully.";
  static const String subscriptionActivated = "Subscription activated successfully.";
}

/// Validation Messages
class ValidationMessages {
  static const String emailRequired = "Email is required.";
  static const String invalidEmail = "Please enter a valid email address.";
  static const String passwordRequired = "Password is required.";
  static const String passwordTooShort = "Password must be at least 6 characters.";
  static const String passwordMismatch = "Passwords do not match.";
  static const String nameRequired = "Name is required.";
  static const String fieldRequired = "This field is required.";
  static const String urlInvalid = "Please enter a valid URL.";
  static const String phoneInvalid = "Please enter a valid phone number.";
}

/// API Response Codes
class ResponseCode {
  static const int success = 200;
  static const int created = 201;
  static const int badRequest = 400;
  static const int unauthorized = 401;
  static const int forbidden = 403;
  static const int notFound = 404;
  static const int conflict = 409;
  static const int serverError = 500;
  static const int serviceUnavailable = 503;
  static const int timeout = 408;
}

/// Duration Constants
class DurationConfig {
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration cacheExpiry = Duration(hours: 24);
  static const Duration sessionTimeout = Duration(minutes: 30);
  static const Duration debounceDelay = Duration(milliseconds: 300);
  static const Duration animationDuration = Duration(milliseconds: 400);
}

/// Pagination Config
class PaginationConfig {
  static const int defaultPageSize = 20;
  static const int initialPage = 1;
  static const int maxRetries = 3;
}

/// Cache Config
class CacheConfig {
  static const String articlesKey = "cached_articles";
  static const String productsKey = "cached_products";
  static const String userKey = "cached_user";
  static const String bookmarksKey = "cached_bookmarks";
  static const String goalsKey = "cached_goals";
}

/// Notification Config
class NotificationConfig {
  static const String channelId = "zen_nomad_notifications";
  static const String channelName = "ZenNomad Notifications";
  static const String channelDescription = "Notifications for ZenNomad app";
}

/// Analytics Event Names
class AnalyticsEvents {
  static const String appOpened = "app_opened";
  static const String articleViewed = "article_viewed";
  static const String articleBookmarked = "article_bookmarked";
  static const String commentPosted = "comment_posted";
  static const String productViewed = "product_viewed";
  static const String productClicked = "product_clicked";
  static const String subscriptionStarted = "subscription_started";
  static const String subscriptionCompleted = "subscription_completed";
  static const String goalCreated = "goal_created";
  static const String goalCompleted = "goal_completed";
  static const String adClicked = "ad_clicked";
  static const String profileVisited = "profile_visited";
}

/// Premium Features List
class PremiumFeatures {
  static const List<String> features = [
    "Unlimited premium articles",
    "Ad-free reading experience",
    "Offline access to saved content",
    "Early access to new content",
    "Priority customer support",
    "Exclusive community access",
    "Download audio & video content",
    "Advanced search & filters",
    "Custom reading list",
    "Distraction-free reading mode",
  ];
}

/// Subscription Tiers
class SubscriptionTier {
  static const String free = "free";
  static const String monthly = "monthly";
  static const String annual = "annual";
  static const String lifetime = "lifetime";
}

/// Social Sharing Config
class SocialSharingConfig {
  static const String twitterHashtags = "#ZenNomad #Lifestyle #Wellness";
  static const String facebookAppId = "xxxxxxxxxxxxx";
  static const String linkedInCompanyId = "xxxxxxxxxxxxx";
}

/// Monetization Config
class MonetizationConfig {
  static const double adMobTargetRPM = 10.0;
  static const double affiliateCommissionRate = 0.15; // 15%
  static const double platformFeeRate = 0.15; // 15%
  static const int minArticleViewsForMonetization = 100;
}

/// Rate Limiting
class RateLimitConfig {
  static const int maxApiCallsPerMinute = 60;
  static const int maxCommentPerHour = 10;
  static const int maxPostsPerDay = 5;
}

/// Deployment Environments
class Environment {
  static const String dev = "dev";
  static const String staging = "staging";
  static const String production = "production";
  
  static const String currentEnv = production;
}
