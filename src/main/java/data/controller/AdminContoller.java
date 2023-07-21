package data.controller;

import java.util.List;

import data.dto.NoticeDto;
import data.dto.UserDto;
import data.mapper.AdminMapper;
import data.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminContoller {
    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminMapper adminMapper;

    @GetMapping("/userlist")
    public List<UserDto> list() {
        List<UserDto> list = adminService.getUserList();
        return list;
    }
    @GetMapping("/addBlackList")
    public void addBlackList(int unum){
        adminMapper.addBlackList(unum);
    }
    @GetMapping("/removeBlackList")
    public void removeBlackList(int unum){
        adminMapper.removeBlackList(unum);
    }
    @GetMapping("/getBlackList")
    public List<UserDto> getBlackList() {
        List<UserDto> getBlackList = adminMapper.getBlackList();
        return getBlackList;
    }
    @PostMapping("/noticeWrite")
    public void noticeWrite(@RequestBody NoticeDto dto){
        adminMapper.noticeWrite(dto);
    }
    @GetMapping("/noticeList")
    public List<NoticeDto> noticeList(){
        List<NoticeDto> list = adminMapper.noticeList();
        return list;
    }
    @GetMapping("/noticeDetail")
    public NoticeDto noticeDetail(int nnum){
        NoticeDto dto = adminMapper.noticeDetail(nnum);
        return dto;
    }
}
