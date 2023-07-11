package data.controller;

import data.dto.UserDto;
import data.mapper.LoginMapper;
import data.service.LoginService;
import naver.cloud.NcpObjectStorageService;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.sql.Timestamp;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

//    @Autowired
//    private NcpObjectStorageService storageService;
//    String photo;
//    String bucketPath = "http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy";
//    private String bucketName = "bit701-bucket-111";

    @Autowired
    LoginService loginService;
    @Autowired
    LoginMapper loginMapper;

    @PostMapping("/sign")
    public void signUser(@RequestBody UserDto dto) {
        System.out.println(dto);
        loginMapper.signUser(dto);
    }

    @GetMapping("/login")
    public int loginok(String uemail, String upass, @RequestParam(defaultValue = "false") String saveemail) {
        System.out.println("uemail=" + uemail);
        System.out.println("upass=" + upass);
        System.out.println("이메일저장체크=" + saveemail);
        UserDto udto;

        int n = loginService.loginok(uemail, upass);
        if (n == 1) {
            udto = loginMapper.getUserData(uemail);
            int unum = udto.getUnum();

            return unum;
        }else {
            System.out.println("로그인 실패");
            return 0;
        }
    }

    @GetMapping("/emailchk")
    public int emailchk(String uemail){
        System.out.println("이메일체크:"+uemail);
        int n = loginMapper.emailChk(uemail);
        System.out.println("n:"+n);
        return n;
    }
    @GetMapping("/hpchk")
    public int hpchk(String uhp){
        int n = loginMapper.hpChk(uhp);
        return n;
    }






    @Value("${naver.accessKey}")
    private String accessKey;
    @Value("${naver.secretKey}")
    private String secretKey;
    @Value("${naver.serviceId}")
    private String serviceId;

    @GetMapping("/smsSend")
    public String smsSend(String uhp) throws Exception {
        String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        int LENGTH = 6;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        String code = sb.toString();
        System.out.println("code:"+code);
        int n = loginMapper.cntCode(uhp);
        System.out.println(n);
        if(n != 0) {
            loginMapper.deleteCode(uhp);
        }
        loginMapper.insertCode(uhp, code);

        String hostNameUrl = "https://sens.apigw.ntruss.com";     		// 호스트 URL
        String requestUrl= "/sms/v2/services/";                   		// 요청 URL
        String requestUrlType = "/messages";                      		// 요청 URL
//        String accessKey = "";                     	// 네이버 클라우드 플랫폼 회원에게 발급되는 개인 인증키			// Access Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
//        String secretKey = "";  // 2차 인증을 위해 서비스마다 할당되는 service secret key	// Service Key : https://www.ncloud.com/mypage/manage/info > 인증키 관리 > Access Key ID
//        String serviceId = "ncp:sms:kr::";       // 프로젝트에 할당된 SMS 서비스 ID							// service ID : https://console.ncloud.com/sens/project > Simple & ... > Project > 서비스 ID
        String method = "POST";											// 요청 method
        String timestamp = Long.toString(System.currentTimeMillis()); 	// current timestamp (epoch)
        requestUrl += serviceId + requestUrlType;
        String apiUrl = hostNameUrl + requestUrl;
        System.out.println(apiUrl);

        // JSON 을 활용한 body data 생성
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray  toArr = new JSONArray();

        //toJson.put("subject","");							// Optional, messages.subject	개별 메시지 제목, LMS, MMS에서만 사용 가능
        //toJson.put("content","sms test in spring 111");	// Optional, messages.content	개별 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        toJson.put("to",uhp);						// Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        toArr.put(toJson);

        bodyJson.put("type","SMS");							// Madantory, 메시지 Type (SMS | LMS | MMS), (소문자 가능)
        //bodyJson.put("contentType","");					// Optional, 메시지 내용 Type (AD | COMM) * AD: 광고용, COMM: 일반용 (default: COMM) * 광고용 메시지 발송 시 불법 스팸 방지를 위한 정보통신망법 (제 50조)가 적용됩니다.
        //bodyJson.put("countryCode","82");					// Optional, 국가 전화번호, (default: 82)
        bodyJson.put("from","01085454961");					// Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //bodyJson.put("subject","");						// Optional, 기본 메시지 제목, LMS, MMS에서만 사용 가능
        bodyJson.put("content","BirdieBuddy의 문자인증 서비스 입니다.\n["+code+"]를 입력해 주세요");	// Mandatory(필수), 기본 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        bodyJson.put("messages", toArr);					// Mandatory(필수), 아래 항목들 참조 (messages.XXX), 최대 1,000개

        //String body = bodyJson.toJSONString();
        String body = bodyJson.toString();

        System.out.println(body);

        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json; charset=utf-8");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2", makeSig(uhp,timestamp));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            System.out.println("responseCode" +" " + responseCode);
            if(responseCode == 202) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else { // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            System.out.println(response.toString());

        } catch (Exception e) {
            System.out.println(e);
        }
        return "smsSend";
    }

    public String makeSig(String uhp, String ts) throws Exception {
        String space = " ";					// one space
        String newLine = "\n";					// new line
        String method = "POST";					// method
        String url = "/sms/v2/services/ncp:sms:kr:305198840444:birdiebuddy/messages";	// url (include query string)
        String timestamp = ts;			// current timestamp (epoch)
//        String accessKey = "";
//        String secretKey = "";
//        String serviceId = "ncp:sms:kr::";
        System.out.println("uhp:"+uhp);

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);
        return encodeBase64String;
    }
    @GetMapping("/codechk")
    public boolean codeChk(String uhp, String code){
        int n = loginMapper.cntHpCode(uhp, code);
        if(n==1){
            loginMapper.deleteCode(uhp);
            return true;
        } else {
            return false;
        }
    }
}




