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
    @Override
    public void insertHugi(HugiDto hdto) {
        hugiMapper.insertHugi(hdto);
    }

    @Override
    public void updateLikeCount(int unum ,int hlike) {
        hugiMapper.updateLikeCount(unum,hlike);
    }

    @Override
    public HugiDto detailPage(int hnum) {
        return hugiMapper.detailPage(hnum);
    }

    @Override
    public void deleteHugi(int hnum) {
        hugiMapper.deleteHugi(hnum);
    }


}
