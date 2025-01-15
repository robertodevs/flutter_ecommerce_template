import 'package:flutter/material.dart';
import 'service/chat_service.dart'; // Asegúrate de que esta importación sea correcta

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  String botResponse = "¡Hola! ¿Cómo puedo ayudarte hoy?"; // Mensaje inicial
  List<String> userMessages = []; // Para almacenar los mensajes del usuario

  // Instanciamos ChatService
  final ChatService _chatService = ChatService();

  void sendMessage(String userMessage) async {
    if (userMessage.isNotEmpty) {
      setState(() {
        userMessages.add(userMessage); // Agrega el mensaje del usuario a la lista
      });

      // Llamamos al método getBotResponse de ChatService
      final response = await _chatService.getBotResponse(userMessage);
      setState(() {
        botResponse = response; // Actualiza la respuesta del bot
      });
      _controller.clear(); // Limpiar el campo de texto
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Chatbot")),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Mostrar mensajes del usuario y respuestas del bot
                    for (var message in userMessages)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4.0),
                        child: Row(
                          children: [
                            Icon(Icons.account_circle),
                            SizedBox(width: 8),
                            Expanded(child: Text(message)),
                          ],
                        ),
                      ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4.0),
                      child: Row(
                        children: [
                          Icon(Icons.chat_bubble),
                          SizedBox(width: 8),
                          Expanded(child: Text(botResponse)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(labelText: "Escribe un mensaje"),
                    onSubmitted: (message) {
                      sendMessage(message); // Enviar mensaje al presionar "Enter"
                    },
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: () {
                    sendMessage(_controller.text);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
