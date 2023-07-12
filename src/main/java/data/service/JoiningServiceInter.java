package data.service;

import data.dto.JoiningDto;

import java.util.List;

public interface JoiningServiceInter {
    public void insertJoin(JoiningDto dto);
    public List<JoiningDto> getJoiningList();
    public JoiningDto detailPage(int jnum);
}
