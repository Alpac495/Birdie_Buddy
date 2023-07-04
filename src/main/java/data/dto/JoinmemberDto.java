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
}
