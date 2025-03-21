// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vocabulary.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

Vocabulary _$VocabularyFromJson(Map<String, dynamic> json) {
  return _Vocabulary.fromJson(json);
}

/// @nodoc
mixin _$Vocabulary {
  int get id => throw _privateConstructorUsedError;
  @JsonKey(name: 'created_at')
  DateTime get createdAt => throw _privateConstructorUsedError;
  @JsonKey(name: 'user_id')
  String get userId => throw _privateConstructorUsedError;
  String get english => throw _privateConstructorUsedError;
  String get korean => throw _privateConstructorUsedError;
  bool get favorite => throw _privateConstructorUsedError;
  @JsonKey(name: 'last_reviewed')
  DateTime? get lastReviewed => throw _privateConstructorUsedError;
  @JsonKey(name: 'review_count')
  int get reviewCount => throw _privateConstructorUsedError;

  /// Serializes this Vocabulary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Vocabulary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VocabularyCopyWith<Vocabulary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VocabularyCopyWith<$Res> {
  factory $VocabularyCopyWith(
    Vocabulary value,
    $Res Function(Vocabulary) then,
  ) = _$VocabularyCopyWithImpl<$Res, Vocabulary>;
  @useResult
  $Res call({
    int id,
    @JsonKey(name: 'created_at') DateTime createdAt,
    @JsonKey(name: 'user_id') String userId,
    String english,
    String korean,
    bool favorite,
    @JsonKey(name: 'last_reviewed') DateTime? lastReviewed,
    @JsonKey(name: 'review_count') int reviewCount,
  });
}

