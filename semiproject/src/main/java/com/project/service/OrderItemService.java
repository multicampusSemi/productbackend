package com.project.service;

import java.util.List; 
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.mapper.LjmSemiMapper;
import com.project.model.OrderItem;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderItemService {
	private final LjmSemiMapper orderMapper;
	
	public void saveOrder(int userId, List<OrderItem> selectedProducts) {
		 selectedProducts.forEach(product -> {
		        int quantity = product.getQuantity();
		        int productPrice = product.getProductPrice();
		        int productId = product.getProductId();
		        int totalAmount = productPrice * quantity;  // 직접 계산
		        int shippingFee = product.getshippingFee();  // ShippingFee 가져오기

		        product.setTotalAmount(totalAmount);  // 모델에 설정
		        orderMapper.insertOrder(userId, quantity, totalAmount, shippingFee,productId);  // 매퍼 호출
	    });
	}
	 public List<OrderItem> getOrders() {
	        return orderMapper.getAllOrders();  // 예시로 getAllOrders 메서드 추가 필요
	    }

	    public int calculateTotalPrice(List<OrderItem> orders) {
	        int totalPrice = 0;
	        for (OrderItem order : orders) {
	            totalPrice += order.getProductPrice() * order.getQuantity();
	        }
	        return totalPrice;
	    }
}


