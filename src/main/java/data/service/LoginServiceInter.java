package data.service;

import data.dto.UserDto;

import java.util.List;

public interface LoginServiceInter {
    public void signUser(UserDto dto);
    public List<UserDto> getUserData(int unum);
}
