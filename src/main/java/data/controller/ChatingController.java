package data.controller;

import data.dto.ChatroomDto;
import data.dto.UserDto;
import data.mapper.ChatingMapper;
import data.service.ChatingService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/chating")
public class ChatingController {

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    ChatingMapper chatingMapper;

    @Autowired
    private ChatingService chatingService;

    @GetMapping("/getuserinfo")
    public UserDto getUserInfoForChating(int unum) {
        System.out.println("unum : " + unum);
        return chatingService.selectChatingRoom(unum);
    }

    @PostMapping("/insertchatid")
    public void insert(@RequestBody ChatroomDto cdto) {
        System.out.println("cdto>>" + cdto);
        chatingService.insertchatid(cdto);

    }

    @GetMapping("/getchatinfo")
    public String getChatInfo(@RequestParam int unum1, @RequestParam int unum2) {
        System.out.println("unum1:" + unum1);
        System.out.println("unum2:" + unum2);
        return chatingService.getChatInfo(unum1, unum2);
    }

    @GetMapping("/getchatroom")
    public List<ChatroomDto> getChatRoomList(@RequestParam int unum) {
        return chatingService.getChatRoomList(unum);
    }

}
