package data.service;

import data.mapper.JoiningMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class JoiningService implements JoiningServiceInter{

    @Autowired
    private JoiningMapper joiningMapper;

}
