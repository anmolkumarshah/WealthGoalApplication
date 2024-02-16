package com.virtusa.WealthsApp.service;


import com.virtusa.WealthsApp.dto.IncomeInfoDTO;
import com.virtusa.WealthsApp.exception.UserNotFoundException;
import com.virtusa.WealthsApp.model.EndUser;

import java.util.List;
import java.util.Map;

public interface EndUserService {

    EndUser save(EndUser endUser);

    EndUser getById(Long id) throws UserNotFoundException ;

    EndUser getByEmailId(String email) throws UserNotFoundException;

    void setAdvisor(Long endUserId,Long advisorId);

    public List<List<String>> expensePieData(Long Id) throws UserNotFoundException;

    public List<List<String>> investmentPieData(Long Id) throws UserNotFoundException;

    public String generateAdvice(Long Id) throws UserNotFoundException;

    public EndUser updateEndUserIncomeDetail(IncomeInfoDTO dto) throws UserNotFoundException;

    public Map<String, String> getFinanceQuotes();

}
