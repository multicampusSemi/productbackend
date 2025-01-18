<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>YEONZ</title>
	    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap" rel="stylesheet">
	    <link rel="stylesheet" href="/krh_css/main.css">
	    <script src="/krh_js/main.js"></script>
	</head>
	
	<body>
	<c:forEach var="cart" items="${bookingList}">
		제품명:${cart.productName}
		제품가격:${cart.productPrice}
		배송비:${cart.shippingfee}
		제품이미지:${cart.photo}
	</c:forEach>
	</body>
</html>