package data.service;

import data.dto.ScoreDto;
import data.mapper.ScoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ScoreService implements ScoreServiceInter{

    @Autowired
    private ScoreMapper scoreMapper;

    @Override
    public List<ScoreDto> getRankingList(int unum) {
        return scoreMapper.getRankingList(unum);
    }

    @Override
    public void saveRankingInsert(int unum, int avg) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("avg", avg);
        scoreMapper.saveRankingInsert(map);
    }

    @Override
    public void saveRankingUpdate(int unum, int avg) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("avg", avg);
        scoreMapper.saveRankingUpdate(map);
    }

}
