package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("ScoreDto")
public class ScoreDto {
    private int snum;
    private int unum;
    private int gnum;
    private int h1;
    private int h2;
    private int h3;
    private int h4;
    private int h5;
    private int h6;
    private int h7;
    private int h8;
    private int h9;
    private int h10;
    private int h11;
    private int h12;
    private int h13;
    private int h14;
    private int h15;
    private int h16;
    private int h17;
    private int h18;
    private int stasu;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp swriteday;
}
