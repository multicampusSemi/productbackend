package com.project.controller;

import java.util.Arrays;  
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.model.BookingList;
import com.project.model.OrderItem;
import com.project.service.CartService;
import com.project.service.OrderItemService;
import com.project.service.UsersService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {
	private final CartService cartService;	
	private final UsersService usersService;
	private final OrderItemService orderService;
	


@GetMapping("/getBookingItems")
	public @ResponseBody List<BookingList> getBookingItems(HttpSession session) {
	    Integer userId = (Integer) session.getAttribute("userId");
	    if (userId == null) {
	        userId = usersService.getDefaultUserId(); // 기본 사용자 ID 설정
	        session.setAttribute("userId", userId);
	    }

	    // 사용자에 대한 예약 목록을 가져옴
	    List<BookingList> bookingItems = cartService.showbookingItem(userId);
	    
	    // JSON 형식으로 데이터를 반환
	    return bookingItems;  // Map을 사용해 JSON 응답을 반환
	}
	
	@GetMapping("/booking")
	public String getBookingItem(Model model, HttpSession session) {
		Integer userId = (Integer) session.getAttribute("userId");
		 if (userId == null) {
		        userId = usersService.getDefaultUserId();; // 기본 사용자 ID 설정
		        session.setAttribute("userId", userId);
		    }
		 
		List<BookingList> bookingItems = cartService.showbookingItem(userId);
		model.addAttribute("bookingItems", bookingItems);
		return "booking";
	}
	
	 @PostMapping("/cart/delete")
	    public String deleteSelected(@RequestParam("bookingIds") String bookingIds, HttpSession session) {
		 Integer userId = (Integer) session.getAttribute("userId");
		 if(userId == null) {
			 return "redirect:/kdjloginMain";
		 }
		 List<Integer> bookingIdList = Arrays.stream(bookingIds.split(","))
			        .map(Integer::parseInt) // 문자열을 Integer로 변환
			        .collect(Collectors.toList());


			    // 삭제하려는 상품이 있다면
			    if (!bookingIdList.isEmpty()) {
			        cartService.removeProductsFromCart(userId, bookingIdList);
			    } else {
			        System.out.println("삭제할 상품이 없습니다.");
			    }
		 return "redirect:/booking";
	    }
	 
	 @PostMapping("/order/create")
	 public String createOrder(@RequestBody List<OrderItem> selectedProducts, HttpSession session) {
		 Integer userId = (Integer) session.getAttribute("userId");
		 if(userId == null) {
			 return "redirect:/login";
		 }
		 
		 orderService.saveOrder(userId, selectedProducts);
		 return "redirect:/order";
	 }
	 
	 @GetMapping("/order")
	 public String showOrderPage(Model model, HttpSession session) {
		 Integer userId = (Integer) session.getAttribute("userId");

		 if (userId == null) {
		        userId = usersService.getDefaultUserId();; // 기본 사용자 ID 설정
		        session.setAttribute("userId", userId);
		    }
		 List<OrderItem> orders = orderService.getOrders();
		 model.addAttribute("orderItems", orders);  // 기존대로, JSON 이외의 값도 전달
		 return "order";
	 }
	 
	
		
	 
}
