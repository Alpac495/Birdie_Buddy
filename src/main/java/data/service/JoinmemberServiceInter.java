package data.service;

import data.dto.JoinmemberDto;

import java.util.List;

public interface JoinmemberServiceInter {
    public List<JoinmemberDto> getJoinmemberList(int jnum);
    public List<JoinmemberDto> getSubmemberList(int jnum);
    public int getCheckMember(int unum, int jnum);
    public void joinGaip(JoinmemberDto dto);
    public int joinCancel(int unum, int jnum);
    public int acceptJoin(int unum, int jnum);
}
