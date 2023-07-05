package data.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class msgDto {

    private  String type;
    private String roomId;
    private String userName;
    private String msg;
}
