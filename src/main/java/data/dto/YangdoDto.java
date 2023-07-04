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
    private String yphoto;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp ywriteday;
    private int bnum;
}
