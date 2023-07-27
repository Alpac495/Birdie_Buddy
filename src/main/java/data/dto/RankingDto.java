package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("RankingDto")
public class RankingDto {
    private int rnum;
    private int unum;
    private int rtasu;
    private String uphoto;
    private String unickname;
    
}
