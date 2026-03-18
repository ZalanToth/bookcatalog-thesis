package bookcatalog.thesis.backend.dto;
import bookcatalog.thesis.backend.model.ListType;

import java.util.List;

public class BookListDto {

    private ListType type;
    private List<BookDto> books;

    public ListType getType() {
        return type;
    }

    public List<BookDto> getBooks() {
        return books;
    }

    public void setType(ListType type) {
        this.type = type;
    }

    public void setBooks(List<BookDto> books) {
        this.books = books;
    }
}