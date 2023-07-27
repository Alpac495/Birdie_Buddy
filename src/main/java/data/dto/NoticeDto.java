package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("NoticeDto")
public class NoticeDto {
    private int nnum;
    private String nsubject;
    private String ncontent;
    private String nphoto;
    private String ncate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp nwriteday;
}
