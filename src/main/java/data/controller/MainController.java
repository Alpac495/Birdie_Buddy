package data.controller;

import data.dto.FriendDto;
import data.dto.HugiDto;
import data.dto.JoiningDto;
import data.dto.UserDto;
import data.mapper.JoiningMapper;
import data.mapper.MainMapper;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
    MainMapper mainMapper;

    @Autowired
    JoiningMapper joiningMapper;

    @GetMapping("/reco")
    public List<JoiningDto> getRecoList(){

      return joiningMapper.getJoiningList();
    }

    @GetMapping("/combine")
    public List<Object> getCombinedList(int unum){

      if(unum == 0){
          List<UserDto> ualist = mainMapper.getAllUserList();

          List<Object> combinedList = new ArrayList<>();
          combinedList.addAll(ualist);

          return combinedList;
      }else{
          List<FriendDto> flist = mainMapper.getFriendList(unum);
          List<UserDto> ulist = mainMapper.getUserList(unum);
          

          List<Object> combinedList = new ArrayList<>();
          combinedList.addAll(flist);
          combinedList.addAll(ulist);
          return combinedList;
      }
    }

    @GetMapping("/hugi")
    public List<HugiDto> getHugiList(){

      List<HugiDto> list = mainMapper.getHugiList();

      return list;
    }



}
