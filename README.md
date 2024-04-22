# :pushpin: BotBuddies
>GPT를 활용한 메뉴추천 챗봇과 주문 및 웨이팅 플랫폼 서비스

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
  - Ajax
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

### 4.1. 전체 흐름
![시스템 아키텍쳐](https://github.com/illhanunjung/Hwado-final/assets/153901490/bae78183-b86a-4ac2-b16a-053209b4b2a2)
<br>

### 4.2. 추천 알고리즘
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/fd7b2699-2010-40b8-8987-bf0517e65e41)
<br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/resources/py/RecommendationAlgorithm.py)
- VGG16은 이미지 분류에 널리 사용되는 심층 학습 모델입니다. 여기서는 이미지의 특징을 추출하기 위해 VGG16의 weights='imagenet'와 include_top=False 옵션을 사용하여 모델을 로드합니다.
- extract_features 함수는 주어진 이미지 경로에서 이미지를 로드하고, VGG16 모델을 사용하여 이미지의 특징 벡터를 추출합니다. 이 벡터는 이미지의 시각적 콘텐츠를 수치화한 것입니다.
- extract_all_features 함수는 지정된 디렉토리 내의 모든 이미지에 대해 extract_features 함수를 호출하고, 각 이미지의 특징 벡터와 파일 이름을 저장합니다.
- find_similar_images 함수는 쿼리 이미지의 특징 벡터와 다른 모든 이미지의 특징 벡터 사이의 코사인 유사도를 계산하고, 가장 유사한 이미지들의 인덱스를 반환합니다.
- Flask를 사용하여 웹 서버를 구성하고, /get_similar_images 엔드포인트를 통해 이미지 추천 기능을 제공합니다. 클라이언트가 이 엔드포인트로 POST 요청을 보내면, 요청된 이미지와 유사한 이미지를 찾아 반환합니다.
- 서버 측에서 예외가 발생하면, 이를 클라이언트에 전달하여 에러 메시지를 표시할 수 있도록 합니다.
- 마지막으로, 스크립트는 지정된 IP 주소와 포트에서 Flask 애플리케이션을 실행합니다.
<br>

### 4.3. 메이슨리 라이브러리 ( 자유 레이아웃 )
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/d0da0406-2050-43a1-9cf9-d3f005046244)
<br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/main.jsp)
- 메이슨리와 관련된 JavaScript 라이브러리와 의존성들이 추가되어 있습니다. 예를 들어, masonry.pkgd.min.js와 imagesloaded.pkgd.min.js 스크립트가 HTML 헤더 부분에 포함되어 있습니다.
- HTML에서 메이슨리를 적용할 요소들을 정의합니다. 이 경우, div 태그와 클래스 list2를 사용하여 메이슨리 레이아웃이 적용될 영역을 지정하고 있습니다. 각 아이템은 list2-item 클래스를 사용하여 정의됩니다.
- 메이슨리 레이아웃의 각 아이템에 대한 스타일을 CSS를 통해 정의합니다. 여기서는 .list2-item에 대한 스타일을 지정하여 각 항목의 너비, 여백 등을 설정합니다.
- 페이지의 JavaScript 부분에서 메이슨리 라이브러리를 초기화하고 설정합니다. $(window).on('load', function(){ ... }); 코드 블록 내에서 메이슨리를 초기화하고, 각 항목(itemSelector)의 선택자와 열(columnWidth)의 너비 등을 지정합니다.
<br>

### 4.4. Kakao Login API
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/e9123860-feb2-4a9b-bc4a-f0ea868fd70d)
 <br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/signin.jsp)
- 웹 페이지에는 카카오 SDK를 초기화하기 위한 스크립트가 포함되어 있습니다.
window.Kakao.init('사용자 키'); 코드를 사용하여 카카오 SDK를 초기화합니다. 여기서 제공된 문자열은 카카오 앱의 JavaScript 키입니다.
- 회원가입 폼에는 "카카오 본인인증" 버튼(<button type="button" id="verifyButton" class="btn btn-primary" onclick="kakaoLogin()"> 카카오 본인인증 </a></button>)이 있습니다.
이 버튼을 클릭하면 kakaoLogin 함수가 호출됩니다.
- kakaoLogin 함수는 카카오 로그인을 통해 사용자의 이름, 생일, 출생년도에 접근합니다. 이를 위해 scope에 'name', 'birthday', 'birthyear'를 요청합니다.
사용자가 로그인에 성공하면, window.Kakao.API.request 함수를 사용하여 사용자 정보를 요청합니다.
- 사용자 정보 요청이 성공하면, 반환된 데이터에서 사용자의 이름, 생일, 출생년도를 추출합니다.
이 정보는 숨겨진 입력 필드(<input type="hidden" name="user_name" id="kakaoUserName" />, <input type="hidden" name="user_birthdate" id="kakaoUserBirthdate" />)에 저장됩니다.
- 회원가입 버튼 클릭 시, isVerified 변수를 확인하여 본인인증이 완료되었는지 검사합니다.
본인인증이 완료되지 않았다면, 폼 제출을 중단하고 사용자에게 본인인증을 요청하는 알림을 표시합니다.
<br>

