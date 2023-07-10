package data.mapper;

import data.dto.HugiDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HugiMapper {
    public int getTotalCount();
    public List<HugiDto> getAllHugis();
    public void insertHugi(HugiDto hdto);
    public void updateLikeCount(int unum, int hlike);
    public HugiDto detailPage(int hnum);
    public void deleteHugi(int hnum);
    public UserDto getUserDto(int unum);

}
