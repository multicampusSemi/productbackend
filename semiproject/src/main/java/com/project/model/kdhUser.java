package com.project.model;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class kdhUser {
    private Integer id;                      // 고유 사용자 ID
    private String name;                     // 사용자 이름
    private Integer birthYear;               // 출생 연도
    private Byte birthMonth;                 // 출생 월
    private Byte birthDay;                   // 출생 일
    private String phone;                    // 휴대폰 번호
    private String homePhone;                // 집 전화번호
    private String username;                 // 사용자 아이디
    private String password;                 // 비밀번호
    private String zipcode;                  // 우편번호
    private String address;                  // 상세 주소
    private String email;                    // 이메일 주소
    private Boolean emailVerified = false;   // 이메일 인증 여부
    private String role = "USER";            // 사용자 역할
    private Boolean isActive = true;         // 계정 활성화 여부
    private LocalDateTime createdAt = LocalDateTime.now(); // 계정 생성 시간
    private LocalDateTime updatedAt = LocalDateTime.now(); // 계정 수정 시간
}