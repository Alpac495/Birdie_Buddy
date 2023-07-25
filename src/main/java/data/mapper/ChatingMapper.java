package data.mapper;

import data.dto.ChatroomDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatingMapper {
    public UserDto selectChatingRoom(int unum);

    public void insertchatid(ChatroomDto cdto);

    public String getChatInfo(int unum1, int unum2);
}
