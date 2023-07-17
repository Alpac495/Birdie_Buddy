package data.controller;

import data.dto.ScoreDto;
import data.mapper.ScoreMapper;
import data.service.ScoreService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    ScoreService scoreService;

    @Autowired
    ScoreMapper scoreMapper;

    @GetMapping("/list")
    public List<ScoreDto> list(int unum){

        scoreService.getRankingList(unum);
        System.out.println(scoreService.getRankingList(unum));

        /*List<ScoreDto> list = int [];*/


        return new ArrayList<>();
    }

}
