package data.controller;

import data.dto.UserDto;
import data.mapper.ChatingMapper;
import data.service.ChatingService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/chating")
public class ChatingController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName = "bit701-bucket-111";

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    ChatingMapper chatingMapper;

    @Autowired
    private ChatingService chatingService;

    @GetMapping("/getuserinfo")
    public UserDto getUserInfoForChating(int unum) {
        System.out.println("unum : "+unum);
        return chatingService.selectChatingRoom(unum);
    }

}
