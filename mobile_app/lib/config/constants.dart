class Constants {
  // iOS 시뮬레이터에서는 localhost 대신 127.0.0.1 사용
  static const String apiBaseUrl = 'http://127.0.0.1:3000';  // iOS 시뮬레이터
  // static const String apiBaseUrl = 'http://10.0.2.2:3000';  // Android 에뮬레이터
  // static const String apiBaseUrl = 'http://192.168.0.X:3000';  // 실제 기기 테스트 (X를 컴퓨터의 IP로 변경)
  // static const String apiBaseUrl = 'https://your-production-url.com';  // 프로덕션 환경
} 