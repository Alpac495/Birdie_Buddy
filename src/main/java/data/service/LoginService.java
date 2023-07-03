package data.service;

import data.dto.UserDto;
import data.mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService implements LoginServiceInter{

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public List<UserDto> getUserData(int unum) {
        return loginMapper.getUserData(unum);
    }
}
