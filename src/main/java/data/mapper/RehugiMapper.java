package data.mapper;

import data.dto.RehugiDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RehugiMapper {

    public void addComment(RehugiDto rhdto);
    public void addReply(RehugiDto rhdto);
    List<RehugiDto> getAllCommentsWithReplies();

    public void deleteComment(@Param("unum") int unum);

    public void deleteReply(@Param("unum") int unum);
}
