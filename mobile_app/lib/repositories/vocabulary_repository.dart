import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/vocabulary.dart';

class VocabularyRepository {
  final SupabaseClient _client = Supabase.instance.client;
  static const String _table = 'vocabulary';

  // 모든 단어 가져오기
  Future<List<Vocabulary>> getAllVocabulary() async {
    final response = await _client.from(_table).select().order('created_at');
    return response.map((json) => Vocabulary.fromJson(json)).toList();
  }

  // 즐겨찾기한 단어만 가져오기
  Future<List<Vocabulary>> getFavoriteVocabulary() async {
    final response = await _client
        .from(_table)
        .select()
        .eq('favorite', true)
        .order('created_at');
    return response.map((json) => Vocabulary.fromJson(json)).toList();
  }

  // 단어 추가
  Future<Vocabulary> addVocabulary(String english, String korean) async {
    final response = await _client.from(_table).insert({
      'english': english,
      'korean': korean,
      'user_id': _client.auth.currentUser!.id,
    }).select().single();
    return Vocabulary.fromJson(response);
  }

  // 단어 수정
  Future<Vocabulary> updateVocabulary(Vocabulary vocabulary) async {
    final response = await _client
        .from(_table)
        .update(vocabulary.toJson())
        .eq('id', vocabulary.id)
        .select()
        .single();
    return Vocabulary.fromJson(response);
  }

  // 단어 삭제
  Future<void> deleteVocabulary(int id) async {
    await _client.from(_table).delete().eq('id', id);
  }

  // 즐겨찾기 토글
  Future<Vocabulary> toggleFavorite(Vocabulary vocabulary) async {
    final response = await _client
        .from(_table)
        .update({'favorite': !vocabulary.favorite})
        .eq('id', vocabulary.id)
        .select()
        .single();
    return Vocabulary.fromJson(response);
  }

  // 학습 완료 표시
  Future<Vocabulary> markAsReviewed(Vocabulary vocabulary) async {
    final response = await _client.from(_table).update({
      'last_reviewed': DateTime.now().toIso8601String(),
      'review_count': vocabulary.reviewCount + 1,
    }).eq('id', vocabulary.id).select().single();
    return Vocabulary.fromJson(response);
  }
} 