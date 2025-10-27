package bookcatalog.thesis.backend.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookDetailResponse {
    private String id;
    private VolumeInfo volumeInfo;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public VolumeInfo getVolumeInfo() { return volumeInfo; }
    public void setVolumeInfo(VolumeInfo volumeInfo) { this.volumeInfo = volumeInfo; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class VolumeInfo {
        private String title;
        private List<String> authors;
        private String description;
        private String publishedDate;
        private ImageLinks imageLinks;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public List<String> getAuthors() { return authors; }
        public void setAuthors(List<String> authors) { this.authors = authors; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getPublishedDate() { return publishedDate; }
        public void setPublishedDate(String publishedDate) { this.publishedDate = publishedDate; }

        public ImageLinks getImageLinks() { return imageLinks; }
        public void setImageLinks(ImageLinks imageLinks) { this.imageLinks = imageLinks; }
    }

    public static class ImageLinks {
        private String thumbnail;
        public String getThumbnail() { return thumbnail; }
        public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }
    }
}
