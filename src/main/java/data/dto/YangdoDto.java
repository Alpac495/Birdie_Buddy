package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("YangdoDto")
public class YangdoDto {
    private int ynum;
    private int unum;
    private String ycontent;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp ywriteday;
    private int yprice;
    private String yplace;
    private String yday;
    private String ysubject;
    private String unickname;
    private String uname;
    private String uhp;
    private String uage;
    private String uphoto;
    private String ugender;

    private String keyword;
}
