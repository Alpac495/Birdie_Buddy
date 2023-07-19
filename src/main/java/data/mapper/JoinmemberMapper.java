package data.mapper;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface JoinmemberMapper {
    public List<JoinmemberDto> getJoinmemberList(int jnum);
    public List<JoinmemberDto> getSubmemberList(int jnum);
    public int getCheckMember(Map<String, Object> map);
    public void joinGaip(JoinmemberDto dto);
    public int joinCancel(int unum, int jnum);
    public int acceptJoin(int unum, int jnum);
}
