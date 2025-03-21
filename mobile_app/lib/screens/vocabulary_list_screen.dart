import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/vocabulary.dart';
import '../providers/vocabulary_provider.dart';
import '../providers/auth_provider.dart';
import '../widgets/add_vocabulary_dialog.dart';

class VocabularyListScreen extends ConsumerWidget {
  const VocabularyListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vocabularyAsync = ref.watch(vocabularyNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('단어장'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => ref.read(authProvider.notifier).signOut(),
          ),
        ],
      ),
      body: vocabularyAsync.when(
        data: (vocabularyList) => ListView.builder(
          itemCount: vocabularyList.length,
          itemBuilder: (context, index) {
            final vocabulary = vocabularyList[index];
            return VocabularyCard(vocabulary: vocabulary);
          },
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stackTrace) => Center(
          child: Text('Error: $error'),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) => const AddVocabularyDialog(),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class VocabularyCard extends ConsumerWidget {
  final Vocabulary vocabulary;

  const VocabularyCard({
    super.key,
    required this.vocabulary,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(vocabulary.english),
        subtitle: Text(vocabulary.korean),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
              icon: Icon(
                vocabulary.favorite ? Icons.star : Icons.star_border,
                color: vocabulary.favorite ? Colors.amber : null,
              ),
              onPressed: () {
                ref
                    .read(vocabularyNotifierProvider.notifier)
                    .toggleFavorite(vocabulary);
              },
            ),
            IconButton(
              icon: const Icon(Icons.delete),
              onPressed: () {
                ref
                    .read(vocabularyNotifierProvider.notifier)
                    .deleteVocabulary(vocabulary.id);
              },
            ),
          ],
        ),
      ),
    );
  }
} 