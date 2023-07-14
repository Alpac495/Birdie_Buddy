package data.service;

import data.dto.FriendDto;
import data.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface FriendServiceInter {
    public List<FriendDto> getFriendList(int unum);
    public List<FriendDto> getRequestList(int unum);
    public UserDto detailPage(int funum);
    public int checkBuddy(int unum, int funum);
    public int checkingBuddy(int unum, int funum);
    public void requestFriend1(FriendDto dto);
    public void requestFriend2(FriendDto dto);
    public int friendCancel1(int unum, int funum);
    public int friendCancel2(int unum, int funum);
    public int acceptFriend1(int unum, int funum);
    public int acceptFriend2(int unum, int funum);
}
