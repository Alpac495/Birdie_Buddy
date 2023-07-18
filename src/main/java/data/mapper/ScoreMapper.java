package data.mapper;

import data.dto.GolfjangScoreDto;
import data.dto.ScoreDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ScoreMapper {
    public List<GolfjangScoreDto> getGpar(int gnum);
    public void saveScore(ScoreDto dto);

    public List<ScoreDto> getRankingList(int unum);
    public int getRankingCount(int unum);//스코어 최신 3개,2개,1개
    public int stasuSum(int unum);//최신3개 합
    public int getRankCount(int unum);//랭킹테이블에 있는지 없는지
    public void saveRankingInsert(Map<String, Object> map);
    public void saveRankingUpdate(Map<String, Object> map);

}
