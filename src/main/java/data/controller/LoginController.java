package data.controller;

import data.dto.UserDto;
import data.mapper.LoginMapper;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    LoginMapper loginMapper;


    @PostMapping("/sign")
    public void signUser(@RequestBody UserDto dto){
        System.out.println(dto);
        loginMapper.signUser(dto);
    }



}
