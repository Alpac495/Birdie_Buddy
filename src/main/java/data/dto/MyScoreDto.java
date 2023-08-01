package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("MyScoreDto")
public class MyScoreDto {
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
    @JsonFormat(pattern = "yyyy.MM.dd",timezone = "Asia/Seoul")
    private Timestamp swriteday;
    private int gsnum;
    private int g1;
    private int g2;
    private int g3;
    private int g4;
    private int g5;
    private int g6;
    private int g7;
    private int g8;
    private int g9;
    private int g10;
    private int g11;
    private int g12;
    private int g13;
    private int g14;
    private int g15;
    private int g16;
    private int g17;
    private int g18;
    private String gname;
    
}
