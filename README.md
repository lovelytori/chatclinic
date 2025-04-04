# chatclinic.ai 🧠💬

> 감정에 과부하 걸리셨나요?

이곳은 GPT 기반 감정 진료소입니다.  
Monday (팩폭봇)과 개봇 (응원봇)이 교대로 감정 응급실을 운영합니다.

## 사용 방법

1. `.env`에 OpenAI API 키를 추가하세요.
2. `npm install`
3. `npm start`
4. POST 요청:
   - `/api/monday` → 먼데이한테
   - `/api/gaebot` → 개발친구한테

## 예시 요청

```json
POST /api/monday
{
  "message": "나 오늘 아무것도 안 했어"
}
