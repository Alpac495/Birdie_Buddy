package data.service;


import data.dto.ScoreDto;

import java.util.List;

public interface ScoreServiceInter {

    public List<ScoreDto> getRankingList(int unum);
}
