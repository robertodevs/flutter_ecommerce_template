import 'package:flutter/material.dart';
import 'package:ecommerce_int2/firestore_service.dart';
import 'package:ecommerce_int2/models/product.dart';

class ProductForm extends StatefulWidget {
  final String? documentId;
  final Product? existingProduct;

  ProductForm({this.documentId, this.existingProduct});

  @override
  _ProductFormState createState() => _ProductFormState();
}

class _ProductFormState extends State<ProductForm> {
  final FirestoreService _firestoreService = FirestoreService(); // Inicializa el servicio
  final _imageController = TextEditingController();
  final _nameController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _priceController = TextEditingController();
  final _averageRatingController = TextEditingController(); // Controlador para calificación promedio
  final _ratingCountController = TextEditingController(); // Controlador para conteo de calificaciones

  @override
  void initState() {
    super.initState();
    if (widget.existingProduct != null) {
      _imageController.text = widget.existingProduct!.imageUrls.join(', ');
      _nameController.text = widget.existingProduct!.name;
      _descriptionController.text = widget.existingProduct!.description;
      _priceController.text = widget.existingProduct!.price.toString();
      _averageRatingController.text = widget.existingProduct!.averageRating.toString(); // Inicializa la calificación
      _ratingCountController.text = widget.existingProduct!.ratingCount.toString(); // Inicializa el conteo de calificaciones
    }
  }

  void _submit() async {
    final imageUrls = _imageController.text.split(',').map((url) => url.trim()).toList();
    final productId = widget.documentId ?? UniqueKey().toString();

    final product = Product(
      id: productId,
      imageUrls: imageUrls,
      name: _nameController.text,
      description: _descriptionController.text,
      price: double.tryParse(_priceController.text) ?? 0,
      averageRating: double.tryParse(_averageRatingController.text) ?? 0, // Agrega la calificación promedio
      ratingCount: int.tryParse(_ratingCountController.text) ?? 0, // Agrega el conteo de calificaciones
    );

    if (widget.documentId == null) {
      await _firestoreService.addProduct(product); // Llama al servicio para agregar el producto
    } else {
      await _firestoreService.updateProduct(widget.documentId!, product); // Llama al servicio para actualizar el producto
    }

    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.documentId == null ? 'Add Product' : 'Update Product'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _imageController,
              decoration: InputDecoration(labelText: 'Image URLs (separated by commas)'),
            ),
            TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            TextField(
              controller: _priceController,
              decoration: InputDecoration(labelText: 'Price'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: _averageRatingController,
              decoration: InputDecoration(labelText: 'Average Rating'), // Campo para calificación promedio
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: _ratingCountController,
              decoration: InputDecoration(labelText: 'Rating Count'), // Campo para conteo de calificaciones
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submit,
              child: Text(widget.documentId == null ? 'Add Product' : 'Update Product'),
            ),
          ],
        ),
      ),
    );
  }
}
