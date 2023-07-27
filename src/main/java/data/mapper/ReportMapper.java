package data.mapper;

import data.dto.ReportDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportMapper {
    public List<ReportDto> getAllReport();

    public int getTotalCount();

    public List<ReportDto> getReport(int runum);

    public void newReport(ReportDto rdto);

    public int getCountByRunum(int runum);
}
