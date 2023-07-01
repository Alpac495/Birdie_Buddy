package naver.cloud;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
public class NcpObjectStorageService implements ObjectStoragesService {

	AmazonS3 s3;
	
	public NcpObjectStorageService(NaverConfig naverConfig) {
		System.out.println("NcpObjectStorageService 생성");
		s3 = AmazonS3ClientBuilder.standard()
				.withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
						naverConfig.getEndPoint(), naverConfig.getRegionName()))
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(
						naverConfig.getAccessKey(), naverConfig.getSecretKey())))
				.build();
	}

	@Override
	public String uploadFile(String bucketName, String directoryPath, MultipartFile file) {
		System.out.println("uploadFile="+file.getOriginalFilename());

		if (file.isEmpty()) {
			return null;
		}

		try (InputStream fileIn = file.getInputStream()) {
			String filename = UUID.randomUUID().toString();

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(file.getContentType());

			PutObjectRequest objectRequest = new PutObjectRequest(
					bucketName,
					directoryPath + "/" + filename,
					fileIn,
					objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);

			s3.putObject(objectRequest);

			//return s3.getUrl(bucketName, directoryPath + filename).toString();
			return filename;

		} catch (Exception e) {
			throw new RuntimeException("파일 업로드 오류", e);
		}
	}
	
	@Override
	public void deleteFile(String bucketName, String directoryPath,String fileName) {
		
		String path = directoryPath + "/" + fileName;
		//해당 버킷에 파일이 존재하면 true반환
		boolean isfind = s3.doesObjectExist(bucketName, path);
		//존재할 경우 삭제
		if(isfind) {
			s3.deleteObject(bucketName, path);
			System.out.println(path + "삭제완료");
		}
		
	}
}
