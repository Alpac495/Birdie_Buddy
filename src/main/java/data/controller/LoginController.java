package data.controller;

import data.dto.UserDto;
import data.mapper.LoginMapper;
import data.service.LoginService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    String photo;
    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";
    @Autowired
    LoginService loginService;
    @Autowired
    private NcpObjectStorageService storageService;
    private String bucketName = "bit701-bucket-111";

    @PostMapping("/sign")
    public void signUser(@RequestBody UserDto dto) {
        System.out.println(dto);
        loginService.signUser(dto);
    }

    @GetMapping("/login")
    public int loginok(HttpSession session, String uemail, String upass, @RequestParam(defaultValue = "false") String saveemail) {
        System.out.println("uemail=" + uemail);
        System.out.println("upass=" + upass);
        System.out.println("이메일저장체크=" + saveemail);
        UserDto udto;

        int n = loginService.loginok(uemail, upass);
        if (n == 1) {
            udto = loginService.getUserData(uemail);
            int unum = udto.getUnum();

            return unum;
        }else {
            System.out.println("로그인 실패");
            return 0;
        }
    }
//    @GetMapping("/getuser")
//    public String getuser (String uemail){
//        UserDto udto;
//        udto = loginService.getUserData(uemail);
//
//
//
//
//        return "udto";
//    }


}

//    @GetMapping("/login")
//    public void loginUser



