package data.dto;

import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Data
@ToString
public class roomDto {

    private String roomId;
    private String roomName;

    public static roomDto create(String name) {
        roomDto r = new roomDto();
        r.roomId = UUID.randomUUID().toString();
        r.roomName = name;
        return r;
    }
}
