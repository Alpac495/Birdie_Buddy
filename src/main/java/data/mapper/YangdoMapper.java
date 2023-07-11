package data.mapper;

import data.dto.YangdoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface YangdoMapper {
    public void insertYList(YangdoDto dto);
    public List<YangdoDto> getAllDatas();
    public YangdoDto getData(int num);
    public void deleteYangdo(int num);

}
