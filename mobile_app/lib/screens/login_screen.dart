import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _authService = AuthService();
  bool _isLoading = false;
  String? _error;

  Future<void> _signInWithGoogle() async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      print('Attempting to sign in with Google...');
      final session = await _authService.signInWithGoogle();
      print('Sign in successful, session: ${session?.user.email}');
      
      if (!mounted) return;
      
      if (session != null) {
        print('Session obtained, navigating to home screen...');
        context.go('/');
      } else {
        setState(() {
          _error = '로그인에 실패했습니다. 다시 시도해주세요.';
        });
      }
    } catch (e) {
      print('Error in login screen: $e');
      if (!mounted) return;
      
      setState(() {
        _error = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
        print('Error message set: $_error');
      });
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('로그인'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (_error != null) ...[
              Text(
                _error!,
                style: const TextStyle(color: Colors.red),
              ),
              const SizedBox(height: 16),
            ],
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _isLoading ? null : _signInWithGoogle,
                icon: const Icon(Icons.g_mobiledata),
                label: const Text('Google로 로그인'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black87,
                ),
              ),
            ),
            if (_isLoading) ...[
              const SizedBox(height: 16),
              const CircularProgressIndicator(),
            ],
          ],
        ),
      ),
    );
  }
} 