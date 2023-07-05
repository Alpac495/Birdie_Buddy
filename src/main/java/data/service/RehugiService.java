package data.service;

import data.mapper.RehugiMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RehugiService implements RehugiServiceInter{

    @Autowired
    private RehugiMapper rehugiMapper;

}
