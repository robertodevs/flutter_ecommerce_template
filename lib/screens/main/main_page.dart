import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ecommerce_int2/models/product.dart';
import 'package:ecommerce_int2/screens/notifications_page.dart';
import 'package:ecommerce_int2/screens/profile_page.dart';
import 'package:ecommerce_int2/screens/shop/check_out_page.dart';
import '../../custom_background.dart';
import '../../models/local_product_list.dart';
import '../category/category_list_page.dart';
import 'components/AnotherPage.dart';
import 'components/banner_widget.dart'; // Importa el widget del banner
import 'components/custom_bottom_bar.dart';
import 'components/product_list.dart';
import 'components/tab_view.dart';

List<String> timelines = [
  'Destacado Semana',
  'Mejor de Octubre Helloween',
  'Mejor de 2024',
];
String selectedTimeline = 'Presentado Semanalmente';

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> with TickerProviderStateMixin {
  late TabController tabController;
  late TabController bottomTabController;
  TextEditingController searchController = TextEditingController();
  bool isSearching = false;
  List<Product> products = [];
  List<Product> searchResults = [];


  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 5, vsync: this);
    bottomTabController = TabController(length: 4, vsync: this);
    products = LocalProductService().getProducts(); // Llama al método// Cargar productos desde el repositorio
  }

  @override
  void dispose() {
    tabController.dispose();
    bottomTabController.dispose();
    searchController.dispose();
    super.dispose();
  }

  void _filterSearchResults(String query) {
    List<Product> tempList = [];
    if (query.isNotEmpty) {
      products.forEach((product) {
        if (product.name.toLowerCase().contains(query.toLowerCase())) {
          tempList.add(product);
        }
      });
    } else {
      tempList.addAll(products);
    }
    setState(() {
      searchResults.clear();
      searchResults.addAll(tempList);
    });
  }

  void _toggleSearch() {
    setState(() {
      isSearching = !isSearching;
      if (!isSearching) {
        searchController.clear();
        _filterSearchResults('');
      }
    });
  }

  Widget _buildProductList() {
    if (isSearching) {
      _filterSearchResults(searchController.text);
    }

    return ProductList(
      products: isSearching ? searchResults : products,
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget topHeader = Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: <Widget>[
        Flexible(
          child: InkWell(
            onTap: () {
              setState(() {
                selectedTimeline = timelines[0];
              });
            },
            child: Text(
              timelines[0],
              style: TextStyle(
                fontSize: timelines[0] == selectedTimeline ? 20 : 14,
                color: Colors.grey,
              ),
            ),
          ),
        ),
        Flexible(
          child: InkWell(
            onTap: () {
              setState(() {
                selectedTimeline = timelines[1];
              });
            },
            child: Text(
              timelines[1],
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: timelines[1] == selectedTimeline ? 20 : 14,
                color: Colors.grey,
              ),
            ),
          ),
        ),
        Flexible(
          child: InkWell(
            onTap: () {
              setState(() {
                selectedTimeline = timelines[2];
              });
            },
            child: Text(
              timelines[2],
              textAlign: TextAlign.right,
              style: TextStyle(
                fontSize: timelines[2] == selectedTimeline ? 20 : 14,
                color: Colors.grey,
              ),
            ),
          ),
        ),
      ],
    );

    Widget tabBar = TabBar(
      tabs: [
        Tab(text: 'Tendencia'),
        Tab(text: 'Deportes'),
        Tab(text: 'Audífonos'),
        Tab(text: 'Inalámbricos'),
        Tab(text: 'Bluetooth'),
      ],
      labelStyle: TextStyle(fontSize: 16.0),
      unselectedLabelStyle: TextStyle(fontSize: 14.0),
      labelColor: Colors.grey,
      unselectedLabelColor: Color.fromRGBO(0, 0, 0, 0.5),
      isScrollable: true,
      controller: tabController,
    );

    return Scaffold(
      appBar: AppBar(
        title: !isSearching
            ? Text('Tu Tienda')
            : TextField(
          controller: searchController,
          style: TextStyle(color: Colors.black),
          decoration: InputDecoration(
            hintText: 'Buscar...',
            hintStyle: TextStyle(color: Colors.black),
            border: InputBorder.none,
          ),
          onChanged: _filterSearchResults,
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.notifications),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => NotificationsPage()),
              );
            },
          ),
          IconButton(
            icon: SvgPicture.asset(
              'assets/icons/search_icon.svg',
              height: 24,
              width: 24,
            ),
            onPressed: _toggleSearch,
          ),
        ],
      ),
      bottomNavigationBar: CustomBottomBar(controller: bottomTabController),
      body: CustomPaint(
        painter: MainBackground(),
        child: TabBarView(
          controller: bottomTabController,
          physics: NeverScrollableScrollPhysics(), // Mantén esto si no quieres swipe en tabs.
          children: <Widget>[
            SafeArea(
              child: NestedScrollView(
                headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
                  return <Widget>[
                    SliverAppBar(
                      expandedHeight: 250, // Ajusta la altura del banner
                      pinned: true,
                      primary: false, // Permite superposición con la barra de estado
                      flexibleSpace: FlexibleSpaceBar(
                        background: BannerWidget(
                          imageUrl: 'https://i.imgur.com/GaEsmRG.png',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => AnotherPage(),
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                    SliverToBoxAdapter(child: topHeader),
                    SliverToBoxAdapter(
                      child: SingleChildScrollView( // Envuelve en scroll si es necesario.
                        child: Column(
                          children: [
                            _buildProductList(), // Lista de productos.
                            SizedBox(height: 16), // Espacio entre elementos.
                            tabBar, // TabBar adicional.
                          ],
                        ),
                      ),
                    ),
                  ];
                },
                body: TabView(tabController: tabController),
              ),
            ),
            CategoryListPage(),
            CheckOutPage(),
            ProfilePage(),
          ],
        ),
      ),
    );
  }
}
