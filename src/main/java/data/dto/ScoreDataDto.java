package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ScoreDataDto")
public class ScoreDataDto {
    private int[] s;
    private int unum;
    private int gnum;

    public int[] getS() {
        return s;
    }

    public void setS(int[] s) {
        this.s = s;
    }

    public int getUnum() {
        return unum;
    }

    public void setUnum(int unum) {
        this.unum = unum;
    }

    public int getGnum() {
        return gnum;
    }

    public void setGnum(int gnum) {
        this.gnum = gnum;
    }
}
