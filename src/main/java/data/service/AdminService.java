package data.service;

import java.util.List;

import data.dto.NoticeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.UserDto;
import data.mapper.AdminMapper;

@Service
public class AdminService implements AdminServiceInter {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public List<UserDto> getUserList() {
        return adminMapper.getUserList();
    }

    @Override
    public List<NoticeDto> getNotice(int limit, int offset) {
        return adminMapper.getNotice(limit,offset);
    }

    @Override
    public int getNoticeCount() {
        return adminMapper.getNoticeCount();
    }
}
