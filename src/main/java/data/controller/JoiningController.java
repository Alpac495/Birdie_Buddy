package data.controller;

import data.dto.FriendDto;
import data.dto.JoiningDto;
import data.mapper.JoiningMapper;
import data.service.JoiningService;
import data.service.JoinmemberService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/joining")
public class JoiningController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    JoiningMapper joiningMapper;

    @Autowired
    JoiningService joiningService;

    @PostMapping("/insert")
    public void insert(@RequestBody JoiningDto dto)
    {
        joiningService.insertJoin(dto);
    }

    @GetMapping("/list")
    public List<JoiningDto> list()
    {
        List<JoiningDto> list= joiningService.getJoiningList();
        return list;
    }

    @GetMapping("/detail")
    public JoiningDto detailPage(int jnum)
    {
        System.out.println("detail>>"+jnum);

        return joiningService.detailPage(jnum);
    }

}
