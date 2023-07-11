package data.service;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RehugiServiceInter {
    public void addComment(RehugiDto rhdto);
    public void addReply(RehugiDto rhdto);
    public List<RehugiDto> getAllCommentsWithReplies(@Param("hnum") int hnum);

    void deleteComment(int unum);
    void deleteReply(int unum);
}
