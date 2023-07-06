package data.service;

import data.dto.GolfjangDto;
import data.mapper.GolfjangMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class GolfjangService implements GolfjangServiceInter{

    @Autowired
    private GolfjangMapper golfjangMapper;

    @Override
    public List<GolfjangDto> getGolfjangList() {
        return golfjangMapper.getGolfjangList();
    }
}
