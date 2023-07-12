package data.mapper;

import data.dto.YangdoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface YangdoMapper {
    public void insertYList(YangdoDto dto);
    public List<YangdoDto> getAllDatas();
    public YangdoDto getData(int num);
    public void deleteYangdo(int num);
    public int getTotalCount();
    public List<YangdoDto> getPagingList(Map<String, Integer> map);
    public void updateYangdo(YangdoDto dto);

}
