package data.service;

import data.dto.ChatroomDto;
import data.dto.UserDto;
import data.mapper.ChatingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
