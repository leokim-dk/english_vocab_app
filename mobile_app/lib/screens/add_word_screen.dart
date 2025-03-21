import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/translation_service.dart';
import '../providers/auth_provider.dart';
import '../providers/vocabulary_provider.dart';

class AddWordScreen extends ConsumerStatefulWidget {
  const AddWordScreen({super.key});

  @override
  ConsumerState<AddWordScreen> createState() => _AddWordScreenState();
}

class _AddWordScreenState extends ConsumerState<AddWordScreen> {
  final _translationService = TranslationService();
  final _textController = TextEditingController();
  
  String _translatedText = '';
  bool _isTranslating = false;
  bool _isSaving = false;
  String _error = '';
  String _sourceLang = 'en';
  String _targetLang = 'ko';

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _handleTextChanged(String text) {
    // 한글이 포함되어 있으면 한국어 -> 영어로 설정
    if (RegExp(r'[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]').hasMatch(text)) {
      setState(() {
        _sourceLang = 'ko';
        _targetLang = 'en';
      });
    } else {
      // 그 외에는 영어 -> 한국어로 설정
      setState(() {
        _sourceLang = 'en';
        _targetLang = 'ko';
      });
    }
  }

  Future<void> _translate() async {
    final text = _textController.text.trim();
    if (text.isEmpty) {
      setState(() => _error = '번역할 텍스트를 입력해주세요');
      return;
    }

    setState(() {
      _isTranslating = true;
      _error = '';
    });

    try {
      final translated = await _translationService.translateText(
        text,
        _sourceLang,
        _targetLang,
      );
      setState(() => _translatedText = translated);
    } catch (e) {
      setState(() => _error = e.toString().replaceAll('Exception: ', ''));
    } finally {
      setState(() => _isTranslating = false);
    }
  }

  Future<void> _saveWord() async {
    if (_textController.text.trim().isEmpty || _translatedText.isEmpty) {
      setState(() => _error = '번역된 텍스트가 없습니다');
      return;
    }

    setState(() {
      _isSaving = true;
      _error = '';
    });

    try {
      final english = _sourceLang == 'en' ? _textController.text : _translatedText;
      final korean = _sourceLang == 'ko' ? _textController.text : _translatedText;
      
      await ref.read(vocabularyNotifierProvider.notifier).addVocabulary(
        english.trim(),
        korean.trim(),
      );

      setState(() {
        _textController.clear();
        _translatedText = '';
        _isSaving = false;
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('단어장에 저장되었습니다')),
        );
      }
    } catch (e) {
      setState(() => _error = '저장 중 오류가 발생했습니다');
    } finally {
      setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('번역'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => ref.read(authProvider.notifier).signOut(),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _textController,
              onChanged: _handleTextChanged,
              decoration: InputDecoration(
                labelText: _sourceLang == 'en' ? '영어' : '한국어',
                hintText: '번역할 텍스트를 입력하세요',
                border: const OutlineInputBorder(),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.clear),
                  onPressed: () {
                    _textController.clear();
                    setState(() {
                      _translatedText = '';
                      _error = '';
                    });
                  },
                ),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _isTranslating ? null : _translate,
              icon: const Icon(Icons.translate),
              label: Text(_isTranslating ? '번역 중...' : '번역하기'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 12),
              ),
            ),
            if (_error.isNotEmpty) ...[
              const SizedBox(height: 16),
              Text(
                _error,
                style: const TextStyle(color: Colors.red),
              ),
            ],
            if (_translatedText.isNotEmpty) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          _targetLang == 'en' ? '영어' : '한국어',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.add),
                          onPressed: _isSaving ? null : _saveWord,
                          tooltip: '단어장에 저장',
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      _translatedText,
                      style: const TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
} 