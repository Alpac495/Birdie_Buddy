package data.service;


import data.dto.ScoreDto;

import java.util.List;

public interface ScoreServiceInter {

    public List<ScoreDto> getRankingList(int unum);
    public void saveRankingInsert(int unum, int avg);
    public void saveRankingUpdate(int unum, int avg);
}
