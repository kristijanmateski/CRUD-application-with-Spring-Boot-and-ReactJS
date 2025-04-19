package com.example.demo.service.impl;

import com.example.demo.model.Student;
import com.example.demo.model.exception.StudentAlreadyExistsException;
import com.example.demo.model.exception.StudentNotFound;
import com.example.demo.repository.StudentRepository;
import com.example.demo.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow(()->new StudentNotFound("Student Not Found"));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void deleteStudentById(Long id) {
        if(!studentRepository.existsById(id)) {
            throw new StudentNotFound("Student Not Found");
        }
        studentRepository.deleteById(id);
    }

    @Override
    public Student updateStudent(Student student, Long id) {
        Student stud = studentRepository.findById(id).orElseThrow(()->new StudentNotFound("Student not found"));
        stud.setFirstName(student.getFirstName());
        stud.setLastName(student.getLastName());
        stud.setEmail(student.getEmail());
        stud.setDepartment(student.getDepartment());
        return studentRepository.save(stud);
    }

    @Override
    public Student addStudent(Student student){
        if(studentAlreadyExists(student.getEmail())){
            throw new StudentAlreadyExistsException(student.getEmail() + "Student already exists!");
        }
        return studentRepository.save(student);
    }

    private boolean studentAlreadyExists(String email){
        return studentRepository.findByEmail(email).isPresent();
    }
}

