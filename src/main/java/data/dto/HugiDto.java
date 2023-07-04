package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("HugiDto")
public class HugiDto {
    private int hnum;
    private int unum;
    private int hlike;
    private String hcontent;
    private String hphoto;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp hwriteday;

}
