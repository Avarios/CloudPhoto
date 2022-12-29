package getuploadurl

import (
	"time"

	"github.com/avarios/cloudphoto/domain"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func GetUploadUrlForFile(event domain.PreSignedUrlEvent) (domain.PreSignedUrlResponse, error) {
	sess := session.Must(session.NewSession())
	svc := s3.New(sess)
	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: &event.Bucket,
		Key:    &event.Filename,
	})
	urlStr, err := req.Presign(15 * time.Minute)
	if err != nil {
		return domain.PreSignedUrlResponse{}, err
	}
	return domain.PreSignedUrlResponse{Filename: event.Filename, Url: urlStr}, nil
}

func GetUploadUrlForFiles(events []domain.PreSignedUrlEvent) ([]domain.PreSignedUrlResponse, error) {
	sess := session.Must(session.NewSession())
	svc := s3.New(sess)
	var uploadUrls []domain.PreSignedUrlResponse
	for _, event := range events {
		req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
			Bucket: &event.Bucket,
			Key:    &event.Filename,
		})

		urlStr, err := req.Presign(15 * time.Minute)
		if err != nil {
			return nil, err
		}
		uploadUrls = append(uploadUrls, domain.PreSignedUrlResponse{Filename: event.Filename, Url: urlStr})
	}

	return uploadUrls, nil
}
