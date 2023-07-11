package data.service;

import data.dto.UserDto;
import data.mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginService implements LoginServiceInter{

    @Autowired
    private LoginMapper loginMapper;


    @Override
    public int loginok(String uemail, String upass) {
        Map<String, Object> map = new HashMap<>();
        map.put("uemail",uemail);
        map.put("upass",upass);
        return loginMapper.loginok(map);
    }

}
