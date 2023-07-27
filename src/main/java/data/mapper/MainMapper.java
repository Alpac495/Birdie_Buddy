package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.UserDto;
import data.dto.FriendDto;
import data.dto.HugiDto;
import data.dto.JoiningDto;
import data.dto.NoticeDto;



@Mapper
public interface MainMapper {

    public List<FriendDto> getFriendList(int unum);
    public List<UserDto> getUserList(int unum);
    public List<UserDto> getAllUserList();
    public List<HugiDto> getHugiList();
    public List<JoiningDto> getRecoList();
    public List<NoticeDto> getNoticeList();
}
