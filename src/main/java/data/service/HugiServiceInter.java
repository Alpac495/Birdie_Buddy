package data.service;

import data.dto.HugiDto;

import java.util.List;

public interface HugiServiceInter {
    public int getTotalCount();
    public List<HugiDto> getAllHugis();
    public void insertHugi(HugiDto hdto);
    public void updateLikeCount(int unum, int hlike);
    public HugiDto detailPage(int hnum);
    public void deleteHugi(int hnum);
}
