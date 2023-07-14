package data.mapper;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface RehugiMapper {
    void addComment(RehugiDto rehugiDto);
    void addReply(RehugiDto rehugiDto);
//    List<RehugiDto> getCommentsByHnum(int hnum);
    List<RehugiDto> getAllCommentsWithReplies(@Param("hnum") int hnum);
    void deleteCommentOrReply(int rhnum);
    void deleteAllComments(int hnum);
    void updateReplyStep(@Param("ref") int ref, @Param("step") int step);
}
