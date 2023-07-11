package data.controller;


import data.dto.RehugiDto;
import data.service.RehugiService;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/rehugi")
public class RehugiController {
    @Autowired
    private NcpObjectStorageService storageService;

    private String bucketName="bit701-bucket-111";

    String bucketPath="http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";


    private final RehugiService rehugiService;

    @Autowired
    public RehugiController(RehugiService rehugiService) {
        this.rehugiService = rehugiService;
    }

    @PostMapping("/newcomment")
    public String newComment(@RequestBody RehugiDto rhdto) {
        System.out.println("rhdto>>"+rhdto);
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
//        String formattedDate = dateFormat.format(new Date());
//        Timestamp timestamp = Timestamp.valueOf(formattedDate);
//        rhdto.setRhwriteday(timestamp);
        rehugiService.addComment(rhdto);
        return "Comment added successfully";
    }


    @PostMapping("/newreply")
    public String newReply(@RequestParam("unum") int unum, @RequestBody RehugiDto rhdto) {
        System.out.println("unum>>"+unum);
        System.out.println("rhdto>>"+rhdto);
        rhdto.setUnum(unum);
        rehugiService.addReply(rhdto);
        return "Reply added successfully";
    }

    @GetMapping("/comments")
    public List<RehugiDto> getCommentsAndReplies(@RequestParam("hnum") int hnum) {
        return rehugiService.getAllCommentsWithReplies(hnum);
    }

    @DeleteMapping("/deletecomment/{rhnum}")
    public String deleteCommentOrReply(@PathVariable(value = "rhnum") int rhnum) {
        System.out.println("delete rhnum>>" + rhnum);
        rehugiService.deleteCommentOrReply(rhnum);
        return "Comment or Reply deleted successfully";
    }
    @DeleteMapping("/deleteAllComments/{hnum}")
    public String deleteAllComments(@PathVariable int hnum) {
        rehugiService.deleteAllComments(hnum);
        return "All comments and replies deleted successfully";
    }
}
