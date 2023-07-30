package data.service;

import java.util.List;

import data.dto.NoticeDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Param;

public interface AdminServiceInter {
    public List<UserDto> getUserList();

    List<NoticeDto> getNotice(@Param("limit") int limit, @Param("offset") int offset);

    public int getNoticeCount();

}
