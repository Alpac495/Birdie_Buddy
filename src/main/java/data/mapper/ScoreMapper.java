package data.mapper;

import data.dto.GolfjangScoreDto;
import data.dto.ScoreDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScoreMapper {
    public List<GolfjangScoreDto> getGpar(int gnum);
    public void saveScore(ScoreDto dto);

    public List<ScoreDto> getRankingList(int unum);

}
