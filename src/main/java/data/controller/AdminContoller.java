package data.controller;

import java.util.List;

import data.dto.HugiDto;
import data.dto.NoticeDto;
import data.dto.UserDto;
import data.mapper.AdminMapper;
import data.service.AdminService;
import naver.cloud.NcpObjectStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminContoller {

    @Autowired
    private NcpObjectStorageService storageService;
    
    private String bucketName = "bit701-bucket-111";
    
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

    @GetMapping("/getuserlist")
    public List<UserDto> alluserlist(int page, int size) {
        System.out.println("스크롤");
        int offset = (page - 1) * size;
        List<UserDto> list = adminMapper.getAllUserList(offset, size);
        return list;
    }

    @GetMapping("/usersearchlist")
    public List<UserDto> usersearchlist(@RequestParam(defaultValue = "") String keyword) {
        System.out.println(keyword);
        List<UserDto> list = adminMapper.getAllUserListScrollSearch(keyword);
        return list;
    }

    @GetMapping("/addBlackList")
    public void addBlackList(int unum) {
        adminMapper.addBlackList(unum);
    }

    @GetMapping("/removeBlackList")
    public void removeBlackList(int unum) {
        adminMapper.removeBlackList(unum);
    }

    @GetMapping("/getBlackList")
    public List<UserDto> blacklist(int page, int size) {
        System.out.println("스크롤");
        int offset = (page - 1) * size;
        List<UserDto> list = adminMapper.getBlackUserList(offset, size);
        return list;
    }

    @GetMapping("/blacksearchlist")
    public List<UserDto> blacksearchlist(@RequestParam(defaultValue = "") String keyword) {
        System.out.println(keyword);
        List<UserDto> list = adminMapper.getBlackUserListScrollSearch(keyword);
        return list;
    }

    @PostMapping("/noticeWrite")
    public void noticeWrite(@RequestBody NoticeDto dto) {
        adminMapper.noticeWrite(dto);
    }

    @GetMapping("/noticeList")
    public List<NoticeDto> getNotice(@RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "0") int offset){
        return adminService.getNotice(limit, offset);
    }

    @GetMapping("/noticeCount")
    public int getNoticeCount(){
        return adminService.getNoticeCount();
    }

    @GetMapping("/noticeDetail")
    public NoticeDto noticeDetail(int nnum) {
        System.out.println("???????");
        System.out.println("없냐????????" + nnum);
        NoticeDto dto = adminMapper.noticeDetail(nnum);
        return dto;
    }

    @PostMapping("/upload")
    public String photoUpload(MultipartFile upload)
    {

        
        System.out.println("upload>>"+upload.getOriginalFilename());
        if(photo!=null) {
            //이전 사진 삭제
            storageService.deleteFile(bucketName, "notice", photo);
        }
        photo=storageService.uploadFile(bucketName, "birdiebuddy/notice", upload);

        System.out.println(photo);
        return photo;
    }

    @GetMapping("/delete")
    public void delete(int nnum) {
        NoticeDto dto = adminMapper.noticeDetail(nnum);
        photo = dto.getNphoto();

        storageService.deleteFile(bucketName, "notice", photo);

        System.out.println(nnum);

        adminMapper.deleteNotice(nnum);
    }
    @PostMapping("/update")
    public void update(int nnum){
        adminMapper.updateNotice(nnum);
    }
}
