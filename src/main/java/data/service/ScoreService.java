package data.service;

import data.mapper.ScoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ScoreService implements ScoreServiceInter{

    @Autowired
    private ScoreMapper scoreMapper;

}
