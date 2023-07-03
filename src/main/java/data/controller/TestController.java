package data.controller;

import lombok.AllArgsConstructor;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class TestController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String photo;

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/react";


    @PostMapping("/upload")
    public String upload(MultipartFile upload){
        System.out.println("upload>>"+upload);
        if(photo!=null){
            //이전 사진 삭제
            storageService.deleteFile(bucketName,"birdiebuddy",photo);
        }
        photo=storageService.uploadFile(bucketName, "birdiebuddy", upload);

        //스토리지에 저장
        return photo;
    }
}
