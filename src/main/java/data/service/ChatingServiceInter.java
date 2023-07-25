package data.service;

import data.dto.ChatroomDto;
import data.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface ChatingServiceInter {

    public UserDto selectChatingRoom(int num);

    public void insertchatid(ChatroomDto cdto);

    public String getChatInfo(int unum1, int unum2);

    public List<ChatroomDto> getList();

}
