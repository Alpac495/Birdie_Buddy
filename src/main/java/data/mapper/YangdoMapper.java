package data.mapper;

import data.dto.YangdoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
    public List<YangdoDto> MyYangdoList(Map<String, Integer> map);
    public int getMyCount(int num);
    public List<YangdoDto> getPagingListScroll(@Param("offset") int offset, @Param("size") int size);
    public List<YangdoDto> getPagingListScrollSearch(String keyword);
    public List<YangdoDto> getPagingMyListScroll(@Param("unum") int unum, @Param("offset") int offset, @Param("size") int size);
    public List<YangdoDto> getPagingMyListScrollSearch(@Param("unum") int unum, @Param("keyword") String keyword);

}
