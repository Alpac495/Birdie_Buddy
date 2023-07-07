package data.controller;

import data.dto.HugiDto;
import data.dto.UserDto;
import data.service.HugiService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String hphoto;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";
    @Autowired
    private HugiService hugiService;
    @GetMapping("/list")
    public List<HugiDto> list(){
        System.out.println("list>>");
        return hugiService.getAllHugis();
    }
    @PostMapping("/upload")
    public String photoUpload(@RequestParam("upload") MultipartFile upload){
        System.out.println("upload>>"+upload.getOriginalFilename());
        if(hphoto!=null) {
            //이전 사진 삭제
            storageService.deleteFile(bucketName, "birdiebuddy", hphoto);
        }
        hphoto=storageService.uploadFile(bucketName, "birdiebuddy", upload);

        return hphoto;
    }
    @PostMapping("/insert")
    public void insert(@RequestBody HugiDto hdto){
        System.out.println("hdto>>"+hdto);

        // uname 정보 가져오기
        String uname = hdto.getUname();
        hdto.setHphoto(hphoto);
        hugiService.insertHugi(hdto);
        hphoto = null;
    }
    @GetMapping("/detail")
    public HugiDto detailPage(int hnum){
        System.out.println("detail>>"+hnum);
        return hugiService.detailPage(hnum);
    }
    @DeleteMapping("/delete")
    public void delete(int hnum)
    {
        System.out.println("delete>>"+hnum);
        //num 에 해당하는 사진 스토리지에서 지우기
        String prePhoto=hugiService.detailPage(hnum).getHphoto();
        storageService.deleteFile(bucketName, "birdiebuddy", prePhoto);

        //db 에서 데이타 삭제
        hugiService.deleteHugi(hnum);
    }

}
