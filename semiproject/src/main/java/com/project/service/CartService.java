package com.project.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.project.mapper.LjmSemiMapper;
import com.project.model.BookingList;

@Service
public class CartService {
	private final LjmSemiMapper cartMapper;
	
	public CartService(LjmSemiMapper cartMapper) {
        this.cartMapper = cartMapper;
    }
	public List<BookingList> showbookingItem(int userId){
		List<BookingList> bookingItems = cartMapper.showbookingitem(userId);
		System.out.print(bookingItems);
		return bookingItems;
	}
	
	
	 public void removeProductsFromCart(int userId, List<Integer> bookingIds) {
		 System.out.println("Removing products for user: " + userId + " with IDs: " + bookingIds);  // 로그 확인
		    int rowsDeleted = cartMapper.deleteProductsFromCart(userId, bookingIds);
	 }
}
