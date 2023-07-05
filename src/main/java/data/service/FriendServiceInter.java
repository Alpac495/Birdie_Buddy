package data.service;

import data.dto.FriendDto;
import data.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface FriendServiceInter {
    public List<FriendDto> getFriendList(int unum);
    public UserDto detailPage(int funum);
}
