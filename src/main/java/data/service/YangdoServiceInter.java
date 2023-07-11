package data.service;

import data.dto.YangdoDto;

import java.util.List;

public interface YangdoServiceInter {

    public void insertYList(YangdoDto dto);
    public List<YangdoDto> getAllDatas();
    public YangdoDto getData(int num);
    public void deleteYangdo(int num);

}
