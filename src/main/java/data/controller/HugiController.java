package data.controller;

import data.dto.HugiDto;
import data.dto.UserDto;
import data.mapper.HugiMapper;
import data.service.HugiService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/hugi")
public class HugiController {
    String hphoto;
    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";
    @Autowired
    private NcpObjectStorageService storageService;
    private String bucketName = "bit701-bucket-111/birdiebuddy";
    @Autowired
    private HugiService hugiService;
    @Autowired
    private HugiMapper hugiMapper;

    @GetMapping("/list")
    public List<HugiDto> list() {
        System.out.println("list>>");
        return hugiService.getAllHugis();
    }
    @GetMapping("/mylist/{unum}")
    public List<HugiDto> getHugiListByUnum(@PathVariable int unum) {
        // unum 값을 기반으로 해당 사용자의 후기 데이터를 조회합니다.
        return hugiService.getHugiListByUnum(unum);
    }
    @PostMapping("/like/{hnum}")
    public ResponseEntity<String> addLike(@PathVariable int hnum) {
        try {
            // hnum을 사용하여 해당 게시물의 좋아요 정보를 업데이트합니다.
            hugiService.updateLikeCount(hnum, 1);
            return ResponseEntity.ok("좋아요 추가 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("좋아요 추가 실패");
        }
    }

    @DeleteMapping("/unlike/{hnum}")
    public ResponseEntity<String> removeLike(@PathVariable int hnum) {
        try {
            // hnum을 사용하여 해당 게시물의 좋아요 정보를 업데이트합니다.
            hugiService.updateLikeCount(hnum, -1);
            return ResponseEntity.ok("좋아요 취소 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("좋아요 취소 실패");
        }
    }

    @PostMapping("/upload")
    public String photoUpload(@RequestParam("upload") MultipartFile upload) {
        System.out.println("hphotoUpload>>" + upload.getOriginalFilename());
        if (hphoto != null) {
            //이전 사진 삭제
            storageService.deleteFile(bucketName, "hugi", hphoto);
        }
        hphoto = storageService.uploadFile(bucketName, "hugi", upload);

        return hphoto;
    }

    @PostMapping("/insert")
    public void insert(@RequestBody HugiDto hdto) {
        System.out.println("hdto>>" + hdto);
        hugiService.insertHugi(hdto);
        hphoto = null;
    }


    @DeleteMapping("/delete/{hnum}")
    public void delete(@PathVariable int hnum) {
        System.out.println("delete>>" + hnum);
        HugiDto hugiDto = hugiService.detailPage(hnum);
        String prePhoto = hugiDto.getHphoto();
        storageService.deleteFile(bucketName, "hugi", prePhoto);
        hugiService.deleteHugi(hnum);
    }

    @GetMapping("/user/{unum}")
    public ResponseEntity<UserDto> getUserDto(@PathVariable int unum) {
        System.out.println("unum:" + unum);
        UserDto userDto = hugiService.getUserDto(unum);
        System.out.println(userDto.getUname());

        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/getUser")
    public ResponseEntity<String> getUser(int unum) {
        String unickname = hugiMapper.getNickname(unum);
//        System.out.println("unickname =>>" +unickname);
        if (unickname != null) {
            return ResponseEntity.ok(unickname);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
