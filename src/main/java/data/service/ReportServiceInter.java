package data.service;

import data.dto.ReportDto;

import java.util.List;

public interface ReportServiceInter {
    public List<ReportDto> getAllReport();

    public int getTotalCount();

    List<ReportDto> getReport(int runum, int limit, int offset);

    public void newReport(ReportDto rdto);

    public int getCountByRunum(int runum);

    public void blacklistUser(int unum);


}
