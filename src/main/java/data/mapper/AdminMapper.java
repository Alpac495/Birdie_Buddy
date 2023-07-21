package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.NoticeDto;
import data.dto.UserDto;

@Mapper
public interface AdminMapper {
    public List<UserDto> getUserList();
    public void addBlackList(int unum);
    public void removeBlackList(int unum);
    public List<UserDto> getBlackList();
    public void noticeWrite(NoticeDto dto);
    public List<NoticeDto> noticeList();
    public NoticeDto noticeDetail(int nnum);
}
