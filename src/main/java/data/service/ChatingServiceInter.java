package data.service;

import data.dto.ChatroomDto;
import data.dto.UserDto;

public interface ChatingServiceInter {

    public UserDto selectChatingRoom(int num);

    public void insertchatid(ChatroomDto cdto);

    public String getChatInfo(int unum1, int unum2);

}
