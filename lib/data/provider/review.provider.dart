import 'package:ecommerce_int2/data/models/review.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class ReviewProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  ReviewProvider(this.networkService);

  final String addReviewUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/review/add';

  final String getRevAboutProductUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/review';


  Future<HttpResponse> addReview(
      ReviewParam filter) {
    return networkService.post(addReviewUrl, data: filter.toJson());
  }

  Future<HttpResponse> getReviewProduct(
      String keyword) {
    return networkService.get("$getRevAboutProductUrl/$keyword");
  }


}
