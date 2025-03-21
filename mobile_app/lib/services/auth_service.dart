import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/constants.dart';

class AuthService {
  final supabase = Supabase.instance.client;
  
  // 이메일로 인증 코드 요청
  Future<void> requestVerificationCode(String email) async {
    try {
      // Supabase OTP 요청
      final response = await supabase.auth.signInWithOtp(
        email: email,
        emailRedirectTo: null, // 매직 링크 비활성화
      );

      if (response.error != null) {
        throw Exception(response.error?.message ?? 'Failed to send verification code');
      }
    } catch (e) {
      throw Exception('Failed to send verification code: $e');
    }
  }

  // 인증 코드 확인 및 로그인/회원가입
  Future<AuthResponse> verifyCode(String email, String code) async {
    try {
      // Supabase OTP 검증
      final response = await supabase.auth.verifyOtp(
        email: email,
        token: code,
        type: OtpType.email,
      );

      if (response.error != null) {
        throw Exception(response.error?.message ?? 'Failed to verify code');
      }

      return response;
    } catch (e) {
      throw Exception('Failed to verify code: $e');
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