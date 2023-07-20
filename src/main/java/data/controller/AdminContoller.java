package data.controller;

import java.util.List;
import data.dto.UserDto;
import data.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import naver.cloud.NcpObjectStorageService;

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

    @GetMapping("/userlist")
    public List<UserDto> list() {
        List<UserDto> list = adminService.getUserList();
        return list;
    }
}
