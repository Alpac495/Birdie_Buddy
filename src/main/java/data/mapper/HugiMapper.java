package data.mapper;

import data.dto.HugiDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;

@Mapper
public interface HugiMapper {
    public int getTotalCount();
    public List<HugiDto> getAllHugis();
    public void insertHugi(HugiDto hdto);
    public void updateHugi(HugiDto hdto);
    public void addLikeCount(int hnum);
    public void removeLikeCount(int hnum);
    public HugiDto detailPage(int hnum);
    public void deleteHugi(int hnum);
    public UserDto getUserDto(int unum);
    public List<UserDto> getUser(int unum);
    public String getNickname(int unum);
    public List<HugiDto> getHugiListByUnum(int unum);
    public HugiDto getHugiByHnum(int hnum);
    public String getUserPhotoUrl(int unum);
    public List<HugiDto> listHugiWithPaging(@Param("offset") int offset, @Param("size") int size);
    public List<HugiDto> listmyHugiWithPaging(@Param("unum") int unum, @Param("offset") int offset, @Param("size") int size);
}
