package domain

type PreSignedUrlEvent struct {
	Bucket   string `json:"bucket"`
	Filename string `json:"filename"`
}

type PreSignedUrlResponse struct {
	Filename string `json:"filename"`
	Url      string `json:"url"`
}
