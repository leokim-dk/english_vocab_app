import 'dart:convert';
import 'dart:math';
import 'package:crypto/crypto.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/constants.dart';
import 'dart:async';
import 'package:flutter/foundation.dart';

class AuthService {
  final supabase = Supabase.instance.client;
  
  // Google 로그인
  Future<Session?> signInWithGoogle() async {
    try {
      print('Starting Google Sign In process...');
      
      if (kIsWeb) {
        throw Exception('Web login is not supported');
      }
      
      print('Initializing GoogleSignIn with clientId...');
      // 네이티브 Google 로그인 사용
      final GoogleSignIn googleSignIn = GoogleSignIn(
        clientId: '562502868390-3h5falvulc33bk6gdd587e4v3s95aanv.apps.googleusercontent.com',  // iOS clientId
      );
      
      print('Requesting Google sign in...');
      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
      if (googleUser == null) {
        print('User cancelled the sign in process');
        throw Exception('Google sign in was aborted');
      }
      
      print('Google sign in successful. User email: ${googleUser.email}');
      print('Requesting Google authentication...');
      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      print('Got Google authentication tokens:');
      print('ID Token length: ${googleAuth.idToken?.length ?? 0}');
      print('Access Token length: ${googleAuth.accessToken?.length ?? 0}');
      
      print('Authenticating with Supabase using Google tokens...');
      final AuthResponse res = await supabase.auth.signInWithIdToken(
        provider: OAuthProvider.google,
        idToken: googleAuth.idToken!,
        accessToken: googleAuth.accessToken,
      );
      
      print('Supabase authentication successful:');
      print('User ID: ${res.session?.user.id}');
      print('User email: ${res.session?.user.email}');
      print('Session expires at: ${res.session?.expiresAt}');
      
      return res.session;
    } catch (e) {
      print('Error during Google sign in: $e');
      if (e is AuthException) {
        print('Auth error details:');
        print('Message: ${e.message}');
      }
      throw Exception('Failed to sign in with Google: $e');
    }
  }

  // 로그아웃
  Future<void> signOut() async {
    await supabase.auth.signOut();
  }

  // 현재 로그인된 사용자 가져오기
  User? getCurrentUser() {
    return supabase.auth.currentUser;
  }

  // 세션 상태 스트림
  Stream<AuthState> get authStateChanges => supabase.auth.onAuthStateChange;
} 