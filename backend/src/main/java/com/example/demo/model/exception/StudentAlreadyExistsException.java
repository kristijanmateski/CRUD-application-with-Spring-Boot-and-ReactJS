package com.example.demo.model.exception;

public class StudentAlreadyExistsException extends RuntimeException {
    public StudentAlreadyExistsException(String s) {
        super(s);
    }
}
