import 'package:freezed_annotation/freezed_annotation.dart';

part 'vocabulary.freezed.dart';
part 'vocabulary.g.dart';

@freezed
class Vocabulary with _$Vocabulary {
  const factory Vocabulary({
    required int id,
    @JsonKey(name: 'created_at') required DateTime createdAt,
    @JsonKey(name: 'user_id') required String userId,
    required String english,
    required String korean,
    @Default(false) bool favorite,
    @JsonKey(name: 'last_reviewed') DateTime? lastReviewed,
    @JsonKey(name: 'review_count') @Default(0) int reviewCount,
  }) = _Vocabulary;

  factory Vocabulary.fromJson(Map<String, dynamic> json) =>
      _$VocabularyFromJson(json);
} 