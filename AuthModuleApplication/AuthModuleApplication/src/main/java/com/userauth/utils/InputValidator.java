package com.userauth.utils;

public class InputValidator {

	public static boolean isValidEmail(String email) {
	    return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
	}


	public static boolean isValidPassword(String password) {
	    // Example: Minimum 8 characters, at least 1 letter and 1 number
	    return password != null && password.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
	}

}


