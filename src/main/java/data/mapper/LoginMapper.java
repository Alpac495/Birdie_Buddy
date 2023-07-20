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
    public void insertCode(Map<String, Object> map);
    public void deleteCode(String uhp);
    public int cntCode(String uhp);
    public int cntHpCode(Map<String, Object> map);
    public int hpChk(String uhp);
    public UserDto getUser(int unum);
    public void updateCon(Map<String, Object> map);
    public void updateNick(Map<String, Object> map);
    public void updatePhoto(Map<String, Object> map);
    public String getRtasu(int unum);
}
