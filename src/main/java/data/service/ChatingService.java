package data.service;

import data.dto.ChatroomDto;
import data.dto.UserDto;
import data.mapper.ChatingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatingService implements ChatingServiceInter {

    @Autowired
    private ChatingMapper chatingMapper;

    @Override
    public UserDto selectChatingRoom(int unum) {
        return chatingMapper.selectChatingRoom(unum);
    }

    @Override
    public void insertchatid(ChatroomDto cdto) {
        chatingMapper.insertchatid(cdto);
    }

    @Override
    public String getChatInfo(int unum1, int unum2) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum1",unum1);
        map.put("unum2",unum2);
        return chatingMapper.getChatInfo(map);
    }

}
