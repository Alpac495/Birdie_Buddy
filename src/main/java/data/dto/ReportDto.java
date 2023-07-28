package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;
import java.util.Date;

@Data
@Alias("ReportDto")
public class ReportDto {
    private int rnum;
    private int unum;
    private int runum;
    private String reason;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Date rwriteday;
}
