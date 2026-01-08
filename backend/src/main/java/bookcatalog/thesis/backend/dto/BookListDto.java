package bookcatalog.thesis.backend.dto;
import bookcatalog.thesis.backend.model.BookListEntity;
import bookcatalog.thesis.backend.model.ListType;

import java.util.List;
import java.util.Map;

public class BookListDto {

    private ListType type;
    private List<BookDto> books;

    public static BookListDto fromEntity(BookListEntity entity) {
        BookListDto dto = new BookListDto();
        dto.type = entity.getType();
        dto.books = entity.getBooks().stream()
                .map(BookDto::fromEntity)
                .toList();
        return dto;
    }

    public ListType getType() {
        return type;
    }

    public List<BookDto> getBooks() {
        return books;
    }
}