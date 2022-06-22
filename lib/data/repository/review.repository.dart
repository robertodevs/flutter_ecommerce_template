import 'package:ecommerce_int2/data/models/review.dart';
import 'package:ecommerce_int2/data/provider/review.provider.dart';

class ReviewRepository {
  final ReviewProvider provider;

  ReviewRepository(this.provider);

  Future<void> addReview(ReviewParam filter) async {
    final response = await provider.addReview(filter);
    if (response.statusCode != 200) {
      throw Exception("Add review failed");
    }
    return;
  }

  Future<List<Review>> getReviewProduct(String keyword) async {
    final response = await provider.getReviewProduct(keyword);
    if (response.statusCode != 200) {
      throw Exception("Get products failed");
    }
    final result = ReviewResponse.fromJson(response.body);
    return result.data ?? [];
  }

}
