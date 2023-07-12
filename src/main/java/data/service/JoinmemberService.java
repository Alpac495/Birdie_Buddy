package data.service;

import data.dto.JoinmemberDto;
import data.mapper.JoinmemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class JoinmemberService implements JoinmemberServiceInter{

    @Autowired
    private JoinmemberMapper joinmemberMapper;

    @Override
    public List<JoinmemberDto> getJoinmemberList(int jnum) {
        return joinmemberMapper.getJoinmemberList(jnum);
    }

    @Override
    public List<JoinmemberDto> getSubmemberList(int jnum) {
        return joinmemberMapper.getSubmemberList(jnum);
    }

    @Override
    public int getCheckMember(int unum, int jnum) {
        return joinmemberMapper.getCheckMember(unum,jnum);
    }

}
