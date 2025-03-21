// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vocabulary.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$VocabularyImpl _$$VocabularyImplFromJson(Map<String, dynamic> json) =>
    _$VocabularyImpl(
      id: (json['id'] as num).toInt(),
      createdAt: DateTime.parse(json['created_at'] as String),
      userId: json['user_id'] as String,
      english: json['english'] as String,
      korean: json['korean'] as String,
      favorite: json['favorite'] as bool? ?? false,
      lastReviewed:
          json['last_reviewed'] == null
              ? null
              : DateTime.parse(json['last_reviewed'] as String),
      reviewCount: (json['review_count'] as num?)?.toInt() ?? 0,
    );

Map<String, dynamic> _$$VocabularyImplToJson(_$VocabularyImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'created_at': instance.createdAt.toIso8601String(),
      'user_id': instance.userId,
      'english': instance.english,
      'korean': instance.korean,
      'favorite': instance.favorite,
      'last_reviewed': instance.lastReviewed?.toIso8601String(),
      'review_count': instance.reviewCount,
    };
