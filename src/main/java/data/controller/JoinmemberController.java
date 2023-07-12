package data.controller;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import data.mapper.JoinmemberMapper;
import data.service.JoinmemberService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/joinmember")
public class JoinmemberController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    JoinmemberMapper joinmemberMapper;
    @Autowired
    JoinmemberService joinmemberService;

    @GetMapping("/confirmlist")
    public List<JoinmemberDto> confirmlist(int jnum)
    {
        List<JoinmemberDto> confirmlist= joinmemberService.getJoinmemberList(jnum);
        return confirmlist;
    }

    @GetMapping("/sublist")
    public List<JoinmemberDto> sublist(int jnum)
    {
        List<JoinmemberDto> sublist= joinmemberService.getSubmemberList(jnum);
        return sublist;
    }

    @GetMapping("/checkmember")
    public int getCheckMember(int unum, int jnum)
    {
        System.out.println("checkmember>>"+unum+jnum);
        return joinmemberService.getCheckMember(unum,jnum);
    }

}
