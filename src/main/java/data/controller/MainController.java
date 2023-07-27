package data.controller;

import data.dto.FriendDto;
import data.dto.HugiDto;
import data.dto.JoiningDto;
import data.dto.NoticeDto;
import data.dto.UserDto;
import data.mapper.JoiningMapper;
import data.mapper.MainMapper;
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
  MainMapper mainMapper;

  @Autowired
  JoiningMapper joiningMapper;

  @GetMapping("/reco")
  public List<JoiningDto> getRecoList(){

  return mainMapper.getRecoList();
  }

  @GetMapping("/combine")
  public List<Object> getCombinedList(int unum) {

    if (unum == 0) {
      List<UserDto> ualist = mainMapper.getAllUserList();
      System.out.println(ualist);

      List<Object> combinedList = new ArrayList<>();
      combinedList.addAll(ualist);

      return combinedList;
    } else {
      List<FriendDto> flist = mainMapper.getFriendList(unum);
      List<UserDto> ulist = mainMapper.getUserList(unum);

      List<Object> combinedList = new ArrayList<>();
      combinedList.addAll(flist);
      combinedList.addAll(ulist);

      return combinedList;
    }
  }

  @GetMapping("/hugi")
  public List<HugiDto> getHugiList() {

    return mainMapper.getHugiList();
  }

  @GetMapping("/notice")
  public List<NoticeDto> getNoticeList(){
    return mainMapper.getNoticeList();
  }

  @GetMapping("/userdata")
  public List<UserDto> getLoginUser(int unum){

    return mainMapper.getLoginUser(unum);
  }
}
