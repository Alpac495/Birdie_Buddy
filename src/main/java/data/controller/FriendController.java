package data.controller;

import data.dto.FriendDto;
import data.dto.UserDto;
import data.mapper.FriendMapper;
import data.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/apifriend")
public class FriendController {

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    FriendMapper friendMapper;

    @Autowired
    private FriendService friendService;

    @GetMapping("/list")
    public List<FriendDto> list(int unum) {
        List<FriendDto> list = friendService.getFriendList(unum);
        System.out.println(unum);
        return list;
    }

    @GetMapping("/paginglist")
    public List<FriendDto> paginglist(int unum, int page, int size) {
        System.out.println("스크롤");
        int offset = (page - 1) * size;
        List<FriendDto> list = friendMapper.getFriendListWithPaging(unum, offset, size);
        System.out.println(unum);
        return list;
    }

    @GetMapping("/requestlist")
    public List<FriendDto> requestlist(int unum) {
        List<FriendDto> requestlist = friendService.getRequestList(unum);
        return requestlist;
    }

    @GetMapping("/pagingrequestlist")
    public List<FriendDto> pagingrequestlist(int unum, int page, int size) {
        System.out.println("스크롤");
        int offset = (page - 1) * size;
        List<FriendDto> list = friendMapper.getRequestListWithPaging(unum, offset, size);
        System.out.println(unum);
        return list;
    }

    @GetMapping("/detail")
    public UserDto detailPage(int funum) {
        System.out.println("funum=" + funum);
        return friendService.detailPage(funum);
    }

    @GetMapping("/checkbuddy")
    public int checkBuddy(int unum, int funum) {
        System.out.println("unum=" + unum);
        return friendService.checkBuddy(unum, funum);
    }

    @PostMapping("/requestfriend1")
    public String requestFriend1(@RequestBody FriendDto dto) {
        System.out.println("dto>>" + dto);
        friendService.requestFriend1(dto);
        return "success";
    }

    @PostMapping("/requestfriend2")
    public String requestFriend2(@RequestBody FriendDto dto) {
        System.out.println("dto>>" + dto);
        friendService.requestFriend2(dto);
        return "success";
    }

    @DeleteMapping("/friendcancel/{unum}&{funum}")
    public String friendCancel(@PathVariable int unum, @PathVariable int funum) {
        System.out.println("cancelunum>>" + unum);
        System.out.println("cancelfunum>>" + funum);
        friendService.friendCancel1(unum, funum);
        friendService.friendCancel2(unum, funum);
        return "success";
    }

    @GetMapping("/acceptfriend/{unum}&{funum}")
    public String acceptFriend(@PathVariable int unum, @PathVariable int funum) {
        friendService.acceptFriend1(unum, funum);
        friendService.acceptFriend2(unum, funum);
        return "success";
    }

    @GetMapping("/recommandfriend")
    public List<UserDto> recommandlist(int unum) {
        List<UserDto> list = friendMapper.getRecoUserList(unum);
        return list;
    }

    @GetMapping("/friendsearch")
    public List<UserDto> alluserlist(int unum, int page, int size) {
        System.out.println("스크롤");
        int offset = (page - 1) * size;
        List<UserDto> list = friendMapper.getUserList(unum, offset, size);
        return list;
    }

    @GetMapping("/friendsearchlist")
    public List<UserDto> friendsearchlist(int unum, @RequestParam(defaultValue = "") String keyword) {
        System.out.println(keyword);
        List<UserDto> list = friendMapper.getUserListScrollSearch(unum, keyword);
        return list;
    }

    @GetMapping("/requestcheck")
    public List<FriendDto> requestcheck(int unum) {
        List<FriendDto> requestcheck = friendService.getRequestCheck(unum);
        return requestcheck;
    }
}
