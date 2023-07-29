package data.mapper;

import data.dto.ReportDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReportMapper {
    public List<ReportDto> getAllReport();

    public int getTotalCount();

    List<ReportDto> getReport(@Param("runum") int runum, @Param("limit") int limit, @Param("offset") int offset);

    public void newReport(ReportDto rdto);

    public int getCountByRunum(int runum);

    public void blacklistUser(int unum);
}
