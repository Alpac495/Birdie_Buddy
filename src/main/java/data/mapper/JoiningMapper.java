package data.mapper;

import data.dto.JoiningDto;
import data.dto.JoinmemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoiningMapper {
    public void insertJoin(JoiningDto dto);

    public void updateJoin(JoiningDto dto);

    public List<JoiningDto> getJoiningList();

    public List<JoiningDto> getMyJoinList(int unum);

    public JoiningDto detailPage(int jnum);

    public int joinCancel(int jnum);

    public void joinMaker(JoinmemberDto dto);
}
