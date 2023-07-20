package data.service;

import data.dto.JoinmemberDto;
import data.mapper.JoinmemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JoinmemberService implements JoinmemberServiceInter {

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
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("jnum", jnum);
        return joinmemberMapper.getCheckMember(map);
    }

    @Override
    public void joinGaip(JoinmemberDto dto) {
        joinmemberMapper.joinGaip(dto);
    }

    @Override
    public int joinCancel(int unum, int jnum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("jnum", jnum);
        return joinmemberMapper.joinCancel(map);
    }

    @Override
    public int acceptJoin(int unum, int jnum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("jnum", jnum);
        return joinmemberMapper.acceptJoin(map);
    }

}
