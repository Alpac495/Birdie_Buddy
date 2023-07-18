package data.controller;

import data.dto.GolfjangScoreDto;
import data.dto.ScoreDataDto;
import data.dto.ScoreDto;
import data.mapper.ScoreMapper;
import data.service.ScoreService;
import naver.cloud.NcpObjectStorageService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName = "bit701-bucket-111";

    String photo;

    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";

    @Autowired
    ScoreService scoreService;

    @Autowired
    ScoreMapper scoreMapper;

    @GetMapping("/getGpar")
    public List<GolfjangScoreDto> list(int gnum) {
        System.out.println("골프장test");
        List<GolfjangScoreDto> list = scoreMapper.getGpar(gnum);
        return list;
    }

    @PostMapping("/saveScore")
    public String saveScore(@RequestBody ScoreDataDto scoreDataDTO) {
        int[] s = scoreDataDTO.getS();
        int unum = scoreDataDTO.getUnum();
        int gnum = scoreDataDTO.getGnum();
        System.out.println(Arrays.toString(s));
        System.out.println(unum);
        System.out.println(gnum);
        ScoreDto dto = new ScoreDto();
        dto.setUnum(unum);
        dto.setGnum(gnum);
        dto.setH1(s[0]);
        dto.setH2(s[1]);
        dto.setH3(s[2]);
        dto.setH4(s[3]);
        dto.setH5(s[4]);
        dto.setH6(s[5]);
        dto.setH7(s[6]);
        dto.setH8(s[7]);
        dto.setH9(s[8]);
        dto.setH10(s[9]);
        dto.setH11(s[10]);
        dto.setH12(s[11]);
        dto.setH13(s[12]);
        dto.setH14(s[13]);
        dto.setH15(s[14]);
        dto.setH16(s[15]);
        dto.setH17(s[16]);
        dto.setH18(s[17]);
        scoreMapper.saveScore(dto);
        int count = scoreMapper.getRankingCount(unum);
        int sum = scoreMapper.stasuSum(unum);
        int avg = sum/count;
        if(scoreMapper.getRankCount(unum)==0){
            scoreService.saveRankingInsert(unum, avg);
        } else {
            scoreService.saveRankingUpdate(unum, avg);
        }

        return "요청이 성공적으로 처리되었습니다.";
    }
    @GetMapping("/list")
    public List<ScoreDto> getRanklist(int unum){

        scoreService.getRankingList(unum);
        System.out.println(scoreService.getRankingList(unum));

        /*List<ScoreDto> list = int [];*/


        return new ArrayList<>();
    }

}
