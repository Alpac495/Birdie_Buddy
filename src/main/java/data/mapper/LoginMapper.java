package data.mapper;

import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Mapper
public interface LoginMapper {
    public void signUser(UserDto dto);
    public int loginok(Map<String, Object> map);
    public String getNickname(String uemail);
    public UserDto getUserData(String uemail);
}
