package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("JoiningDto")
public class JoiningDto {
    private int jnum;
    private int unum;
    private String jcontent;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp jwriteday;
    private String jjoinday;
    private String gname;
    private String jprice;
    private String jtime;
    private String jage;
    private int jmcount;
    private int smcount;
    private String uname;
    private String unickname;
    private String uage;
    private String uphoto;
    private String ugender;
    private int jaccept;
    private String jp1gender;
    private String jp1age;
    private String jp1tasu;
    private String jp2gender;
    private String jp2age;
    private String jp2tasu;

}
