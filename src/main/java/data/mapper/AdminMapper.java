package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

    public List<UserDto> getAllUserList(@Param("offset") int offset, @Param("size") int size);

    public List<UserDto> getAllUserListScrollSearch(@Param("keyword") String keyword);

    public List<UserDto> getBlackUserList(@Param("offset") int offset, @Param("size") int size);

    public List<UserDto> getBlackUserListScrollSearch(@Param("keyword") String keyword);

    public List<NoticeDto> getNotice(@Param("limit") int limit, @Param("offset") int offset);

    public int getNoticeCount();
    
    public void deleteNotice(int nnum);
    
    public void updateNotice(NoticeDto dto);
}
