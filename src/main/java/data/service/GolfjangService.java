package data.service;

import data.mapper.GolfjangMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GolfjangService implements GolfjangServiceInter{

    @Autowired
    private GolfjangMapper golfjangMapper;

}
