import 'dart:convert';
import 'package:http/http.dart' as http;

class TranslationService {
  // Vercel에 배포된 Next.js API 엔드포인트
  static const String _baseUrl = 'https://english-vocab-app.vercel.app/api/translate';
  
  Future<String> translateText(String text, String from, String to) async {
    try {
      final response = await http.post(
        Uri.parse(_baseUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'text': text,
          'from': from,
          'to': to,
        }),
      );

      final data = jsonDecode(response.body);
      
      if (response.statusCode == 200) {
        return data['translatedText'];
      } else {
        // 서버에서 보낸 에러 메시지 사용
        throw Exception(data['error'] ?? 'Translation failed');
      }
    } catch (e) {
      if (e is Exception) {
        rethrow;
      }
      throw Exception('Translation error: $e');
    }
  }

  Future<String> translateToKorean(String text) async {
    return translateText(text, 'en', 'ko');
  }

  Future<String> translateToEnglish(String text) async {
    return translateText(text, 'ko', 'en');
  }
} 