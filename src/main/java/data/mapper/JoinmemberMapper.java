package data.mapper;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinmemberMapper {
    public List<JoinmemberDto> getJoinmemberList(int jnum);
    public List<JoinmemberDto> getSubmemberList(int jnum);
    public int getCheckMember(int unum, int jnum);
}
