package data.controller;

import data.dto.GolfjangDto;
import data.mapper.GolfjangMapper;
import data.service.GolfjangService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/golfjang")
public class GolfjangController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName = "bit701-bucket-111";

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    GolfjangMapper golfjangMapper;

    @Autowired
    GolfjangService golfjangService;

    @GetMapping("/list")
    public List<GolfjangDto> list() {
        System.out.println("test");
        List<GolfjangDto> list = golfjangService.getGolfjangList();
        return list;
    }

}
