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
public class FriendService implements FriendServiceInter {

    @Autowired
    private FriendMapper friendMapper;

    @Override
    public List<FriendDto> getFriendList(int unum) {
        return friendMapper.getFriendList(unum);
    }

    @Override
    public List<FriendDto> getRequestList(int unum) {
        return friendMapper.getRequestList(unum);
    }

    @Override
    public UserDto detailPage(int funum) {
        return friendMapper.detailPage(funum);
    }

    @Override
    public int checkBuddy(int unum, int funum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("funum", funum);
        return friendMapper.checkBuddy(map);
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
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("funum", funum);
        return friendMapper.friendCancel1(map);
    }

    @Override
    public int friendCancel2(int unum, int funum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("funum", funum);
        return friendMapper.friendCancel2(map);
    }

    @Override
    public int acceptFriend1(int unum, int funum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("funum", funum);
        return friendMapper.acceptFriend1(map);
    }

    @Override
    public int acceptFriend2(int unum, int funum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("funum", funum);
        return friendMapper.acceptFriend2(map);
    }

    @Override
    public List<FriendDto> getRequestCheck(int unum) {
        return friendMapper.getRequestCheck(unum);
    }
}
