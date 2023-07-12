package data.service;

import data.dto.YangdoDto;

import java.util.List;
import java.util.Map;

public interface YangdoServiceInter {

    public void insertYList(YangdoDto dto);
    public List<YangdoDto> getAllDatas();
    public YangdoDto getData(int num);
    public void deleteYangdo(int num);
    public int getTotalCount();
    public List<YangdoDto> getPagingList(int start, int perpage);
    public void updateYangdo(YangdoDto dto);

}
