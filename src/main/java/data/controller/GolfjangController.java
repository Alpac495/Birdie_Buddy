package data.controller;

import data.dto.GolfjangDto;
import data.mapper.GolfjangMapper;
import data.service.GolfjangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/apigolfjang")
public class GolfjangController {

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
