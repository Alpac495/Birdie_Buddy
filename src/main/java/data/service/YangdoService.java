package data.service;

import data.dto.YangdoDto;
import data.mapper.YangdoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class YangdoService implements YangdoServiceInter{

    @Autowired
    private YangdoMapper yangdoMapper;


    @Override
    public void insertYList(YangdoDto dto) {
        yangdoMapper.insertYList(dto);
    }

    @Override
    public List<YangdoDto> getAllDatas() {
        return yangdoMapper.getAllDatas();
    }

    @Override
    public YangdoDto getData(int num) {
        return yangdoMapper.getData(num);
    }

    @Override
    public void deleteYangdo(int num) {
        yangdoMapper.deleteYangdo(num);
    }

    @Override
    public int getTotalCount() {
        return yangdoMapper.getTotalCount();
    }

    @Override
    public List<YangdoDto> getPagingList(int start, int perpage) {

        Map<String, Integer> map = new HashMap<>();
        map.put("start", start);
        map.put("perpage", perpage);

        return yangdoMapper.getPagingList(map);
    }

    @Override
    public void updateYangdo(YangdoDto dto) {
        yangdoMapper.updateYangdo(dto);
    }

    @Override
    public List<YangdoDto> MyYangdoList(int start, int perpage) {
        Map<String, Integer> map = new HashMap<>();
        map.put("start", start);
        map.put("perpage", perpage);

        return yangdoMapper.MyYangdoList(map);
    }
}
