package data.service;

import data.dto.RehugiDto;
import data.mapper.RehugiMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RehugiService implements RehugiServiceInter{

    @Autowired
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
    public List<RehugiDto> getAllCommentsWithReplies() {
        return rehugiMapper.getAllCommentsWithReplies();
    }
    @Override
    public void deleteComment(int unum) {
        rehugiMapper.deleteComment(unum);
    }

    @Override
    public void deleteReply(int unum) {
        rehugiMapper.deleteReply(unum);
    }
}
