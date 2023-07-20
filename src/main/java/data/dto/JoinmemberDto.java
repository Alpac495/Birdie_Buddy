package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("JoinmemberDto")
public class JoinmemberDto {
    private int jmnum;
    private int unum;
    private int jnum;
    private int jaceept;
    private String uname;
    private String unickname;
    private String uage;
    private String uphoto;
    private String ugender;
    private String jp1gender;
    private String jp1age;
    private String jp1tasu;
    private int jcount;
}
