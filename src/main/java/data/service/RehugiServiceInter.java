package data.service;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RehugiServiceInter {
    public void addComment(RehugiDto rhdto);
    public void addReply(RehugiDto rhdto);
    List<RehugiDto> getAllCommentsWithReplies();

    public void deleteComment(@Param("unum") int unum);

    public void deleteReply(@Param("unum") int unum);
}
