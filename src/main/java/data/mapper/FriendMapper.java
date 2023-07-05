package data.mapper;

import data.dto.FriendDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FriendMapper {
    public List<FriendDto> getFriendList(int unum);
    public UserDto detailPage(int funum);
}
