package com.project.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class KrhProduct {
	int productId;
	String productName;
	String productCode;
	int productPrice;
	String categoryId;
	String photo;
	int shippingfee;
	LocalDateTime createdAt;
	String sessionId;
}
