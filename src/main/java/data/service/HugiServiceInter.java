package data.service;

import data.dto.HugiDto;
import data.dto.UserDto;


import java.util.List;

public interface HugiServiceInter {
    public int getTotalCount();
    public List<HugiDto> getAllHugis();
    public void insertHugi(HugiDto hdto);
    public void updateHugi(HugiDto hdto);
    public void addLikeCount(int hnum);
    public void removeLikeCount(int hnum);
    public HugiDto detailPage(int hnum);
    public void deleteHugi(int hnum);
    public UserDto getUserDto(int unum);
    public List<HugiDto> getHugiListByUnum(int unum);
    public HugiDto getHugiByHnum(int hnum);

}
