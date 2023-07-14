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
    private String bucketName = "bit701-bucket-111";
    @Autowired
    private HugiService hugiService;
    @Autowired
    private HugiMapper hugiMapper;

    @GetMapping("/list")
    public List<HugiDto> list() {
        System.out.println("list>>");
        return hugiService.getAllHugis();
    }
//    @GetMapping("/list/{unum}")
//    public List<HugiDto> list(@PathVariable int unum) {
//    System.out.println("listByUser>>");
//
//    UserDto userDto = hugiService.getUserDto(unum);
//    String uname = userDto.getUname();
//    String unickname = userDto.getUnickname();
//
//    List<HugiDto> hugiList = hugiService.getHugisByUser(unum);
//
//    for (HugiDto hugi : hugiList) {
//        hugi.setUname(uname);
//        hugi.setUnickname(unickname);
//    }
//
//    return hugiList;
//}

    @PostMapping("/upload")
    public String photoUpload(@RequestParam("upload") MultipartFile upload) {
        System.out.println("upload>>" + upload.getOriginalFilename());
        if (hphoto != null) {
            //이전 사진 삭제
            storageService.deleteFile(bucketName, "birdiebuddy", hphoto);
        }
        hphoto = storageService.uploadFile(bucketName, "birdiebuddy", upload);

        return hphoto;
    }

    @PostMapping("/insert")
    public void insert(@RequestBody HugiDto hdto) {
        System.out.println("hdto>>" + hdto);

        // uname 정보 가져오기
        //int unum = hdto.getUnum();
        //UserDto userDto = hugiService.getUserDto(unum);
//        String uname = userDto.getUname();
//        String unickname = userDto.getUnickname();
//        hdto.setUname(uname);
//        hdto.setUnickname(unickname);
//        hdto.setHphoto(hphoto);
        hugiService.insertHugi(hdto);
        hphoto = null;
    }

    //    @GetMapping("/detail")
//    public HugiDto detailPage(int hnum){
//        System.out.println("detail>>"+hnum);
//        return hugiService.detailPage(hnum);
//    }
//    @GetMapping("/detail/{hnum}")
//    public HugiDto detailPage(@PathVariable int hnum) {
//        System.out.println("detail>>" + hnum);
//        HugiDto hugiDto = hugiService.detailPage(hnum);
//
//        int unum = hugiDto.getUnum();
//        UserDto userDto = hugiService.getUserDto(unum);
//        String unickname = userDto.getUnickname();
//        hugiDto.setUnickname(unickname);
//
//        return hugiDto;
//    }

    //    @DeleteMapping("/delete")
//    public void delete(int hnum)
//    {
//        System.out.println("delete>>"+hnum);
//        //num 에 해당하는 사진 스토리지에서 지우기
//        String prePhoto=hugiService.detailPage(hnum).getHphoto();
//        storageService.deleteFile(bucketName, "birdiebuddy", prePhoto);
//
//        //db 에서 데이타 삭제
//        hugiService.deleteHugi(hnum);
//    }
    @DeleteMapping("/delete/{hnum}")
    public void delete(@PathVariable int hnum) {
        System.out.println("delete>>" + hnum);
        HugiDto hugiDto = hugiService.detailPage(hnum);
        String prePhoto = hugiDto.getHphoto();
        storageService.deleteFile(bucketName, "birdiebuddy", prePhoto);
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
//    @GetMapping("/user/{unum}")
//    public List<UserDto> getUserDto(@PathVariable int unum) {
//        System.out.println("unum:" + unum);
//        UserDto userDto = hugiService.getUserDto(unum);
//        System.out.println(userDto.getUname());
//
//        System.out.println("unum+" + unum);
//        return hugiMapper.getUser(unum);
//    }

    @GetMapping("/getUser")
    public ResponseEntity<String> getUser(int unum) {
        String unickname = hugiMapper.getNickname(unum);
        System.out.println("unickname =>>" +unickname);
        if (unickname != null) {
            return ResponseEntity.ok(unickname);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
