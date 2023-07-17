package data.mapper;


import data.dto.ScoreDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScoreMapper {

    public List<ScoreDto> getRankingList(int unum);

}
