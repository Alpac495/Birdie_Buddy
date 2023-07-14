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
    public UserDto getUserData(String uemail);
    public int emailChk(String uemail);
    public int nickChk(String unickname);
    public void insertCode(String uhp, String code);
    public void deleteCode(String uhp);
    public int cntCode(String uhp);
    public int cntHpCode(String uhp, String code);
    public int hpChk(String uhp);
    public UserDto getUser(int unum);
}
