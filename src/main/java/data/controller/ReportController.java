package data.controller;

import data.dto.ReportDto;
import data.mapper.ReportMapper;
import data.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/report")
public class ReportController {

    @Autowired
    ReportMapper reportMapper;

    @Autowired
    ReportService reportService;

    @GetMapping("/getallreport")
    public List<ReportDto> getAllReport(){
        return reportService.getAllReport();
    }

    @GetMapping("/gettotalcount")
    public int getTotalCount(){
        return reportService.getTotalCount();
    }

    @GetMapping("/getreport")
    public List<ReportDto> getReport(@RequestParam int runum, @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "0") int offset){
        return reportService.getReport(runum, limit, offset);
    }

    @GetMapping("/getcount")
    public int getCount(@RequestParam int runum){
        return reportService.getCountByRunum(runum);
    }

    @PostMapping("/newReport")
    public void newReport(@RequestBody ReportDto rdto){
        System.out.println("컨트롤러 rdto : "+rdto);
        reportService.newReport(rdto);
    }

    @PostMapping("/blacklist")
    public void blacklistUser(@RequestParam int unum){
        reportService.blacklistUser(unum);
    }
}
