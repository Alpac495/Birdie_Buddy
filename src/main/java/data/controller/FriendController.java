package data.controller;

import data.dto.FriendDto;
import data.dto.UserDto;
import data.mapper.FriendMapper;
import data.service.FriendService;
import naver.cloud.NcpObjectStorageService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/friend")
public class FriendController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    FriendMapper friendMapper;

    @Autowired
    private FriendService friendService;

    @GetMapping("/list")
    public List<FriendDto> list(int unum)
    {
        List<FriendDto> list= friendService.getFriendList(unum);
        return list;
    }

    @GetMapping("/detail")
    public UserDto detailPage(int funum)
    {
        System.out.println("funum="+funum);
        return friendService.detailPage(funum);
    }
}
