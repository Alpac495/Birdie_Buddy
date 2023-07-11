package data.service;

import data.dto.RehugiDto;
import data.mapper.RehugiMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class RehugiService implements RehugiServiceInter{


    private RehugiMapper rehugiMapper;

    @Override
    public void addComment(RehugiDto rhdto) {
        rehugiMapper.addComment(rhdto);
    }

    @Override
    public void addReply(RehugiDto rhdto) {
        rehugiMapper.addReply(rhdto);
    }

    @Override
    public List<RehugiDto> getAllCommentsWithReplies(int hnum) {
        return rehugiMapper.getAllCommentsWithReplies(hnum);
    }
    public void deleteCommentOrReply(int rhnum) {
        rehugiMapper.deleteCommentOrReply(rhnum);
    }
    @Override
    public void deleteAllComments(int hnum) {
        rehugiMapper.deleteAllComments(hnum);
    }

}
