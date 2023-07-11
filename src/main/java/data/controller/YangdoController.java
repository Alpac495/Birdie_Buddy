package data.controller;

import data.dto.YangdoDto;
import data.service.YangdoService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/yangdo")
public class YangdoController {

    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/yangdo";

    String photo;

    @Autowired
    private YangdoService yangdoService;

    @PostMapping("/upload")
    public String photoUpload(MultipartFile upload)
    {
        System.out.println("upload>>"+upload.getOriginalFilename());

        if(photo!=null) {
            // 이전 사진 삭제
            storageService.deleteFile(bucketName, "yangdo", photo);
            photo=null;
        }

        photo=storageService.uploadFile(bucketName, "yangdo", upload);

        return photo;
    }

    @PostMapping("/insert")
    public void insert(@RequestBody YangdoDto dto)
    {
        System.out.println("insert>>" + dto);

        dto.setYphoto(photo);

        yangdoService.insertYList(dto);

        photo = null;
    }

    @GetMapping("detail")
    public  YangdoDto detailPage(int num)
    {
        System.out.println("detail>>" + num);

        return yangdoService.getData(num);
    }

    @GetMapping("list")
    public List<YangdoDto> list()
    {
        System.out.println("list>>");
        return  yangdoService.getAllDatas();
    }

    @DeleteMapping("delete")
    public void deleteYangdo(int num)
    {
        // num에 해당하는 사진 스토리지에서 지우기
        String prePhoto = yangdoService.getData(num).getYphoto();
        storageService.deleteFile(bucketName, "yangdo", prePhoto);

        // db에서 데이터 삭제
        yangdoService.deleteYangdo(num);
    }


}
