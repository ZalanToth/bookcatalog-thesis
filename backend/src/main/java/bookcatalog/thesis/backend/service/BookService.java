package bookcatalog.thesis.backend.service;
import bookcatalog.thesis.backend.dto.BookResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import bookcatalog.thesis.backend.dto.BookDetailResponse;

@Service
public class BookService {
    @Value("${google.books.api.url}")
    private String baseUrl;

    @Value("${google.books.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public BookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public BookResponse searchBooks(String query) {
        String url = String.format("%s?q=%s&maxResults=10&key=%s", baseUrl, query,apiKey);
        return restTemplate.getForObject(url, BookResponse.class);
    }

    public BookDetailResponse getBookById(String id) {
        String url = String.format("%s/%s?key=%s", baseUrl, id,apiKey);
        return restTemplate.getForObject(url, BookDetailResponse.class);
    }
}
