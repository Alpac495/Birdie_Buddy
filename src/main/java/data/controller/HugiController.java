package data.controller;

import data.dto.HugiDto;
import data.dto.UserDto;
import data.mapper.HugiMapper;
import data.service.HugiService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
    @PostMapping("/shortenUrl")
    public ResponseEntity<String> shortenUrl(@RequestBody String longUrl) {
        String clientId = "8cvbhm3fzt"; // 애플리케이션 클라이언트 아이디값
        String clientSecret = "j1cXNz7BdAeQ7SFB6H8HoKzSqkvLOIgkqYMs3a3N"; // 애플리케이션 클라이언트 시크릿값

        try {
            String apiURL = "https://naveropenapi.apigw.ntruss.com/util/v1/shorturl";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
            headers.set("X-NCP-APIGW-API-KEY", clientSecret);

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> requestEntity = new HttpEntity<>(longUrl, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(apiURL, HttpMethod.POST, requestEntity, String.class);
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String shortUrlResponse = responseEntity.getBody();
                return ResponseEntity.ok(shortUrlResponse);
            } else {
                return ResponseEntity.status(responseEntity.getStatusCode()).body("Error1: " + responseEntity.getBody());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error2: " + e.getMessage());
        }
    }
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
            hugiService.addLikeCount(hnum);
            return ResponseEntity.ok("좋아요 추가 성공");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("좋아요 추가 실패");
        }
    }
    @DeleteMapping("/unlike/{hnum}")
    public ResponseEntity<String> removeLike(@PathVariable int hnum) {
        try {
            // hnum을 사용하여 해당 게시물의 좋아요 정보를 업데이트합니다.
            hugiService.removeLikeCount(hnum);
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
    @PostMapping("/update")
    public ResponseEntity<String> updateHugi(@RequestBody HugiDto hdto) {
        try {
            // hdto의 hnum 값을 기준으로 해당 게시물 정보를 업데이트합니다.
            hugiService.updateHugi(hdto);
            return ResponseEntity.ok("게시물 수정 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("게시물 수정 실패");
        }
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
//        System.out.println("unum:" + unum);
        UserDto userDto = hugiService.getUserDto(unum);
//        System.out.println(userDto.getUname());

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
    @GetMapping("/detail/{hnum}") // 경로에 hnum을 받기 위해 {hnum}을 사용합니다.
    public ResponseEntity<HugiDto> getHugiByHnum(@PathVariable int hnum) {
        HugiDto hugiDto = hugiService.getHugiByHnum(hnum); // 데이터베이스에서 해당 hnum에 해당하는 게시물 정보를 가져옵니다.

        if (hugiDto != null) {
            return ResponseEntity.ok(hugiDto); // 게시물 정보를 클라이언트에게 반환합니다.
        } else {
            return ResponseEntity.notFound().build(); // 해당 hnum에 해당하는 게시물이 없는 경우 404 에러를 반환합니다.
        }
    }
}
