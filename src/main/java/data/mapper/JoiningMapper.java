package data.mapper;

import data.dto.JoiningDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoiningMapper {
    public void insertJoin(JoiningDto dto);
    public List<JoiningDto> getJoiningList();
    public JoiningDto detailPage(int jnum);
}
