package data.service;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface JoiningServiceInter {
    public void insertJoin(JoiningDto dto);

    public void updateJoin(JoiningDto dto);

//    public List<JoiningDto> getJoiningList();
//    public List<JoiningDto> getlistWithPaging(@Param("offset") int offset, @Param("size") int size);
    public List<JoiningDto> getMakeJoinList(int unum);

    public List<JoiningDto> getRequestJoinList(int unum);

    public JoiningDto detailPage(int jnum);

    public int joinCancel(int jnum);

    public void joinMaker(JoinmemberDto dto);
}
