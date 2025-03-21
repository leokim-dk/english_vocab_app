import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

part 'auth_provider.g.dart';

@riverpod
Stream<User?> authState(AuthStateRef ref) {
  return Supabase.instance.client.auth.onAuthStateChange.map((event) => event.session?.user);
}

@riverpod
class Auth extends _$Auth {
  @override
  User? build() {
    return Supabase.instance.client.auth.currentUser;
  }

  Future<void> signOut() async {
    await Supabase.instance.client.auth.signOut();
  }
} 