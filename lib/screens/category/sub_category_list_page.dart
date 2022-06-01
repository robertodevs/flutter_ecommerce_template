import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/repository/category.repository.dart';
import 'package:ecommerce_int2/screens/category/sub_category.controller.dart';
import 'package:ecommerce_int2/screens/search_products/search_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';

import 'components/staggered_category_card.dart';

class SubCategoryListPage extends StatelessWidget {
  final Category category;

  const SubCategoryListPage({Key? key, required this.category})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Color(0xffF9F9F9),
      child: Container(
        margin: const EdgeInsets.only(top: 16),
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: GetBuilder<SubCategoryController>(
          init: SubCategoryController(Get.find<CategoryRepository>(), category),
          builder: (controller) => SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                const SizedBox(height: 16,),
                Row(
                  children: [
                    BackButton(onPressed: () => Get.back(),),
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 16.0),
                      child: Text(
                        'Sub Category List',
                        style: TextStyle(
                          color: darkGrey,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: EdgeInsets.only(left: 16.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(5)),
                    color: Colors.white,
                  ),
                  child: TextField(
                    controller: controller.searchController,
                    decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: 'Search',
                        prefixIcon: SvgPicture.asset(
                          'assets/icons/search_icon.svg',
                          fit: BoxFit.scaleDown,
                        )),
                    onChanged: (value) => controller.onChanged(value),
                  ),
                ),
                Flexible(
                  child: ListView.builder(
                    itemCount: controller.tempList.length,
                    itemBuilder: (_, index) => Padding(
                      padding: EdgeInsets.symmetric(
                        vertical: 16.0,
                      ),
                      child: StaggeredCardCard(
                        begin: const Color(0xffFCE183),
                        end: const Color(0xffF68D7F),
                        categoryName: controller.tempList[index].name ?? "",
                        assetPath: 'assets/jeans_5.png',
                        onViewMore: () => Get.to(SearchPage(),
                            arguments: controller.tempList[index].slug),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
