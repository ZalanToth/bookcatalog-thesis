package bookcatalog.thesis.backend.controller;
import bookcatalog.thesis.backend.dto.BookDetailResponse;
import bookcatalog.thesis.backend.dto.BookResponse;
import bookcatalog.thesis.backend.service.BookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books/search")
    public BookResponse search(@RequestParam String query) {
        return bookService.searchBooks(query);
    }

    @GetMapping("/{id}")
    public BookDetailResponse getBookById(@PathVariable String id) {
        return bookService.getBookById(id);
    }
}