### 4.5. PortOne API
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/7d7e7429-ad75-4b6e-8520-07bc7a709319)
 <br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/purchase.jsp)
- 페이지에는 Iamport 결제 관련 JavaScript 라이브러리가 포함되어 있어 API 기능을 사용할 수 있습니다.
- var IMP = window.IMP; IMP.init("imp85467522");: 이 코드를 통해 Iamport를 초기화합니다. 여기서 "imp85467522"는 Iamport에서 제공한 고유한 가맹점 식별자입니다.
- function requestPay() { ... }: 사용자가 '구매' 버튼을 클릭하면 이 함수가 실행됩니다. 이 함수는 사용자의 입력 데이터와 함께 Iamport 결제 요청을 처리합니다.
- 사용자로부터 이름, 전화번호, 주소 등의 정보를 입력 받습니다. 이 데이터는 결제 요청에 포함됩니다.
- 서버에 Ajax 요청을 보내 결제에 필요한 데이터(예: 상품명, 가격)를 받아옵니다. 받아온 데이터는 response 변수에 저장되며, 이후 Iamport 결제 요청에 사용됩니다.
- IMP.request_pay({...}): 이 함수를 통해 실제 결제 창을 호출합니다. 여기에는 결제 관련 상세 정보(결제 수단, 상품명, 가격, 구매자 정보 등)가 포함됩니다.
- 결제 정보에는 pg, pay_method, merchant_uid, name, amount, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode 등의 필드가 포함되어, 이를 통해 결제 과정에서 필요한 모든 정보를 Iamport에 전달합니다.
<br>

### 4.6. 스마트 택배 API
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/722f9784-e801-4422-8493-724d88998e89)
 <br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/delivery.jsp)
-  먼저, 스마트택배 서비스에서 API 키를 발급받습니다. 이 키는 웹 페이지나 애플리케이션의 코드 내에서 보안상의 이유로 숨겨져야 합니다.
이를 위해 HTML의 input 요소에 type="hidden" 속성을 사용하여 API 키를 숨겼습니다.
- 사용자가 다양한 택배 회사 중에서 선택할 수 있는 드롭다운 메뉴를 제공했습니다. 이를 통해 사용자는 자신이 이용하는 택배 서비스를 쉽게 선택할 수 있습니다.
- 사용자가 자신의 운송장 번호를 입력할 수 있는 입력란을 제공합니다. 이 번호는 배송 조회를 위해 필요합니다. 사용자가 운송장 번호를 입력하고 나면, '조회' 버튼을 클릭하여 배송 상태를 확인할 수 있습니다.
- 조회 버튼을 클릭하면, 시스템은 선택된 택배 회사와 입력된 운송장 번호를 사용하여 스마트택배 API에 요청을 보냅니다. 이때 숨겨진 API 키도 함께 전송됩니다.
- 스마트택배 API로부터 반환된 배송 상태 정보는 사용자에게 표시됩니다. 이 정보에는 상품의 현재 위치, 배송 단계, 예상 도착 시간 등이 포함될 수 있습니다.
<br>

### 4.7. Kakao Map API
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/46ae747f-a572-4d8f-9507-293436c26605)
<br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/purchase.jsp)
- 주소 검색 필드 제공: 사용자는 '주소', '상세주소', '참고항목'을 입력할 수 있는 입력 필드를 사용합니다. 이 중 '주소' 필드는 카카오주소 API와 직접 연동됩니다.
- 사용자는 '우편번호 찾기' 버튼을 클릭하여 주소 검색을 시작할 수 있습니다. 이 버튼은 카카오주소 API의 기능을 호출합니다.
- 페이지에는 카카오주소 API를 사용하기 위한 JavaScript 스크립트(<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>)가 포함되어 있습니다.
- sample6_execDaumPostcode 함수는 카카오주소 API를 사용하여 주소 검색을 실행합니다. 이 함수는 사용자가 주소를 검색할 때 실행됩니다.
- 사용자가 검색 결과 중 하나를 선택하면, 선택된 주소 정보는 '우편번호', '주소', '참고항목' 필드에 자동으로 채워집니다. 이를 위해 카카오주소 API에서 반환된 데이터(data)를 활용합니다.
<br>

