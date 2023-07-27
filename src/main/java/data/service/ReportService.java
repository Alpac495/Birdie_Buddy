package data.service;

import data.dto.ReportDto;
import data.mapper.ReportMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService implements ReportServiceInter{
    private ReportMapper reportMapper;

    @Override
    public List<ReportDto> getAllReport() {
        return reportMapper.getAllReport();
    }

    @Override
    public int getTotalCount() {
        return reportMapper.getTotalCount();
    }

    @Override
    public List<ReportDto> getReport(int runum) {
        return reportMapper.getReport(runum);
    }

    @Override
    public void newReport(ReportDto rdto) {
        reportMapper.newReport(rdto);
    }

    @Override
    public int getCountByRunum(int runum) {
        return reportMapper.getCountByRunum(runum);
    }
}
