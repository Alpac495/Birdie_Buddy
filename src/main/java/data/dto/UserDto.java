package data.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    @JsonFormat(pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
    private Date ugaipday;



    private String uhp;
    private String code;
    private int rtasu;
}
