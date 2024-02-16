package com.virtusa.WealthsApp.controller;


import com.virtusa.WealthsApp.dto.SubordinateDTO;
import com.virtusa.WealthsApp.exception.SubordinateNotFoundException;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Subordinate;
import com.virtusa.WealthsApp.service.SubordinateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subordinate")
@SecurityRequirement(name = "JWT Bearer Authentication & Authorization")
public class SubordinateController {

    @Autowired
    SubordinateService subordinateService;

    @PostMapping
    public ResponseEntity<Subordinate> create(@RequestBody SubordinateDTO dto) throws UserNotFoundException {
        Subordinate subordinate = subordinateService.save(dto);
        return ResponseEntity.ok(subordinate);
    }

    @GetMapping("/{subordinateId}")
    public ResponseEntity<Subordinate> getSubordinateById(@PathVariable Long subordinateId) throws SubordinateNotFoundException {
        Subordinate subordinate = subordinateService.getById(subordinateId);
        return ResponseEntity.ok(subordinate);
    }

    @DeleteMapping("/{subordinateId}")
    public ResponseEntity<Subordinate> deleteSubordinateById(@PathVariable Long subordinateId) throws SubordinateNotFoundException {
        Subordinate subordinate = subordinateService.deleteById(subordinateId);
        return ResponseEntity.ok(subordinate);
    }

}
