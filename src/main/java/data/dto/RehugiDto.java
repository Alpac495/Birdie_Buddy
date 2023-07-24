package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("RehugiDto")
public class RehugiDto {
    private int rhnum;
    private int hnum;
    private int unum;
    private String rhcontent;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp rhwriteday;
    private int ref;
    private int step;
    private int depth;
    private String unickname;
    private String uphoto;
}
