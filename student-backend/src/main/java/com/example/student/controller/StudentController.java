package com.example.student.controller;

import com.example.student.entity.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")  // Allow CORS from frontend
public class StudentController {
    @Autowired
    private StudentRepository repository;

    @GetMapping
    public List<Student> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Student add(@RequestBody Student student) {
        return repository.save(student);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = repository.findById(id).orElseThrow();
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setCourse(updatedStudent.getCourse());
        student.setAmount(updatedStudent.getAmount());
        student.setFeesStatus(updatedStudent.getFeesStatus());
        return repository.save(student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}