import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../models/vocabulary.dart';
import '../repositories/vocabulary_repository.dart';

part 'vocabulary_provider.g.dart';

@riverpod
class VocabularyNotifier extends _$VocabularyNotifier {
  late final VocabularyRepository _repository = VocabularyRepository();

  @override
  Future<List<Vocabulary>> build() async {
    return _repository.getAllVocabulary();
  }

  Future<void> addVocabulary(String english, String korean) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.addVocabulary(english, korean);
      return _repository.getAllVocabulary();
    });
  }

  Future<void> updateVocabulary(Vocabulary vocabulary) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.updateVocabulary(vocabulary);
      return _repository.getAllVocabulary();
    });
  }

  Future<void> deleteVocabulary(int id) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.deleteVocabulary(id);
      return _repository.getAllVocabulary();
    });
  }

  Future<void> toggleFavorite(Vocabulary vocabulary) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.toggleFavorite(vocabulary);
      return _repository.getAllVocabulary();
    });
  }

  Future<void> markAsReviewed(Vocabulary vocabulary) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.markAsReviewed(vocabulary);
      return _repository.getAllVocabulary();
    });
  }
}

@riverpod
class FavoriteVocabularyNotifier extends _$FavoriteVocabularyNotifier {
  late final VocabularyRepository _repository = VocabularyRepository();

  @override
  Future<List<Vocabulary>> build() async {
    return _repository.getFavoriteVocabulary();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => _repository.getFavoriteVocabulary());
  }
} 