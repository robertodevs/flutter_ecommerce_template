import 'package:cloud_firestore/cloud_firestore.dart';

class ChatService {
  Future<String> getBotResponse(String userMessage) async {
    try {
      // Consulta el documento donde el campo 'input' coincide con el mensaje del usuario
      final querySnapshot = await FirebaseFirestore.instance
          .collection('responses') // Asegúrate de usar el nombre correcto de la colección en Firestore
          .where('input', isEqualTo: userMessage.toLowerCase()) // Busca el mensaje en minúsculas
          .get();

      if (querySnapshot.docs.isNotEmpty) {
        // Retorna la respuesta del bot
        return querySnapshot.docs.first['response'];
      } else {
        return "Lo siento, no entendí tu mensaje. ¿Puedes intentar con algo más específico?";
      }
    } catch (e) {
      return "Hubo un error al procesar tu mensaje. Intenta nuevamente.";
    }
  }
}
