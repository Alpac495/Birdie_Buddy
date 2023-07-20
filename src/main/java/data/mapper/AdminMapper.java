package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.UserDto;

@Mapper
public interface AdminMapper {
    public List<UserDto> getUserList();
}
