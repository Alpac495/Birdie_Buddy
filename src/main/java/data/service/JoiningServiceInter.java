package data.service;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;

import java.util.List;

public interface JoiningServiceInter {
    public void insertJoin(JoiningDto dto);
    public List<JoiningDto> getJoiningList();
    public List<JoiningDto> getMyJoinList(int unum);
    public JoiningDto detailPage(int jnum);
    public int joinCancel(int jnum);
    public void joinMaker(JoinmemberDto dto);
}
