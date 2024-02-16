package com.virtusa.WealthsApp.service;



import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.Advisor;
import com.virtusa.WealthsApp.model.EndUser;

import java.util.List;

public interface AdvisorUserService {

    Advisor save(Advisor advisor);

    Advisor getById(Long id) throws  UserNotFoundException;

    List<EndUser> getAllEndUser(Long advisorId) throws UserNotFoundException;

    Advisor getByEmailId(String email) throws UserNotFoundException;
}
