package bookcatalog.thesis.backend.controller;

import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.dto.BookListDto;
import bookcatalog.thesis.backend.dto.BookListStatusDto;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import bookcatalog.thesis.backend.service.BookListService;
import bookcatalog.thesis.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class BookListController {

    private final BookListService bookListService;
    private final UserService userService;

    public BookListController(BookListService bookListService,
                              UserService userService) {
        this.bookListService = bookListService;
        this.userService = userService;
    }

    @GetMapping
    public List<BookListDto> getLists(Authentication auth) {
        UserEntity user = userService.getCurrentUser(auth);

        return Arrays.stream(ListType.values())
                .map(type -> {
                    BookListDto dto = new BookListDto();
                    dto.setType(type);
                    dto.setBooks(
                            bookListService.getBooksForList(user, type)
                                    .stream()
                                    .map(BookDto::fromEntity)
                                    .toList()
                    );
                    return dto;
                })
                .toList();
    }

    @PostMapping("/{type}/books")
    public void addOrMoveBook(@PathVariable ListType type,
                              @RequestBody BookDto dto,
                              Authentication auth) {
        bookListService.addOrMoveBook(type, dto, auth);
    }

    @DeleteMapping("/{type}/books/{googleId}")
    public void deleteBookFromList(
            @PathVariable ListType type,
            @PathVariable String googleId,
            Authentication authentication
    ) {
        bookListService.deleteBookFromList(type, googleId, authentication);
    }

    @GetMapping("/{googleId}/list-status")
    public BookListStatusDto getListStatus(@PathVariable String googleId, Authentication auth) {
        return bookListService.getListStatus(googleId,auth);
    }
}

