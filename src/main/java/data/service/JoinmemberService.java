package data.service;

import data.mapper.JoinmemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class JoinmemberService implements JoinmemberServiceInter{

    @Autowired
    private JoinmemberMapper joinmemberMapper;

}
