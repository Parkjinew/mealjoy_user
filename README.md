# :pushpin: Mealjoy_user
>GPT를 활용한 메뉴추천 챗봇과 주문 및 웨이팅 플랫폼 서비스       
>일반 사용자용 앱
>
>### [Mealjoy_owner](https://github.com/leehakgun/mealjoy_owner)           
>자영업자용 앱
>
>### [Mealjoy_admin](https://github.com/jjjjjjj12345/mealjoy_admin)
>관리자용 웹

</br>

## 1. 제작 기간 & 참여 인원
- 2024년 3월 15일 ~ 4월 15일
- 팀 프로젝트
- 팀장 이건학
- 팀원 강재희
- 팀원 정상권
- 팀원 고보미
- 팀원 박지뉴
- 팀원 지수빈

</br>

## 2. 사용 기술
#### `Back-end`
  - Java
  - Spring Boot
  - MySQL 8.5.26
  - Python 3.9
  - Tomcat
  - Mybatis
#### `Front-end`
  - React Native
  - Javascript
  - Axios
#### `API`
  - Kakao Map API
  - PortOne API
#### `Model`
  - LSTM
  - KoELECTRA
  - Fast API
</br>

## 3. ERD 설계
![erd](https://github.com/Parkjinew/mealjoy_user/assets/153901490/42a5170d-ddfc-4d28-9644-cd6aca4c5390)


## 4. 핵심 기능
- 메뉴 추천 챗봇
- 방문 전 주문
- 원격 줄서기
- 예약
- 리뷰 등록
- 사용자 현재 위치 확인
- aws 서버 배포 및 빌드


<details>
<summary><b>핵심 기능 설명 펼치기</b></summary>
<div markdown="1">

### 4.1. 사용기술
![image](https://github.com/Parkjinew/mealjoy_user/assets/114290412/7328453d-d9ce-4219-a848-173edc764d4c)
<br>

### 4.2. 챗봇
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/b35ec733-6a94-4068-aeea-e176fc0569b1" width="25%">
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/8015945e-5bb5-45fb-a243-e2400ac5b8f7" width="25%">

<br>

- 챗봇
- 
<br>

### 4.3. 방문 전 주문
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/bfbdf953-acc9-4724-aa0d-2d43cbce8650" width="25%">
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/f350f749-6464-4f94-bd47-583b30a7fdd6" width="25%">

<br>

- 현재 매장의 테이블 상태를 확인
- 만약 비어있는 테이블이 있다면 선택 후 메뉴 또한 선택
- 결제버튼을 누르면 PortOne API를 이용하여 결제
- 결제가 완료되면 선택한 테이블과 메뉴를 spring boot 서버에 전송
- 자영업자용 리액트 네이티브에서 응답받은 후 알림기능으로 자영업자에게 알림

<br>

### 4.4. 원격 줄서기
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/11f77ae9-adcd-4ab7-860c-bd966f3425b5" width="25%">
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/6a6dc838-5846-4960-82d0-28ecfef3984c" width="25%">

 <br>
 
- 현재 매장의 테이블 상태를 확인
- 만약 비어있는 테이블이 없다면 원격 줄서기 가능
- 현재 로그인된 회원의 정보를 spring boot에 전송
- 줄서기 테이블에 회원의 정보 입력
- 만약 자영업자 앱에서 부르기를 하면 줄서기 테이블에서 상태변경
- 본인 앞의 대기 팀의 현황을 한 눈에 볼 수 있음

<br>

### 4.5. 예약
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/32722020-6eed-4836-9198-51c604003c4f" width="25%">
 <br>

- 매장의 예약하기 버튼을 클릭
- 날짜, 시간, 인원 수, 예약자명을 입력
- 나의 예약페이지에서 확인가능
- 예약이 확정되었는지 색깔로 확인 가능

<br>

### 4.6. 리뷰 작성
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/3955de3a-95a6-4fc9-910e-a9a527363a17" width="25%">
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/400ba2a2-29bb-49b1-8b42-ad9c15414c5e" width="25%">
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/ba6eac4f-91ce-42ee-a859-de5f7d135cf8" width="25%">

 <br>
 
- 사진을 데이터베이스에 담기에는 부하가 크가도 판단하여 클라우드 사용
- 갤러리 접근 권한을 부여한 후에 리뷰에 올릴 사진을 선택
- 사진의 이미지 값은 handle함수에서 selectedimages로 저장
- uploadimage함수에서 파이어베이스 스토리지에 사진을 업로드하는 로직 구성
- 파이어베이스 스토리지에 이미지 URL을 반환
- handlesubmitreview함수를 이용해서 imageURLS에 파이어베이스에서 받은 URL을 저장 후 서버에 전송
- mybatis의 mapper를 이용해서 데이터베이스에 저장

<br>

### 4.7. 사용자 현재 위치 확인
<img src = "https://github.com/Parkjinew/mealjoy_user/assets/114290412/663a8f07-7245-4be3-a586-68f261795008" width="25%">
<br>

- 사용자의 위치권한을 요청 후 수락
- 사용자의 현재위치의 경도와 위도를 추출
- google maps geocoding API를 이용하여 위도와 경도를 주소형태로 변환
- 사용자들에게 인터페이스로 보여지게 됨

<br>

### 4.8. aws 서버 배포 및 빌드
![image](https://github.com/Parkjinew/mealjoy_user/assets/114290412/de8be8e6-3d9b-40e8-a7c2-cca46f5d2dd4)
![image](https://github.com/Parkjinew/mealjoy_user/assets/114290412/7c2cbcca-885a-4b2b-a2f8-247e2cb75b5d)

<br>

- 균형 잡힌 컴퓨팅 성능과 높은 메모리 용량 그리고 무엇보다 비용효율적인 선택을 하기위해 m5a.4xlarge인스턴스 유형 선택
- EC2 보안그룹 필요한 포트들의 규칙 생성
- vscode에 ssh로 연결
- docker생성
- 빌드진행 중 오류 발생
    - 원래 통신은 http로 사용 그러나 빌드를 하니 자동으로 https로 변환되어 통신
    - 인증서를 필요로해 자체 서명 인증서 생성
    - 그러나 자체 서명 인증서는 신뢰도가 떨어져서 여전히 네트워크 오류 발생
    - 그래서 앱자체에 http를 사용가능하도록 권한을 설정
        - 빌드 성공!

<br>

</div>
</details>

</br>
 
## 5. 팀원 소개

<details>
<summary><b>팀장 이건학</b></summary>
<div markdown="1">

#### `Front-End`
 - 주문완료
 - 예약완료
 - 예약취소
 - 마이페이지
 - 알림
 - 리뷰관리
 - 문의
 - 매장목록

</div>
</details> 

<details>
<summary><b>팀원 강재희</b></summary>
<div markdown="1">

#### `Front-End`
- 원격 줄서기
- 예약 목록
- 예약 완료
</div>
</details>

<details>
<summary><b>팀원 정상권</b></summary>
<div markdown="1">

</div>
</details>

<details>
<summary><b>팀원 고보미</b></summary>
<div markdown="1">
  
#### `Front-End`
- 주문
- 매장 정보 확인
- 예약

</div>
</details>

<details>
<summary><b>팀원 박지뉴</b></summary>
<div markdown="1">
  
#### `Front-End`
- 메인
- 챗봇
- 검색결과
- 관심매장
- 주문목록
- 리뷰작성
- 정보수정
- 위치수정
- 문의작성
- 문의확인

#### `Back-end`
- 검색결과 기능 구현
- 관심매장 기능 구현
- 정보수정 기능 구현
- 마이페이지 기능 구현
- 주문목록 기능 구현
- 예약목록 기능 구현
- 문의학기 기능 구현
- 문의확인 기능 구현
- 리뷰작성 기능 구현
- 리뷰관리 기능 구현
- 회원가입 기능 구현
- 로그인 기능 구현

#### API
- 현재위치 설정 geolocation API
- 주소설정 주소찾기 카카오API

#### 배포
- aws 서버 배포
- docker 생성

#### GIT
- git 연동
  
</div>
</details>

<details>
<summary><b>팀원 지수빈</b></summary>
<div markdown="1">
  
#### `Front-End`
- 알림

#### `Back-end`
- 메인 페이지 기능 구현
- 매장 목록 기능 구현
- 매장 상세 페이지 기능 구현
- 예약 기능 구현
- 원격 줄서기 기능 구현
- 주문 기능 구현
- 매장별 리뷰 목록 출력 기능 구현
- 챗봇(메뉴 추천, 매장 검색) 기능 구현
- 알림 기능 구현
- 알림 목록 출력 기능 구현
- 원격 줄서기 현황 출력 기능 구현
- 관심 등록 기능 구현
- firebase storage 연동

#### Modeling
- LSTM을 활용한 의도분류 모델
- Fast API
- KoELECTRA를 사용한 개체명인식(NER)

#### API
- 결제 PortOne API
- 메뉴 추천 OpenAI API

#### DB
- DB설계 및 구축, 관리

#### 배포 및 빌드
- aws 서버 배포 및 빌드
</div>
</details>
