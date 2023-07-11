package data.service;

import data.dto.YangdoDto;
import data.mapper.YangdoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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
}
