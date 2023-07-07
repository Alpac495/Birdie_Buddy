package data.service;

import data.dto.GolfjangDto;
import data.dto.JoiningDto;
import data.mapper.JoiningMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class JoiningService implements JoiningServiceInter{

    @Autowired
    private JoiningMapper joiningMapper;

    @Override
    public void insertJoin(JoiningDto dto) {
        joiningMapper.insertJoin(dto);
    }

    @Override
    public List<JoiningDto> getJoiningList() {
        return joiningMapper.getJoiningList();
    }
}
