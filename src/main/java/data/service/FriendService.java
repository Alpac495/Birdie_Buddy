package data.service;

import data.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FriendService implements FriendServiceInter{

    @Autowired
    private FriendMapper friendMapper;

}
