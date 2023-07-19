package data.controller;

import data.dto.HugiDto;
import data.mapper.HugiMapper;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/main")
public class MainController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    HugiMapper hugiMapper;

  /*  @GetMapping("list")
    public List<HugiDto> getMainHugi(){


        HugiDto dto = new HugiDto();

        List<HugiDto> list = hugiMapper.getAllHugis();



        return "Dwadaw";
    }*/



}
