import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/vocabulary_provider.dart';

class AddVocabularyDialog extends ConsumerStatefulWidget {
  const AddVocabularyDialog({super.key});

  @override
  ConsumerState<AddVocabularyDialog> createState() => _AddVocabularyDialogState();
}

class _AddVocabularyDialogState extends ConsumerState<AddVocabularyDialog> {
  final _englishController = TextEditingController();
  final _koreanController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _englishController.dispose();
    _koreanController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('✨ 새로운 단어 추가'),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _englishController,
              decoration: const InputDecoration(
                labelText: '영어',
                hintText: '새로 외울 영단어를 입력하세요',
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return '영어 단어를 입력해주세요';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _koreanController,
              decoration: const InputDecoration(
                labelText: '한글',
                hintText: '단어의 한글 의미를 입력하세요',
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return '한글 뜻을 입력해주세요';
                }
                return null;
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('취소'),
        ),
        TextButton(
          onPressed: () async {
            if (_formKey.currentState!.validate()) {
              await ref.read(vocabularyNotifierProvider.notifier).addVocabulary(
                    _englishController.text,
                    _koreanController.text,
                  );
              if (context.mounted) {
                Navigator.of(context).pop();
              }
            }
          },
          child: const Text('추가'),
        ),
      ],
    );
  }
} 