package data.controller;

import data.dto.JoinmemberDto;
import data.mapper.JoinmemberMapper;
import data.service.JoinmemberService;
import naver.cloud.NcpObjectStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/joinmember")
public class JoinmemberController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName = "bit701-bucket-111";

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    JoinmemberMapper joinmemberMapper;
    @Autowired
    JoinmemberService joinmemberService;

    @GetMapping("/confirmlist")
    public List<JoinmemberDto> confirmlist(int jnum) {
        List<JoinmemberDto> confirmlist = joinmemberService.getJoinmemberList(jnum);
        return confirmlist;
    }

    @GetMapping("/sublist")
    public List<JoinmemberDto> sublist(int jnum) {
        List<JoinmemberDto> sublist = joinmemberService.getSubmemberList(jnum);
        return sublist;
    }

    @GetMapping("/checkmember/{unum}&{jnum}")
    public int getCheckMember(@PathVariable int unum, @PathVariable int jnum) {
        System.out.println("checkmember>>" + unum + jnum);
        return joinmemberService.getCheckMember(unum, jnum);
    }

    @PostMapping("/joinGaip")
    public String joinGaip(@RequestBody JoinmemberDto dto) {
        System.out.println("dto>>" + dto);
        joinmemberService.joinGaip(dto);
        return "success";
    }

    @DeleteMapping("/joinCancel/{unum}&{jnum}")
    public String joinGaipCancel(@PathVariable int unum, @PathVariable int jnum) {
        System.out.println("cancelunum>>" + unum);
        System.out.println("canceljnum>>" + jnum);
        joinmemberService.joinCancel(unum, jnum);
        return "success";
    }

    @GetMapping("/acceptJoin/{unum}&{jnum}")
    public String acceptJoin(@PathVariable int unum, @PathVariable int jnum) {
        joinmemberService.acceptJoin(unum, jnum);
        return "success";
    }
}
