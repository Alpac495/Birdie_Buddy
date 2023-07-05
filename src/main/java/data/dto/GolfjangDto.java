package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("GolfjangDto")
public class GolfjangDto {
    private int gnum;
    private String gname;
    private String ghp;
    private String gaddress;
}
