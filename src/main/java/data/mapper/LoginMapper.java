package data.mapper;

import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
public interface LoginMapper {
    public List<UserDto> getUserData(int unum);
}
