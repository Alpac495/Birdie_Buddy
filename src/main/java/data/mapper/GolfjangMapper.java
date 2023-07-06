package data.mapper;

import data.dto.GolfjangDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GolfjangMapper {
    public List<GolfjangDto> getGolfjangList();
}
