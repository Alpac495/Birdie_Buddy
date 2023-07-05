package data.service;

import data.dto.UserDto;

import java.util.List;

public interface LoginServiceInter {
    public void signUser(UserDto dto);
    public int loginok(String uemail, String upass);
    public String getNickname(String uemail);
    public UserDto getUserData(String uemail);
}
