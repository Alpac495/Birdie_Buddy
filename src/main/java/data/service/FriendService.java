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
}
