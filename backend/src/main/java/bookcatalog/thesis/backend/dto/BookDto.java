package bookcatalog.thesis.backend.dto;

import bookcatalog.thesis.backend.model.BookEntity;

import java.util.List;

public class BookDto{
        String googleId;
        String title;
        List<String> authors;

    public static BookDto fromEntity(BookEntity entity) {
        BookDto dto = new BookDto();
        dto.googleId = entity.getGoogleId();
        dto.title = entity.getTitle();
        dto.authors = entity.getAuthors();
        return dto;
    }

    public String getGoogleId() {
        return googleId;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getAuthors() {
        return authors;
    }
}