import 'package:flutter/material.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:carousel_slider/carousel_slider.dart';
import '../config/theme_config.dart';

/// ZenNomad Home Screen
/// Features: Featured carousel, categorized article feed, bookmarks

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentCarouselIndex = 0;
  String _selectedCategory = "All";
  
  final List<String> categories = [
    "All",
    "Daily Wisdom",
    "Global News",
    "Mindset",
    "Lifestyle",
    "Technology",
  ];

  // Mock featured articles
  final List<ArticleCard> featuredArticles = [
    ArticleCard(
      id: "1",
      title: "The Art of Digital Minimalism",
      excerpt: "Learn how to reclaim your focus in a distracted world.",
      category: "Daily Wisdom",
      author: "Deepak Kumar Gupta",
      date: "2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
      viewCount: 1250,
      commentCount: 45,
      featured: true,
    ),
    ArticleCard(
      id: "2",
      title: "Remote Work: Productivity Hacks",
      excerpt: "Master the art of working from anywhere without burnout.",
      category: "Lifestyle",
      author: "Sarah Johnson",
      date: "4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      viewCount: 980,
      commentCount: 32,
      featured: true,
    ),
    ArticleCard(
      id: "3",
      title: "Breaking News: Tech Giants Unite",
      excerpt: "Industry leaders announce groundbreaking partnership.",
      category: "Global News",
      author: "Tech Reporter",
      date: "6 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      viewCount: 2150,
      commentCount: 78,
      featured: true,
    ),
  ];

  // Mock all articles
  final List<ArticleCard> allArticles = [
    ArticleCard(
      id: "4",
      title: "Building Habits That Stick",
      excerpt: "Science-backed strategies for lasting change.",
      category: "Mindset",
      author: "James Wilson",
      date: "8 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      viewCount: 650,
      commentCount: 28,
    ),
    ArticleCard(
      id: "5",
      title: "Travel Essentials Guide 2026",
      excerpt: "Everything you need for your next adventure.",
      category: "Lifestyle",
      author: "Emma Davis",
      date: "10 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
      viewCount: 1100,
      commentCount: 52,
    ),
    ArticleCard(
      id: "6",
      title: "AI: The Future of Work",
      excerpt: "How artificial intelligence is reshaping industries.",
      category: "Technology",
      author: "Dr. Alex Chen",
      date: "12 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1677442d019cecf8fcf2eac40b28990b",
      viewCount: 1890,
      commentCount: 65,
    ),
    ArticleCard(
      id: "7",
      title: "Mindfulness in Daily Life",
      excerpt: "Simple practices for inner peace and clarity.",
      category: "Daily Wisdom",
      author: "Meditation Master",
      date: "14 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      viewCount: 780,
      commentCount: 35,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ThemeConfig.offWhite,
      appBar: _buildAppBar(context),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Featured Carousel
            _buildFeaturedCarousel(context),

            const SizedBox(height: ThemeConfig.xl),

            // Category Filter
            _buildCategoryFilter(context),

            const SizedBox(height: ThemeConfig.lg),

            // Articles Feed
            _buildArticlesFeed(context),

            const SizedBox(height: ThemeConfig.xxl),
          ],
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return AppBar(
      title: const Text("ZenNomad"),
      backgroundColor: Colors.white,
      elevation: 0,
      centerTitle: true,
      leading: IconButton(
        icon: const Icon(Icons.menu),
        onPressed: () {},
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.search),
          onPressed: () {},
        ),
        IconButton(
          icon: const Icon(Icons.notifications),
          onPressed: () {},
        ),
      ],
    );
  }

  Widget _buildFeaturedCarousel(BuildContext context) {
    return Column(
      children: [
        CarouselSlider(
          items: featuredArticles.map((article) {
            return GestureDetector(
              onTap: () => _openArticleDetails(article),
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: ThemeConfig.md),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(ThemeConfig.radiusXl),
                  boxShadow: [ThemeConfig.shadowMd],
                  gradient: const LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black54],
                  ),
                ),
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    // Background Image
                    ClipRRect(
                      borderRadius: BorderRadius.circular(ThemeConfig.radiusXl),
                      child: Image.network(
                        article.imageUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            color: ThemeConfig.lightGreen,
                            child: const Center(
                              child: Icon(Icons.image, color: Colors.white),
                            ),
                          );
                        },
                      ),
                    ),
                    
                    // Gradient Overlay
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            Colors.transparent,
                            Colors.black.withOpacity(0.7),
                          ],
                        ),
                      ),
                    ),

                    // Content
                    Padding(
                      padding: const EdgeInsets.all(ThemeConfig.lg),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Category Badge
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: ThemeConfig.md,
                              vertical: ThemeConfig.xs,
                            ),
                            decoration: BoxDecoration(
                              color: ThemeConfig.warmAmber,
                              borderRadius:
                                  BorderRadius.circular(ThemeConfig.radiusSm),
                            ),
                            child: Text(
                              article.category,
                              style: Theme.of(context)
                                  .textTheme
                                  .labelSmall
                                  ?.copyWith(color: Colors.white),
                            ),
                          ),

                          const SizedBox(height: ThemeConfig.md),

                          // Title
                          Text(
                            article.title,
                            style: Theme.of(context)
                                .textTheme
                                .headlineMedium
                                ?.copyWith(color: Colors.white),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),

                          const SizedBox(height: ThemeConfig.md),

                          // Excerpt
                          Text(
                            article.excerpt,
                            style: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.copyWith(color: Colors.white70),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
          options: CarouselOptions(
            height: 300,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 5),
            enlargeCenterPage: false,
            viewportFraction: 0.95,
            onPageChanged: (index, reason) {
              setState(() => _currentCarouselIndex = index);
            },
          ),
        ),

        const SizedBox(height: ThemeConfig.lg),

        // Page Indicator
        SmoothPageIndicator(
          controller: PageController(initialPage: _currentCarouselIndex),
          count: featuredArticles.length,
          effect: ExpandingDotsEffect(
            dotColor: ThemeConfig.lightGray,
            activeDotColor: ThemeConfig.deepForestGreen,
            dotHeight: 8,
            dotWidth: 8,
            spacing: 6,
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryFilter(BuildContext context) {
    return SizedBox(
      height: 50,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: ThemeConfig.lg),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = _selectedCategory == category;

          return Padding(
            padding: const EdgeInsets.only(right: ThemeConfig.md),
            child: FilterChip(
              label: Text(category),
              selected: isSelected,
              onSelected: (selected) {
                setState(() => _selectedCategory = category);
              },
              backgroundColor: Colors.white,
              selectedColor: ThemeConfig.deepForestGreen,
              labelStyle: TextStyle(
                color: isSelected
                    ? Colors.white
                    : ThemeConfig.slateGray,
                fontWeight: FontWeight.w500,
              ),
              shape: RoundedRectangleBorder(
                borderRadius:
                    BorderRadius.circular(ThemeConfig.radiusMd),
                side: BorderSide(
                  color: isSelected
                      ? Colors.transparent
                      : ThemeConfig.lightGray,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildArticlesFeed(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: ThemeConfig.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Latest Articles",
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: ThemeConfig.lg),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: allArticles.length,
            itemBuilder: (context, index) {
              final article = allArticles[index];
              return GestureDetector(
                onTap: () => _openArticleDetails(article),
                child: Padding(
                  padding: const EdgeInsets.only(bottom: ThemeConfig.lg),
                  child: _buildArticleListItem(context, article),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildArticleListItem(BuildContext context, ArticleCard article) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(ThemeConfig.radiusLg),
        boxShadow: [ThemeConfig.shadowSm],
      ),
      overflow: ClipRRect,
      child: Row(
        children: [
          // Image
          ClipRRect(
            borderRadius: BorderRadius.circular(ThemeConfig.radiusLg),
            child: Image.network(
              article.imageUrl,
              width: 100,
              height: 100,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  width: 100,
                  height: 100,
                  color: ThemeConfig.lightGreen,
                  child: const Icon(Icons.image, color: Colors.white),
                );
              },
            ),
          ),

          const SizedBox(width: ThemeConfig.md),

          // Content
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(ThemeConfig.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  // Category
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: ThemeConfig.sm,
                      vertical: ThemeConfig.xs,
                    ),
                    decoration: BoxDecoration(
                      color: ThemeConfig.getCategoryColor(article.category)
                          .withOpacity(0.1),
                      borderRadius:
                          BorderRadius.circular(ThemeConfig.radiusSm),
                    ),
                    child: Text(
                      article.category,
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: ThemeConfig.getCategoryColor(
                                article.category),
                          ),
                    ),
                  ),

                  const SizedBox(height: ThemeConfig.sm),

                  // Title
                  Text(
                    article.title,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),

                  const SizedBox(height: ThemeConfig.sm),

                  // Meta Info
                  Row(
                    children: [
                      Icon(
                        Icons.visibility,
                        size: 12,
                        color: ThemeConfig.slateGray,
                      ),
                      const SizedBox(width: ThemeConfig.xs),
                      Text(
                        "${article.viewCount} views",
                        style: Theme.of(context).textTheme.labelSmall,
                      ),
                      const SizedBox(width: ThemeConfig.md),
                      Icon(
                        Icons.comment,
                        size: 12,
                        color: ThemeConfig.slateGray,
                      ),
                      const SizedBox(width: ThemeConfig.xs),
                      Text(
                        "${article.commentCount}",
                        style: Theme.of(context).textTheme.labelSmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Bookmark Button
          Padding(
            padding: const EdgeInsets.all(ThemeConfig.md),
            child: GestureDetector(
              onTap: () => _toggleBookmark(article),
              child: Icon(
                Icons.bookmark,
                color: ThemeConfig.deepForestGreen,
                size: 20,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _openArticleDetails(ArticleCard article) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Opening: ${article.title}"),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  void _toggleBookmark(ArticleCard article) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("${article.title} bookmarked!"),
        duration: const Duration(seconds: 1),
      ),
    );
  }
}

/// Article Card Data Model
class ArticleCard {
  final String id;
  final String title;
  final String excerpt;
  final String category;
  final String author;
  final String date;
  final String imageUrl;
  final int viewCount;
  final int commentCount;
  final bool featured;

  ArticleCard({
    required this.id,
    required this.title,
    required this.excerpt,
    required this.category,
    required this.author,
    required this.date,
    required this.imageUrl,
    required this.viewCount,
    required this.commentCount,
    this.featured = false,
  });
}
