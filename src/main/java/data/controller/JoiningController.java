package data.controller;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import data.mapper.JoiningMapper;
import data.service.JoiningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/apijoining")
public class JoiningController {

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    JoiningMapper joiningMapper;

    @Autowired
    JoiningService joiningService;

    @PostMapping("/insert")
    public void insert(@RequestBody JoiningDto dto) {
        joiningService.insertJoin(dto);
    }

    @PostMapping("/update")
    public void update(@RequestBody JoiningDto dto) {
        joiningService.updateJoin(dto);
    }

    // @GetMapping("/list")
    // public List<JoiningDto> list() {
    // List<JoiningDto> list = joiningService.getJoiningList();
    // return list;
    // }
    @GetMapping("/list")
    public List<JoiningDto> list(int page, int size) {
        System.out.println("스크롤>>");
        int offset = (page - 1) * size;
        List<JoiningDto> list = joiningMapper.getlistWithPaging(offset, size);
        return list;
    }

    @GetMapping("/searchlist")
    public List<JoiningDto> joinsearchlist(@RequestParam(defaultValue = "") String keyword) {
        System.out.println(keyword);
        List<JoiningDto> list = joiningMapper.getJoinListScrollSearch(keyword);
        return list;
    }

    @GetMapping("/makejoinlist")
    public List<JoiningDto> makeJoinlist(int unum) {
        List<JoiningDto> makejoinlist = joiningService.getMakeJoinList(unum);
        return makejoinlist;
    }

    @GetMapping("/requestjoinlist")
    public List<JoiningDto> requestJoinlist(int unum) {
        List<JoiningDto> requestjoinlist = joiningService.getRequestJoinList(unum);
        return requestjoinlist;
    }

    @GetMapping("/detail")
    public JoiningDto detailPage(int jnum) {
        return joiningService.detailPage(jnum);
    }

    @DeleteMapping("/joinCancel/{jnum}")
    public String joinMozipCancel(@PathVariable int jnum) {
        System.out.println("canceljnum>>" + jnum);
        joiningService.joinCancel(jnum);
        return "success";
    }

    @PostMapping("/joinMaker")
    public String joinMaker(@RequestBody JoinmemberDto dto) {
        System.out.println("dto>>" + dto);
        joiningMapper.joinMaker(dto);
        return "success";
    }

}