/// @nodoc
class _$VocabularyCopyWithImpl<$Res, $Val extends Vocabulary>
    implements $VocabularyCopyWith<$Res> {
  _$VocabularyCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Vocabulary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? createdAt = null,
    Object? userId = null,
    Object? english = null,
    Object? korean = null,
    Object? favorite = null,
    Object? lastReviewed = freezed,
    Object? reviewCount = null,
  }) {
    return _then(
      _value.copyWith(
            id:
                null == id
                    ? _value.id
                    : id // ignore: cast_nullable_to_non_nullable
                        as int,
            createdAt:
                null == createdAt
                    ? _value.createdAt
                    : createdAt // ignore: cast_nullable_to_non_nullable
                        as DateTime,
            userId:
                null == userId
                    ? _value.userId
                    : userId // ignore: cast_nullable_to_non_nullable
                        as String,
            english:
                null == english
                    ? _value.english
                    : english // ignore: cast_nullable_to_non_nullable
                        as String,
            korean:
                null == korean
                    ? _value.korean
                    : korean // ignore: cast_nullable_to_non_nullable
                        as String,
            favorite:
                null == favorite
                    ? _value.favorite
                    : favorite // ignore: cast_nullable_to_non_nullable
                        as bool,
            lastReviewed:
                freezed == lastReviewed
                    ? _value.lastReviewed
                    : lastReviewed // ignore: cast_nullable_to_non_nullable
                        as DateTime?,
            reviewCount:
                null == reviewCount
                    ? _value.reviewCount
                    : reviewCount // ignore: cast_nullable_to_non_nullable
                        as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$VocabularyImplCopyWith<$Res>
    implements $VocabularyCopyWith<$Res> {
  factory _$$VocabularyImplCopyWith(
    _$VocabularyImpl value,
    $Res Function(_$VocabularyImpl) then,
  ) = __$$VocabularyImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    int id,
    @JsonKey(name: 'created_at') DateTime createdAt,
    @JsonKey(name: 'user_id') String userId,
    String english,
    String korean,
    bool favorite,
    @JsonKey(name: 'last_reviewed') DateTime? lastReviewed,
    @JsonKey(name: 'review_count') int reviewCount,
  });
}

/// @nodoc
class __$$VocabularyImplCopyWithImpl<$Res>
    extends _$VocabularyCopyWithImpl<$Res, _$VocabularyImpl>
    implements _$$VocabularyImplCopyWith<$Res> {
  __$$VocabularyImplCopyWithImpl(
    _$VocabularyImpl _value,
    $Res Function(_$VocabularyImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Vocabulary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? createdAt = null,
    Object? userId = null,
    Object? english = null,
    Object? korean = null,
    Object? favorite = null,
    Object? lastReviewed = freezed,
    Object? reviewCount = null,
  }) {
    return _then(
      _$VocabularyImpl(
        id:
            null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                    as int,
        createdAt:
            null == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                    as DateTime,
        userId:
            null == userId
                ? _value.userId
                : userId // ignore: cast_nullable_to_non_nullable
                    as String,
        english:
            null == english
                ? _value.english
                : english // ignore: cast_nullable_to_non_nullable
                    as String,
        korean:
            null == korean
                ? _value.korean
                : korean // ignore: cast_nullable_to_non_nullable
                    as String,
        favorite:
            null == favorite
                ? _value.favorite
                : favorite // ignore: cast_nullable_to_non_nullable
                    as bool,
        lastReviewed:
            freezed == lastReviewed
                ? _value.lastReviewed
                : lastReviewed // ignore: cast_nullable_to_non_nullable
                    as DateTime?,
        reviewCount:
            null == reviewCount
                ? _value.reviewCount
                : reviewCount // ignore: cast_nullable_to_non_nullable
                    as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$VocabularyImpl implements _Vocabulary {
  const _$VocabularyImpl({
    required this.id,
    @JsonKey(name: 'created_at') required this.createdAt,
    @JsonKey(name: 'user_id') required this.userId,
    required this.english,
    required this.korean,
    this.favorite = false,
    @JsonKey(name: 'last_reviewed') this.lastReviewed,
    @JsonKey(name: 'review_count') this.reviewCount = 0,
  });

  factory _$VocabularyImpl.fromJson(Map<String, dynamic> json) =>
      _$$VocabularyImplFromJson(json);

  @override
  final int id;
  @override
  @JsonKey(name: 'created_at')
  final DateTime createdAt;
  @override
  @JsonKey(name: 'user_id')
  final String userId;
  @override
  final String english;
  @override
  final String korean;
  @override
  @JsonKey()
  final bool favorite;
  @override
  @JsonKey(name: 'last_reviewed')
  final DateTime? lastReviewed;
  @override
  @JsonKey(name: 'review_count')
  final int reviewCount;

  @override
  String toString() {
    return 'Vocabulary(id: $id, createdAt: $createdAt, userId: $userId, english: $english, korean: $korean, favorite: $favorite, lastReviewed: $lastReviewed, reviewCount: $reviewCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VocabularyImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.english, english) || other.english == english) &&
            (identical(other.korean, korean) || other.korean == korean) &&
            (identical(other.favorite, favorite) ||
                other.favorite == favorite) &&
            (identical(other.lastReviewed, lastReviewed) ||
                other.lastReviewed == lastReviewed) &&
            (identical(other.reviewCount, reviewCount) ||
                other.reviewCount == reviewCount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    createdAt,
    userId,
    english,
    korean,
    favorite,
    lastReviewed,
    reviewCount,
  );

  /// Create a copy of Vocabulary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VocabularyImplCopyWith<_$VocabularyImpl> get copyWith =>
      __$$VocabularyImplCopyWithImpl<_$VocabularyImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$VocabularyImplToJson(this);
  }
}

abstract class _Vocabulary implements Vocabulary {
  const factory _Vocabulary({
    required final int id,
    @JsonKey(name: 'created_at') required final DateTime createdAt,
    @JsonKey(name: 'user_id') required final String userId,
    required final String english,
    required final String korean,
    final bool favorite,
    @JsonKey(name: 'last_reviewed') final DateTime? lastReviewed,
    @JsonKey(name: 'review_count') final int reviewCount,
  }) = _$VocabularyImpl;

  factory _Vocabulary.fromJson(Map<String, dynamic> json) =
      _$VocabularyImpl.fromJson;

  @override
  int get id;
  @override
  @JsonKey(name: 'created_at')
  DateTime get createdAt;
  @override
  @JsonKey(name: 'user_id')
  String get userId;
  @override
  String get english;
  @override
  String get korean;
  @override
  bool get favorite;
  @override
  @JsonKey(name: 'last_reviewed')
  DateTime? get lastReviewed;
  @override
  @JsonKey(name: 'review_count')
  int get reviewCount;

  /// Create a copy of Vocabulary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VocabularyImplCopyWith<_$VocabularyImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
