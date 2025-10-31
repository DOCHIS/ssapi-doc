# SSAPI Nginx 설정 파일

## 도메인별 프록시 설정

각 도메인을 해당 내부 포트로 프록시하는 nginx 설정 파일들입니다.

### 포트 매핑

| 도메인 | 외부 포트 | 내부 포트 | 용도 |
|--------|-----------|-----------|------|
| ssapi.kr | 80 | 27000 | 메인 사이트 |
| socket.ssapi.kr | 80 | 27010 | Socket.IO API |
| api.ssapi.kr | 80 | 27011 | REST API |
| cdn.ssapi.kr | 80 | 27012 | CDN |
| dashboard.ssapi.kr | 80 | 20020 | 대시보드 |
| nyaboard.ssapi.kr | 80 | 30013 | 냐보드 |

## 설치 방법

### 1. 설정 파일 복사

```bash
# sites-available로 복사
sudo cp nginx-configs/* /etc/nginx/sites-available/
```

### 2. 심볼릭 링크 생성 (sites-enabled)

```bash
# 모든 사이트 활성화
sudo ln -sf /etc/nginx/sites-available/ssapi.kr /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/socket.ssapi.kr /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/api.ssapi.kr /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/cdn.ssapi.kr /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/dashboard.ssapi.kr /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/nyaboard.ssapi.kr /etc/nginx/sites-enabled/
```

### 3. 기본 사이트 비활성화 (선택사항)

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 4. 설정 테스트 및 재시작

```bash
# 설정 파일 문법 검사
sudo nginx -t

# nginx 재시작
sudo systemctl restart nginx

# nginx 상태 확인
sudo systemctl status nginx
```

## 개별 사이트 관리

### 특정 사이트 활성화

```bash
sudo ln -sf /etc/nginx/sites-available/ssapi.kr /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

### 특정 사이트 비활성화

```bash
sudo rm /etc/nginx/sites-enabled/ssapi.kr
sudo systemctl reload nginx
```

## 특별 설정

### socket.ssapi.kr
- WebSocket 업그레이드 헤더 포함
- 긴 연결 타임아웃 설정 (86400초)

### cdn.ssapi.kr
- 캐싱 설정 포함 (1일)
- CORS 헤더 추가

## 로그 위치

- 액세스 로그: `/var/log/nginx/access.log`
- 에러 로그: `/var/log/nginx/error.log`

## 문제 해결

### 포트가 이미 사용 중인 경우

```bash
# 80 포트 사용 확인
sudo netstat -tlnp | grep :80
sudo lsof -i :80
```

### nginx 재시작 실패

```bash
# 자세한 에러 로그 확인
sudo journalctl -xeu nginx

# 설정 파일 검증
sudo nginx -t
```
