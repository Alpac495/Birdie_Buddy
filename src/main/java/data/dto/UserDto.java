package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("UserDto")
public class UserDto {
    private int unum;
    private String uemail;
    private String upass;
    private String uname;
    private String unickname;
    private String uage;
    private String uphoto;
    private String ugender;
    private String ucontent;
    private String utasuopen;
    private String ucareer;
    private String ubgphoto;
    private int ureport;
    private int ublacklist;


    private String uhp;
    private String code;
    private int rtasu;
}
