package data.service;

import data.dto.ReportDto;

import java.util.List;

public interface ReportServiceInter {
    public List<ReportDto> getAllReport();

    public int getTotalCount();

    public List<ReportDto> getReport(int runum);

    public void newReport(ReportDto rdto);

    public int getCountByRunum(int runum);

}
