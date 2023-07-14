package data.service;

import data.dto.HugiDto;
import data.dto.UserDto;
import data.mapper.HugiMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HugiService implements HugiServiceInter
{
    private HugiMapper hugiMapper;

    @Override
    public int getTotalCount() {
        return hugiMapper.getTotalCount();
    }

    @Override
    public List<HugiDto> getAllHugis() {
        return hugiMapper.getAllHugis();
    }
//    @Override
//    public List<HugiDto> getHugisByUser(int unum) {
//        List<HugiDto> list = hugiMapper.getHugisByUser(unum);
//
//        // 각 후기의 작성자 정보 가져오기
//        for (HugiDto hugi : list) {
//            UserDto userDto = getUserDto(hugi.getUnum());
//            hugi.setUname(userDto.getUname());
//            hugi.setUnickname(userDto.getUnickname());
//        }
//
//        return list;
//    }

    @Override
    public void insertHugi(HugiDto hdto) {
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hdto.getUnum();
        UserDto userDto = getUserDto(unum);
        String uname = userDto.getUname();
        String unickname = userDto.getUnickname();

        // HugiDto에 사용자 정보 설정
        hdto.setUname(uname);
        hdto.setUnickname(unickname);

        hugiMapper.insertHugi(hdto);
    }

    @Override
    public void updateLikeCount(int unum ,int hlike) {
        hugiMapper.updateLikeCount(unum,hlike);
    }

    @Override
    public HugiDto detailPage(int hnum) {
        HugiDto hugiDto = hugiMapper.detailPage(hnum);

        // unum을 사용하여 사용자 정보 가져오기
        int unum = hugiDto.getUnum();
        UserDto userDto = getUserDto(unum);
        String uname = userDto.getUname();
        String unickname = userDto.getUnickname();

        // HugiDto에 사용자 정보 설정
        hugiDto.setUname(uname);
        hugiDto.setUnickname(unickname);

        return hugiDto;
    }

    @Override
    public void deleteHugi(int hnum) {
        hugiMapper.deleteHugi(hnum);
    }
    @Override
    public UserDto getUserDto(int unum) {
        UserDto userDto = new UserDto();
        return userDto;
    }
}

