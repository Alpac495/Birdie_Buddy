package data.service;

import data.dto.FriendDto;
import data.dto.UserDto;
import data.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class FriendService implements FriendServiceInter{

    @Autowired
    private FriendMapper friendMapper;
    @Override
    public List<FriendDto> getFriendList(int unum){
        return friendMapper.getFriendList(unum);
    }

    @Override
    public UserDto detailPage(int funum) {
        return friendMapper.detailPage(funum);
    }

    @Override
    public int checkBuddy(int unum, int funum) {
        return friendMapper.checkBuddy(unum, funum);
    }

    @Override
    public int checkingBuddy(int unum, int funum) {
        return friendMapper.checkingBuddy(unum, funum);
    }

    @Override
    public void requestFriend1(FriendDto dto) {
        friendMapper.requestFriend1(dto);
    }

    @Override
    public void requestFriend2(FriendDto dto) {
        friendMapper.requestFriend2(dto);
    }

    @Override
    public int friendCancel1(int unum, int funum) {
        return friendMapper.friendCancel1(unum,funum);
    }
    @Override
    public int friendCancel2(int unum, int funum) {
        return friendMapper.friendCancel2(unum,funum);
    }
}
