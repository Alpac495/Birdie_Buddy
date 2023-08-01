package data.service;

import data.dto.HugiDto;
import data.dto.UserDto;
import data.mapper.HugiMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public HugiDto getHugiByHnum(int hnum) {
        return hugiMapper.getHugiByHnum(hnum);
    }

    @Override
    public void insertHugi(HugiDto hdto) {
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hdto.getUnum();
        UserDto userDto = getUserDto(unum);
        String unickname = userDto.getUnickname();
        // HugiDto에 사용자 정보 설정

        hdto.setUnickname(unickname);

        hugiMapper.insertHugi(hdto);
    }
    public void updateHugi(HugiDto hdto) {
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hdto.getUnum();
        UserDto userDto = getUserDto(unum);
        String unickname = userDto.getUnickname();

        // HugiDto에 사용자 정보 설정
        hdto.setUnickname(unickname);

        // HugiMapper를 통해 데이터베이스에서 해당 게시물 정보를 업데이트합니다.
        hugiMapper.updateHugi(hdto);
    }
    @Override
    public void addLikeToHugiLike(int hnum, int unum) {
        // hugilike 테이블에 좋아요 정보를 추가합니다.
        hugiMapper.addLikeToHugiLike(hnum, unum);
        hugiMapper.incrementHugiLikeCount(hnum);
    }

    public void removeLikeFromHugiLike(int hnum, int unum) {

        // hugilike 테이블에서 좋아요 정보를 삭제합니다.
        hugiMapper.removeLikeFromHugiLike(hnum, unum);
    }

    @Override
    public HugiDto detailPage(int hnum) {
        HugiDto hugiDto = hugiMapper.detailPage(hnum);
        // unum을 사용하여 사용자 정보 가져오기
        int unum = hugiDto.getUnum();
        UserDto userDto = getUserDto(unum);
        String unickname = userDto.getUnickname();
        String uphoto=userDto.getUphoto();
        // HugiDto에 사용자 정보 설정
        hugiDto.setUnickname(unickname);
        hugiDto.setUphoto(uphoto);
        return hugiDto;
    }

    @Override
    public void deleteHugi(int hnum) {
        hugiMapper.deleteHugi(hnum);
    }
    @Override
    public UserDto getUserDto(int unum) {
        UserDto userDto = hugiMapper.getUserDto(unum);
        if (userDto == null) {
            // 데이터베이스에서 사용자 정보를 찾지 못한 경우 적절한 로직을 추가하여 처리
            // 예를 들어, 존재하지 않는 사용자를 처리하는 방법을 정의하거나 기본값을 설정할 수 있습니다.
            // 여기서는 빈 UserDto 객체를 반환하도록 설정하는 예시를 보여드립니다.
            userDto = new UserDto();
        }
        return userDto;
    }

}

