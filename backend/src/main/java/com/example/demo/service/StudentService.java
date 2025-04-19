package com.example.demo.service;

import com.example.demo.model.Student;

import java.util.List;

public interface StudentService {
    Student getStudentById(Long id);
    List<Student> getAllStudents();
    void deleteStudentById(Long id);
    Student updateStudent(Student student, Long id);
    Student addStudent(Student student) throws Exception;
}
