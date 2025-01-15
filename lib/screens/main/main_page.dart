import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:ecommerce_int2/models/product.dart';
import 'package:ecommerce_int2/screens/notifications_page.dart';
import 'package:ecommerce_int2/screens/profile_page.dart';
import 'package:ecommerce_int2/screens/shop/check_out_page.dart';
import '../../custom_background.dart';
import '../../models/local_product_list.dart';
import '../category/category_list_page.dart';
import '../chat_page.dart';
<<<<<<< HEAD
import '../service/chat_service.dart';
=======
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
import 'components/AnotherPage.dart';
import 'components/banner_widget.dart';
import 'components/custom_bottom_bar.dart';
import 'components/product_list.dart';
import 'components/tab_view.dart';


<<<<<<< HEAD

List<String> timelines = [
  'Destacado Semana',
  'Mejor de Octubre Helloween',
  'Mejor de 2024',
];
String selectedTimeline = 'Presentado Semanalmente';

=======
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> with TickerProviderStateMixin {
  late TabController tabController;
  late TabController bottomTabController;
<<<<<<< HEAD
  TextEditingController searchController = TextEditingController();
  bool isSearching = false;
  List<Product> products = [];
  List<Product> searchResults = [];
=======
  List<String> timelines = ["Hoy", "Semana", "Mes"];
  String selectedTimeline = "Hoy";
  List<Map<String, String>> chatMessages = [];
  TextEditingController chatController = TextEditingController();

  final List<Product> products = [
    // Llena esta lista con instancias de tu clase Product
    Product(
      id: '1',
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      imageUrls: ['https://via.placeholder.com/150'],
      price: 29.99,
      averageRating: 4.5,
      ratingCount: 100,
    ),
    Product(
      id: '2',
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      imageUrls: ['https://via.placeholder.com/150'],
      price: 49.99,
      averageRating: 4.7,
      ratingCount: 200,
    ),
  ];
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 5, vsync: this);
    bottomTabController = TabController(length: 4, vsync: this);
<<<<<<< HEAD
    products = LocalProductService().getProducts();
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
=======
  }

  Widget _buildProductList() {
    return ProductList(
      products: products,
    );
  }

  Future<void> sendMessage(String userMessage) async {
    if (userMessage.isEmpty) return;

    setState(() {
      chatMessages.add({'user': userMessage, 'bot': 'Cargando...'});
    });

    try {
      final responseDoc = await FirebaseFirestore.instance
          .collection('responses')
          .where('input', isEqualTo: userMessage.toLowerCase())
          .limit(1)
          .get();

      String botResponse = responseDoc.docs.isNotEmpty
          ? responseDoc.docs.first['response']
          : 'Lo siento, no entiendo tu mensaje. ¿Podrías reformularlo?';

      setState(() {
        chatMessages.last['bot'] = botResponse;
      });
    } catch (e) {
      setState(() {
        chatMessages.last['bot'] = 'Hubo un error, intenta más tarde.';
      });
    }
  }

  Widget _buildChatInterface() {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
            itemCount: chatMessages.length,
            itemBuilder: (context, index) {
              final message = chatMessages[index];
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Tú: ${message['user']}"),
                  Text("Bot: ${message['bot']}"),
                ],
              );
            },
          ),
        ),
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: chatController,
                decoration: InputDecoration(
                  hintText: 'Escribe tu mensaje...',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            IconButton(
              icon: Icon(Icons.send),
              onPressed: () {
                final userMessage = chatController.text.trim();
                chatController.clear();
                sendMessage(userMessage);
              },
            ),
          ],
        ),
      ],
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget topHeader = Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: <Widget>[
<<<<<<< HEAD
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
=======
        for (var timeline in timelines)
          Flexible(
            child: InkWell(
              onTap: () {
                setState(() {
                  selectedTimeline = timeline;
                });
              },
              child: Text(
                timeline,
                style: TextStyle(
                  fontSize: timeline == selectedTimeline ? 20 : 14,
                  color: Colors.grey,
                ),
              ),
            ),
          ),
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
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
<<<<<<< HEAD
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
=======
        title: Text('Tu Tienda'),
      ),
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
      body: CustomPaint(
        painter: MainBackground(),
        child: TabBarView(
          controller: bottomTabController,
<<<<<<< HEAD
          physics: NeverScrollableScrollPhysics(), // Mantén esto si no quieres swipe en tabs.
=======
          physics: NeverScrollableScrollPhysics(),
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
          children: <Widget>[
            SafeArea(
              child: NestedScrollView(
                headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
                  return <Widget>[
<<<<<<< HEAD
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
=======
                    SliverToBoxAdapter(child: topHeader),
                    SliverToBoxAdapter(child: _buildProductList()),
                    SliverToBoxAdapter(child: tabBar),
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
                  ];
                },
                body: TabView(tabController: tabController),
              ),
            ),
            CategoryListPage(),
            CheckOutPage(),
<<<<<<< HEAD
            ProfilePage(),
=======
            _buildChatInterface(),
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
          ],
        ),
      ),
    );
  }
}


<<<<<<< HEAD








=======
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
