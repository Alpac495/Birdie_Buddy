package data.service;


public interface LoginServiceInter {
    public int loginok(String uemail, String upass);

    public void updateCon(String ucontent, int unum);

    public void updateNick(String unickname, int unum);

    public void updatePhoto(String uphoto, int unum);

    public void insertCode(String uhp, String code);

    public int cntHpCode(String uhp, String code);
}
