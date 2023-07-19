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
    public List<HugiDto> getHugiListByUnum(int unum) {
        // 데이터베이스에서 해당 unum을 가진 사용자의 후기 데이터를 조회하는 메소드를 호출합니다.
        // hugiRepository.getHugiListByUnum(unum)와 같은 형태로 가정합니다.
        return hugiMapper.getHugiListByUnum(unum);
    }
    @Override
    public void insertHugi(HugiDto hdto) {
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hdto.getUnum();
        UserDto userDto = getUserDto(unum);
        String uname = userDto.getUname();
        String unickname = userDto.getUnickname();

        // HugiDto에 사용자 정보 설정

        hdto.setUnickname(unickname);

        hugiMapper.insertHugi(hdto);
    }
    @Override
    public void addLikeCount(int hnum) {
        hugiMapper.addLikeCount(hnum);
    }

    @Override
    public void removeLikeCount(int hnum) {
        hugiMapper.removeLikeCount(hnum);
    }

    @Override
    public HugiDto detailPage(int hnum) {
        HugiDto hugiDto = hugiMapper.detailPage(hnum);
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hugiDto.getUnum();
        UserDto userDto = getUserDto(unum);
        String unickname = userDto.getUnickname();
        // HugiDto에 사용자 정보 설정
        hugiDto.setUnickname(unickname);

        return hugiDto;
    }

    @Override
    public void deleteHugi(int hnum) {
        hugiMapper.deleteHugi(hnum);
    }
    public UserDto getUserDto(int unum) {
        return hugiMapper.getUserDto(unum);
    }

}

