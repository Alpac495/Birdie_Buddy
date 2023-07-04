package data.service;

import data.mapper.YangdoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class YangdoService implements YangdoServiceInter{

    @Autowired
    private YangdoMapper yangdoMapper;

}
