package data.mapper;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface RehugiMapper {
    public void addComment(RehugiDto rehugiDto);
    public void addReply(RehugiDto rehugiDto);
    List<RehugiDto> getCommentsByHnum(int hnum);
    public List<RehugiDto> getAllCommentsWithReplies(@Param("hnum") int hnum);
    public void deleteCommentOrReply(int rhnum);
    public void deleteAllComments(int hnum);
}
