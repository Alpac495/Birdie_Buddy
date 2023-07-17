package data.service;

import data.dto.ScoreDto;
import data.mapper.ScoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ScoreService implements ScoreServiceInter{

    @Autowired
    private ScoreMapper scoreMapper;

    @Override
    public List<ScoreDto> getRankingList(int unum) {
        return scoreMapper.getRankingList(unum);
    }
}