### 4.8. 좋아요 기능
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/3461431b-5a98-4be8-be9e-d92d928d68d3)
<br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/artist.jsp)
- 각 작가의 프로필이나 작품 옆에는 '좋아요' 버튼(<button class="heart-button">)이 있습니다. 이 버튼에는 하트 아이콘이 (glyphicon-heart 또는 glyphicon-heart-empty) 포함되어 있으며, 사용자가 좋아하는 작가나 작품을 표시하는 데 사용됩니다.
- 좋아요 버튼의 클래스(filled 또는 빈 상태)는 사용자가 해당 작가나 작품을 이미 '좋아요' 했는지 여부를 나타냅니다. 사용자가 이미 '좋아요'를 했다면 glyphicon-heart와 filled 클래스가 사용되고, 그렇지 않으면 glyphicon-heart-empty 아이콘이 사용됩니다.
- 사용자가 좋아요 버튼을 클릭하면 likeTF 함수가 호출됩니다. 이 함수는 AJAX를 사용하여 서버에 좋아요 상태 변경을 요청합니다.
- likeTF 함수는 좋아요 버튼의 데이터 속성에서 사용자 이메일(data-user_email), 작가 페이지 시퀀스(data-ap_seq), 작가 이메일(data-artist_email)을 가져옵니다.
이 정보는 서버에 보내지며, 서버는 이를 바탕으로 사용자의 좋아요 목록을 업데이트합니다.
- AJAX 요청이 성공적으로 처리되면 페이지가 새로고침되어 좋아요 상태가 최신 상태로 반영됩니다.
<br>

