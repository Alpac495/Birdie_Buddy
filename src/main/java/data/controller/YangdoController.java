package data.controller;

import data.dto.YangdoDto;
import data.service.YangdoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/yangdo")
public class YangdoController {


    @Autowired
    private YangdoService yangdoService;

    @PostMapping("/insert")
    public void insert(@RequestBody YangdoDto dto)
    {
        System.out.println("insert>>" + dto);

        yangdoService.insertYList(dto);
    }

    @GetMapping("detail")
    public  YangdoDto detailPage(int num)
    {
        System.out.println("detail>>" + num);

        return yangdoService.getData(num);
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") int currentPage)
    {
        System.out.println("list>>"+currentPage);

        //페이징처리
        int totalCount;    //총갯수
        int perPage=3;    //한페이지당 출력할 글갯수
        int perBlock=3;    //출력할 페이지갯수
        int startNum;    //db에서 가져올 시작번호
        int startPage;    //출력할 시작페이지
        int endPage;    //출력할 끝페이지
        int totalPage;    //총 페이지수
        int no;            //출력할 시작번호

        //총갯수
        totalCount=yangdoService.getTotalCount();
        //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        //시작번호
        startNum=(currentPage-1)*perPage;
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        List<YangdoDto> list=yangdoService.getPagingList(startNum, perPage);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> smap=new HashMap<>();
        smap.put("totalCount",totalCount);
        smap.put("list",list);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        return  smap;
    }

    @DeleteMapping("delete")
    public void deleteYangdo(int num)
    {
        // db에서 데이터 삭제
        yangdoService.deleteYangdo(num);
    }

    @PostMapping("/update")
    public void updateYangdo(@RequestBody YangdoDto dto){
        System.out.println("update>>"+dto);
        yangdoService.updateYangdo(dto);
    }

    @GetMapping("/myyangdo")
    public Map<String, Object> myyangdo(@RequestParam(defaultValue = "1") int currentPage, int unum)
    {
        System.out.println("list>>"+currentPage);

        //페이징처리
        int totalCount;    //총갯수
        int perPage=3;    //한페이지당 출력할 글갯수
        int perBlock=3;    //출력할 페이지갯수
        int startNum;    //db에서 가져올 시작번호
        int startPage;    //출력할 시작페이지
        int endPage;    //출력할 끝페이지
        int totalPage;    //총 페이지수
        int no;            //출력할 시작번호

        //총갯수
        totalCount=yangdoService.getMyCount(unum);
        //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        //시작번호
        startNum=(currentPage-1)*perPage;
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        List<YangdoDto> list=yangdoService.MyYangdoList(startNum, perPage, unum);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> mymap=new HashMap<>();
        mymap.put("totalCount",totalCount);
        mymap.put("list",list);
        mymap.put("parr",parr);
        mymap.put("startPage",startPage);
        mymap.put("endPage",endPage);
        mymap.put("no",no);
        mymap.put("totalPage",totalPage);

        return  mymap;
    }

}
