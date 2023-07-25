package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ChatroomDto")
public class ChatroomDto {
    private int cnum;
    private int unum;
    private int cunum;
    private String chatid;
}