### 4.9. 경매 기능
![image](https://github.com/illhanunjung/Hwado-final/assets/153901490/9011793f-93b0-4136-b32e-2fc075322ca8)
<br>
[코드 확인](https://github.com/illhanunjung/Hwado-final/blob/master/hwado2/src/main/webapp/WEB-INF/views/auction_detail.jsp)
- 페이지 상단에서 다양한 클래스(Artworks, AUCTIONS, IMAGES 등)를 임포트하여, 경매에 필요한 데이터(작품 정보, 이미지, 경매 상세 등)를 불러옵니다. 이러한 데이터는 서버에서 제공되며, JSP 페이지에서 사용됩니다.
- JavaScript를 사용하여 경매 종료 시간까지 남은 시간을 표시하는 타이머 기능이 구현되어 있습니다. updateTimer 함수는 현재 시간과 경매 종료 시간을 비교하여 남은 시간을 계산하고, 이를 페이지에 표시합니다.
- 경매에 참여할 작품의 상세 정보(이미지, 설명, 시작 가격 등)가 표시됩니다. 이 정보는 서버로부터 받은 데이터를 기반으로 하며, 사용자에게 작품에 대한 충분한 정보를 제공합니다.
- 사용자가 입찰을 할 수 있는 버튼이 제공됩니다. 이 버튼을 클릭하면 auction_bid 페이지로 이동하여 사용자가 입찰을 할 수 있습니다.


</div>
</details>

</br>
 
## 5. 팀원 소개

<details>
<summary><b>팀장 이건학</b></summary>
<div markdown="1">

#### `Front-End`
 - 주문완료(고객)
 - 예약완료(고객)
 - 예약취소(고객)
 - 마이페이지(고객)
 - 알림(고객)
 - 리뷰관리(고객)
 - 문의(고객)
 - 매장목록(고객)
 - 매장등록(자영업자)
 - 매장수정(자영업자)
 - 메뉴관리(자영업자)
 - 문의하기(자영업자)
 - 리뷰관리(자영업자)
#### `Back-end`
 - 마이페이지(자영업자)
 - 매장등록(자영업자)
 - 매장수정(자영업자)
 - 메뉴관리(자영업자)
#### `API`
 - 사업자번호 인증API
#### `설계`
 - 유스케이스
 - 프로젝트 개요서
 - 서비스 흐름도
 - 요구사항정의서
 - 빅데이터분석서
#### `PM`
 - 폼보드제작
 - 일정관리
</div>
</details> 

<details>
<summary><b>팀원 강재희</b></summary>
<div markdown="1">

#### `Front-End`
- 예술가 승인 페이지
- 작품관리 페이지
- 경매 페이지
- 경매입찰 페이지
- 전시 페이지
- 메인 페이지
- 관심작품 페이지
- 작품페이지
- 회원가입 페이지
- 회원관리 페이지
#### `Back-end`
- 메인 페이지
- 전시 페이지
- 구매내역 페이지
- 작가 페이지
- 마이 페이지
#### `기타`
- 데이터 크롤링
- 화면설계서
- 시연페이퍼
- ppt제작
</div>
</details>

<details>
<summary><b>팀원 정상권</b></summary>
<div markdown="1">
  
#### `Front-End`
- 예술가승인페이지
- 예술가프로필수정페이지
- 예술가프로필페이지
- 예술가등록페이지
- 예술가페이지
- 작품등록페이지
- 경매상세페이지
- 예술가경매관리페이지
- 경매등록페이지
- 입찰사연 보기페이지
- 전시페이지페이지
- 관심작가페이지
- 메인페이지
- 마이페이지
- 작품상세페이지
- 작품등록페이지
- 구매하기페이지
- 구매관리페이지
- 검색결과페이지
- 장바구니페이지
- 로그인/회원가입 페이지
- 개인정보수정페이지
- 배송페이지


#### `Back-end`
- 예술가승인페이지 기능 구현
- 작품관리페이지 기능 구현
- 경매관리페이지 기능 구현
- 경매입찰사유보기페이지 기능 구현
- 배송페이지 기능 구현
- 관심작가페이지 기능 구현
- 검색결과페이지 기능 구현
- 회원관리페이지 기능 구현
- 스마트택배API를 이용한 배송조회 기능 구현
- 카카오지도API를 이용한 주소찾기 기능 구현

</div>
</details>

<details>
<summary><b>팀원 고보미</b></summary>
<div markdown="1">
  
#### `Front-End`
- 경매 결과 확인 페이지 제작

#### `Back-end`
- VGG16 모델과 코사인 유사도를 활용한 추천 알고리즘 구현
- 일반 상품 등록 페이지 기능 구현
- 일반 상품 출력 페이지 기능 구현
- 일반 상품 상세 페이지 기능 구현
- 경매 등록 페이지 기능 구현
- 경매 출력 페이지 기능 구현
- 경매 상세 페이지 기능 구현
- 관심 상품 등록 기능 구현
- 관심 상품 출력 페이지 기능 구현
- 메인 페이지 상품 상세 페이지 이동 기능 구현
- 장바구니 등록 기능 구현
- 장바구니 출력 페이지 기능 구현
- 구매 페이지 기능 구현
- 포트원 API를 활용한 결제 기능 구현
- 작가 개인 페이지 기능 구현
- 작가 프로필 등록 기능 구현
- 경매 확인 페이지 기능 구현
- 경매 마감 기능 구현
- 카테고리 검색 기능 구현
- 플라스크 서버 연동
- DB 설계
</div>
</details>

<details>
<summary><b>팀원 박지뉴</b></summary>
<div markdown="1">
  
#### `Front-End`
- 경매 결과 확인 페이지 제작

#### `Back-end`
- VGG16 모델과 코사인 유사도를 활용한 추천 알고리즘 구현
- 일반 상품 등록 페이지 기능 구현
- 일반 상품 출력 페이지 기능 구현
- 일반 상품 상세 페이지 기능 구현
- 경매 등록 페이지 기능 구현
- 경매 출력 페이지 기능 구현
- 경매 상세 페이지 기능 구현
- 관심 상품 등록 기능 구현
- 관심 상품 출력 페이지 기능 구현
- 메인 페이지 상품 상세 페이지 이동 기능 구현
- 장바구니 등록 기능 구현
- 장바구니 출력 페이지 기능 구현
- 구매 페이지 기능 구현
- 포트원 API를 활용한 결제 기능 구현
- 작가 개인 페이지 기능 구현
- 작가 프로필 등록 기능 구현
- 경매 확인 페이지 기능 구현
- 경매 마감 기능 구현
- 카테고리 검색 기능 구현
- 플라스크 서버 연동
- DB 설계
</div>
</details>

<details>
<summary><b>팀원 지수빈</b></summary>
<div markdown="1">
  
#### `Front-End`
- 유저용과 자영업자용 알림 페이지

#### `Back-end`
 일반 사용자 앱 back 개발
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

>#### DB
- DB설계 및 구축, 관리

#### 배포 및 빌드
- aws 서버 배포 및 빌드
</div>
</details>
