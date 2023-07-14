package data.mapper;

import data.dto.FriendDto;
import data.dto.JoinmemberDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FriendMapper {
    public List<FriendDto> getFriendList(int unum);
    public List<FriendDto> getRequestList(int unum);
    public UserDto detailPage(int funum);
    public int checkBuddy(int unum, int funum);
    public int checkingBuddy(int unum, int funum);
    public void requestFriend1(FriendDto dto);
    public void requestFriend2(FriendDto dto);
    public int friendCancel1(int unum, int funum);
    public int friendCancel2(int unum, int funum);
    public int acceptFriend1(int unum, int funum);
    public int acceptFriend2(int unum, int funum);

}
