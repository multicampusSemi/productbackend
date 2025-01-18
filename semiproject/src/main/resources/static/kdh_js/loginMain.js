document.addEventListener("DOMContentLoaded", () => {
    const openModal = document.getElementById("btnjoin");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("modal");
        const message = "<%= request.getAttribute('message') %>";
    const error = "<%= request.getAttribute('error') %>";
    const loginError = "<%= request.getAttribute('loginError') %>";

 
    if (!openModal || !closeModal || !modal) {
        console.error("필수 요소가 존재하지 않습니다. HTML에서 id를 확인하세요.");
        return;
    }

    // 모달 열기
    openModal.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // 모달 닫기
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // 모달 외부 클릭 시 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
 	
    const findPostcodeBtn = document.getElementById("find-postcode");  // 우편번호 찾기 버튼
    const zipcodeInput = document.getElementById("zipcode");           // 우편번호 필드
    const addressInput = document.getElementById("address");           // 기본 주소 필드
    const addressDetailInput = document.getElementById("addressDetail"); // 상세 주소 필드

    // 모든 요소가 존재하는지 체크 후 이벤트 리스너 등록
    if (findPostcodeBtn && zipcodeInput && addressInput && addressDetailInput) {
        findPostcodeBtn.addEventListener("click", () => {
            new daum.Postcode({
                oncomplete: function(data) {
                    // 우편번호와 주소를 필드에 입력
                    zipcodeInput.value = data.zonecode;   // 우편번호
                    addressInput.value = data.address;    // 기본 주소
                    // 상세 주소 필드로 포커스 이동
                    addressDetailInput.focus();
                }
            }).open();
        });
    } else {
        console.error("우편번호 관련 요소(#find-postcode, #zipcode, #address, #addressDetail)를 확인해주세요.");
    }

    const requiredInputs = document.querySelectorAll('[required]');
    const form = document.querySelector('#signup-form');
    const passwordInput = document.querySelector('#signup-password');
    const passwordConfirmInput = document.querySelector('#signup-password1');
    const emailInput = document.querySelector('#email');
    // 체크박스 요소와 에러 메시지
    const termsCheckbox = document.getElementById("agree-terms");
    const privacyCheckbox = document.getElementById("agree-privacy");
    const ageCheckbox = document.getElementById("agree-age");

    const termsError = document.getElementById("agree-terms-error");
    const privacyError = document.getElementById("agree-privacy-error");
    const ageError = document.getElementById("agree-age-error");
	 const loadSignupUsername = () => {
        const savedUsername = sessionStorage.getItem("signupUsername");
        if (savedUsername) {
            const loginUsernameInput = document.getElementById("login-username");
            if (loginUsernameInput) {
                loginUsernameInput.value = savedUsername; // 저장된 아이디를 입력 필드에 설정
                sessionStorage.removeItem("signupUsername"); // 아이디를 한 번 표시한 후에는 삭제
            }
        }
    };
	 const usernameInput = document.getElementById("username");

 if (usernameInput) {
        usernameInput.addEventListener("blur", () => {
            const username = usernameInput.value.trim();
            if (username) {
                checkUsernameExists(username);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            const email = emailInput.value.trim();
            if (email) {
                checkEmailExists(email);
            }
        });
    }

    // 아이디 중복 검사 함수
    function checkUsernameExists(username) {
        fetch(`/web/validate-username?username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const errorMessage = document.querySelector("#username-error");
                if (!errorMessage) return;

                if (data.exists) {
                    errorMessage.textContent = "이미 사용 중인 아이디입니다.";
                    errorMessage.style.display = "block";
                } else {
                    errorMessage.textContent = "";
                    errorMessage.style.display = "none";
                }
            })
            .catch(error => console.error("아이디 확인 중 오류 발생:", error));
    }

    // 이메일 중복 검사 함수
    function checkEmailExists(email) {
        fetch(`/web/validate-email?email=${encodeURIComponent(email)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const errorMessage = document.querySelector("#email-error");
                if (!errorMessage) return;

                if (data.exists) {
                    errorMessage.textContent = "이미 사용 중인 이메일입니다.";
                    errorMessage.style.display = "block";
                } else {
                    errorMessage.textContent = "";
                    errorMessage.style.display = "none";
                }
            })
            .catch(error => console.error("이메일 확인 중 오류 발생:", error));
    }

    // 로그인 페이지에 아이디를 자동 입력
    loadSignupUsername();

    // 기존 코드 유지
    // 에러 메시지 초기화 (처음 로드 시 숨김)
    [termsError, privacyError, ageError].forEach((error) => {
        error.style.display = "none";
    });
     // 숨겨진 input 생성 (주소 합쳐서 전송)
    const fullAddressInput = document.createElement('input');
    fullAddressInput.type = 'hidden';
    fullAddressInput.name = 'address';  // 실제로 전송될 주소
    form.appendChild(fullAddressInput);
    const phone1 = document.getElementById('phone1');
    const phone2 = document.getElementById('phone2');
    const phone3 = document.getElementById('phone3');
    const phoneInput = document.createElement('input');

    // 숨겨진 input 생성
    phoneInput.type = 'hidden';
    phoneInput.name = 'phone';
    form.appendChild(phoneInput);

    // 폼 제출 시 휴대폰 번호 병합
    form.addEventListener('submit', (e) => {
        const part1 = phone1.value.trim();
        const part2 = phone2.value.trim();
        const part3 = phone3.value.trim();

        if (!part1 || !part2 || !part3) {
            alert('휴대폰 번호를 모두 입력해주세요.');
            e.preventDefault(); // 제출 중단
            return;
        }

        phoneInput.value = `${part1}-${part2}-${part3}`;
        
         const address = addressInput.value.trim();
        const addressDetail = addressDetailInput.value.trim();

        if (!address) {
            alert('주소와 상세주소를 모두 입력해주세요.');
            e.preventDefault(); // 제출 중단
            return;
        }

        // 기본 주소와 상세 주소를 합쳐서 hidden input에 저장
        fullAddressInput.value = `${address} ${addressDetail}`;
        
        
    });
    
        
   
    //아이디 유효성 검사 함수
    const validateUsername = (input) =>{
        const parent = input.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const usernameValue = input.value.trim();
        const usernameRegex = /^[a-z0-9]{6,10}$/;
        if(!errorMessage){
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }
        if (!usernameValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        }else if (!usernameRegex.test(usernameValue)) {
            errorMessage.textContent = '아이디 형식에 맞지 않습니다.';
            errorMessage.style.display = 'block';
            return false;
        }else {
            errorMessage.style.display = 'none';
            return true;
        }
    };
 	
    // 비밀번호 유효성 검사 함수
    const validatePasswordFormat = (input) => {
        const parent = input.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const passwordValue = input.value.trim();
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!passwordValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else if (!passwordRegex.test(passwordValue)) {
            errorMessage.textContent = '비밀번호 형식에 맞지 않습니다.';
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    };

    // 비밀번호 확인 값 일치 여부 검사 함수
    const validatePasswordMatch = () => {
        const parent = passwordConfirmInput.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = passwordConfirmInput.value.trim();

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!confirmPasswordValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else if (passwordValue !== confirmPasswordValue) {
            errorMessage.textContent = '비밀번호가 일치하지 않습니다.';
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    };

    // 이메일 형식 검사 함수
    const validateEmailFormat = () => {
        const parent = emailInput.closest('.signupForm-group');
        let errorMessage = parent.querySelector('.error-message');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 이메일 정규식

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            parent.appendChild(errorMessage);
        }

        if (!emailValue) {
            errorMessage.textContent = '* 필수 입력 사항입니다.';
            errorMessage.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailValue)) {
            errorMessage.textContent = '유효한 이메일 형식이 아닙니다.';
            errorMessage.style.display = 'block';
            return false;
        } else {
            errorMessage.style.display = 'none';
            return true;
        }
    };

    // 체크박스 유효성 검사 함수
    const validateCheckboxes = (showErrors = true) => {
        let isValid = true;

        if (!termsCheckbox.checked) {
            if (showErrors) termsError.style.display = "block";
            isValid = false;
        } else {
            termsError.style.display = "none";
        }

        if (!privacyCheckbox.checked) {
            if (showErrors) privacyError.style.display = "block";
            isValid = false;
        } else {
            privacyError.style.display = "none";
        }

        if (!ageCheckbox.checked) {
            if (showErrors) ageError.style.display = "block";
            isValid = false;
        } else {
            ageError.style.display = "none";
        }

        return isValid;
    };

    // 폼 제출 시 검증
    form.addEventListener("submit", (event) => {
        const isFormValid = validateCheckboxes(true);
        if (!isFormValid) {
            event.preventDefault(); // 폼 제출 중단
        }
    });

    // 체크박스 상태 변경 시 경고 메시지 업데이트
    [termsCheckbox, privacyCheckbox, ageCheckbox].forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const errorElement = [termsError, privacyError, ageError][index];
            if (!checkbox.checked) {
                errorElement.style.display = "block";
            } else {
                errorElement.style.display = "none";
            }
        });
    });
	
    // 필수 입력 필드 검사 함수
    const validateRequiredFields = () => {
        let isValid = true;

        requiredInputs.forEach(input => {
            const parent = input.closest('.signupForm-group');

            if (!parent) {
                console.error("입력 필드의 부모 요소(.signupForm-group)를 찾을 수 없습니다:", input);
                isValid = false;
                return;
            }

            let errorMessage = parent.querySelector('.error-message');

            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                parent.appendChild(errorMessage);
            }

            if (!input.value.trim()) {
                errorMessage.textContent = '* 필수 입력 사항입니다.';
                errorMessage.style.display = 'block';
                isValid = false;
            } else {
                errorMessage.style.display = 'none';
            }
        });

        return isValid;
    };
    
    // 필드의 포커스가 벗어날 때 실시간 검증
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.id === 'signup-password') {
                validatePasswordFormat(input);
            } else if (input.id === 'signup-password1') {
                validatePasswordMatch();
            } else if (input.id === 'email') {
                validateEmailFormat();
            }else if (input.id === 'username') {
                validateUsername(input);
            } else {
                validateRequiredFields();
            }
        });
    });

    // 체크박스 변경 시 실시간 검사
    [termsCheckbox, privacyCheckbox, ageCheckbox].forEach((checkbox) => {
        checkbox.addEventListener('change', () => validateCheckboxes(false));
    });
        const signupForm = document.getElementById("signup-form");
	
	
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
			
            // 사용자가 입력한 아이디를 가져오기
            const username = document.getElementById("username").value;

            // sessionStorage에 아이디 저장
            sessionStorage.setItem("signupUsername", username);
        });
    }
     
});
