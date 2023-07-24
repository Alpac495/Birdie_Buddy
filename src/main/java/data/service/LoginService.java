package data.service;

import data.mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService implements LoginServiceInter {

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public int loginok(String uemail, String upass) {
        Map<String, Object> map = new HashMap<>();
        map.put("uemail", uemail);
        map.put("upass", upass);
        return loginMapper.loginok(map);
    }

    @Override
    public void updateCon(String ucontent, int unum) {
        Map<String, Object> map = new HashMap<>();
        map.put("ucontent", ucontent);
        map.put("unum", unum);
        loginMapper.updateCon(map);
    }

    @Override
    public void updateNick(String unickname, int unum) {
        Map<String, Object> map = new HashMap<>();
        map.put("unickname", unickname);
        map.put("unum", unum);
        loginMapper.updateNick(map);
    }

    @Override
    public void updatePhoto(String uphoto, int unum) {
        Map<String, Object> map = new HashMap<>();
        map.put("uphoto", uphoto);
        map.put("unum", unum);
        loginMapper.updatePhoto(map);
    }

    @Override
    public void insertCode(String uhp, String code) {
        Map<String, Object> map = new HashMap<>();
        map.put("uhp", uhp);
        map.put("code", code);
        loginMapper.insertCode(map);
    }

    @Override
    public int cntHpCode(String uhp, String code) {
        Map<String, Object> map = new HashMap<>();
        map.put("uhp", uhp);
        map.put("code", code);
        return loginMapper.cntHpCode(map);
    }

    @Override
    public void passChange(int unum, String upass) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("upass", upass);
        loginMapper.passChange(map);
    }

    @Override
    public void hpChange(int unum, String uhp) {
        Map<String, Object> map = new HashMap<>();
        map.put("unum", unum);
        map.put("uhp", uhp);
        loginMapper.hpChange(map);
    }

}
