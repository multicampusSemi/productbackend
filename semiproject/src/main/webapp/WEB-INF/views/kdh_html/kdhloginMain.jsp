<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>



<html>
<head>
    <title>로그인 메인</title>
     <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/kdh_css/loginMain.css">
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body id="body">
    <%@ include file="/WEB-INF/views/krhheader.jsp" %>
<% 
    String message = (String) request.getAttribute("message");
    String error = (String) request.getAttribute("error");
    String loginError = (String) request.getAttribute("loginError");
%>

<script>
    // 메시지가 존재할 경우에만 Alert 실행
    <% if (message != null) { %>
        alert("<%= message %>");
    <% } %>
    <% if (error != null) { %>
        alert("<%= error %>");
    <% } %>
    <% if (loginError != null) { %>
        alert("<%= loginError %>");
    <% } %>
</script>
<!--로그인-->
  <div class="login-container">
    <form class="login-form" action="/web/login" method="POST">
        <h2 id="h2">Login</h2>
        <div class="login-form-group">
            <label for="login-username">ID</label>
            <div class="login-input-container">
                <ilogin class="fa fa-user"></ilogin>
                <input type="text" id="login-username" name="username" placeholder="ID를 입력하세요" required>
            </div>
        </div>
        <div class="login-form-group">
            <label for="login-password">PASSWORD</label>
            <div class="login-input-container">
                <i class="fa fa-lock"></i>
                <input type="password" id="login-password" name="login_password" placeholder="비밀번호를 입력하세요" required>
            </div>
        </div>
        <button type="submit" class="btn-submit">LOGIN</button>
        <button type="button" class="join-btn" id="btnjoin">JOIN US</button>
        <div class="links">
            <a href="login.html">아이디 찾기</a>
            <a href="login.html">비밀번호 찾기</a>
        </div>
    </form>
</div>
  <div id="footers"
<%@ include file="/WEB-INF/views/krhfooter.jsp" %> 
</div>
<div id="modal" class="hidden">
  <div class="modal-content">
    <button id="closeModal" class="close-btn">&times;</button>
    <div id="login"> 

      <h2>join us</h2>
      <div class="signup-container">
      <div class="form-tabs">
          <div><b>기본정보</b></div>
          <div><b>필수입력사항</b></div>
      </div>
      <form method="post" action="/web/register"  id="signup-form">
          <!-- 이름 -->
          <div class="signupForm-group">
              <label for="name" class="required">이름</label>
              <input type="text" id="name" name="name" required>
              <div class="error-message">* 필수 입력 사항입니다.</div>
          </div>
  
   <!-- 생년월일 -->
<div class="signupForm-group">
  <label for="birth_year" class="required">생년월일</label>
  <div class="input-container">
      <input type="number" id="birth_year" name="birthYear" placeholder="년(4자리)" required>
      <input type="number" id="birth_month" name="birthMonth" placeholder="월" required>
      <input type="number" id="birth_day" name="birthDay" placeholder="일" required>
      
      <div class="error-message" style="white-space: nowrap; margin-top: 5px;">* 필수 입력 사항입니다.</div>
  </div>
</div>

<!-- 휴대폰 -->
<div class="signupForm-group">
  <label for="phone" class="required">휴대폰</label>
  <div class="input-container">
      <input type="text" class="phone-prefix" id="phone1" name="phone1" value="010" readonly>
      <input type="number" id="phone2" name="phone2" placeholder="1234" required>
      <input type="number" id="phone3" name="phone3" placeholder="5678" required>
     
      <div class="error-message" style="white-space: nowrap; margin-top: 5px;">* 필수 입력 사항입니다.</div>
      <div></div>
  </div>
</div>

          <div class="signupForm-group">
              <label for="homePhone">일반 전화번호</label>
              <div class="input-container">
                  <input type="number" class="phone-prefix" id="homePhone1" name="phone1"  >
                  <input type="number" id="homePhone2" name="homePhone2" placeholder="1234" >
                  <input type="number" id="homePhone3" name="homePhone3" placeholder="5678" >
              </div>
          </div>
          
          <!-- 아이디 -->
          <div class="signupForm-group">
              <label for="username" class="required">아이디</label>
              <input type="text" id="username" name="username" placeholder="영문 소문자/숫자, 4-16자" required>
              <div class="error-message">* 필수 입력 사항입니다.</div>
          	   <div class="error-message username-format-error">아이디 형식에 맞지 않습니다.</div>
          	   <div id="username-error" class="username-error">중복된 아이디 입니다.</div>
          </div>
          <br>
          <!-- 비밀번호 -->
     <!-- 비밀번호 -->
