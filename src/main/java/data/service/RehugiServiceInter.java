package data.service;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RehugiServiceInter {
    void addComment(RehugiDto rehugiDto);
    void addReply(RehugiDto rehugiDto);
    List<RehugiDto> getCommentsByHnum(int hnum);
    List<RehugiDto> getAllCommentsWithReplies(@Param("hnum") int hnum);
    void deleteCommentOrReply(int rhnum);
    void deleteAllComments(int hnum);
    void updateReplyStep(@Param("ref") int ref, @Param("step") int step);

}