<div class="signupForm-group">
  <label for="signup-password" class="required">비밀번호</label>
  <input type="password" id="signup-password" name="password" placeholder="특수문자 포함 8~12자리" required>
  <div class="error-message empty-error">필수 입력 사항입니다.</div>
  <div class="error-message format-error">비밀번호 형식에 맞지 않습니다.</div>
</div>

          <br>
          <!-- 비밀번호 확인 -->
          <div class="signupForm-group">
              <label for="signup-password1" class="required">비밀번호확인</label>
              <input type="password" id="signup-password1" name="confirmPassword" required>
             
          </div>
          <br>
<!-- 우편번호 -->
<div class="signupForm-group">
  <label for="zipcode" class="required">우편번호</label>
  <div class="zipcode-container">
      <input type="number" id="zipcode" name="zipcode" required>
      <button type="button" class="check-btn" id="find-postcode">찾기</button>
      <!-- 경고 메시지 버튼 뒤로 이동 -->
      <div class="error-message">* 필수 입력 사항입니다.</div>
  </div>
</div>
<br>
<!-- 기본 주소 -->
<div class="signupForm-group">
  <label for="address" class="address">기본 주소</label>
  <input type="text" id="address" name="address">
</div>
<br>
<!-- 상세주소 -->
<div class="signupForm-group">
  <label for="addressDetail" class="address">상세 주소</label>
  <input type="text" id="addressDetail" name="addressDetail">
</div>
          
          <br>
       <!-- 이메일 -->
<div class="signupForm-group">
  <label for="email" class="required">이메일</label>
  <div class="zipcode-container">
      <input type="email" id="email" name="email" required>
      <button type="button" class="check-btn">인증하기</button>
      <!-- 경고 메시지 버튼 뒤로 이동 -->
      <div class="error-message">* 필수 입력 사항입니다.</div>
      <div id="email-error"class="email-error">*이미 사용중인 이메일입니다.</div>
  </div>
  

</div>
<div class="signupForm-group">
  <label for="emailNum">인증번호</label>
  <input type="email" id="emailNum" name="emailNum">
  <button type="button"  class="check-btn">인증</button>
</div><br><br>
<h3>약관 동의</h3>

  <div class="terms-container">
      <p>아래 내용에 모두 동의합니다.</p>
  </div>
      <div class="terms-section">
          <div class="terms-header">
              <span>이용약관 동의</span>
              <span class="agree">(필수)</span>
          </div>
          <br>
          <textarea readonly>
부 칙
          </textarea>
          <br><br>
          <div class="terms-checkbox">
            <label for="agree-terms">이용약관 동의</label>
            <input type="checkbox" id="agree-terms" name="agree-terms">
            <div id="agree-terms-error" class="check-error-message">이용약관에 동의해야 합니다.</div>
        </div>

      <br><br><br><br>
      <div class="terms-section">
          <div class="terms-header">
              <span>개인정보 수집 및 이용 동의</span>
              <span class="agree">(필수)</span>
          </div>
          <br>
          <textarea readonly>
수집하는 개인정보 항목 및 수집방법
          </textarea>
          <br><br>
          <div class="terms-checkbox">
            <label for="agree-privacy">개인정보 수집 및 이용 동의</label>
            <input type="checkbox" id="agree-privacy" name="agree-privacy">
            <div id="agree-privacy-error" class="check-error-message">개인정보 수집 및 이용에 동의해야 합니다.</div>
          </div>

      <br><br><br><br>
      <div class="terms-section">
        <div class="terms-checkbox">
          <label for="agree-age">14세 이상 가입 동의 <span class="agree">(필수)</span></label>
          <input type="checkbox" id="agree-age" name="agree-age">
          <div id="agree-age-error" class="check-error-message">14세 이상 가입 동의가 필요합니다.</div>
        </div>
      </div>

      <br>
      <div class="age-confirmation">
        <textarea readonly id="agreeBox">본인은 만 14세 이상입니다.</textarea>
      </div>

      <div class="button-group">
        <button type="button" class="cancel-btn">CANCEL</button>
        <button type="submit" id="validateForm">JOIN</button>
      </div>
  </div>
</form>

</div>
</body>
    <script src="${pageContext.request.contextPath}/kdh_js/loginMain.js" defer></script>
</html>