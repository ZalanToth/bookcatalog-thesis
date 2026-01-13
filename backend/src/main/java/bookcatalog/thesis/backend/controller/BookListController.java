package bookcatalog.thesis.backend.controller;

import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.dto.BookListDto;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import bookcatalog.thesis.backend.repository.BookListRepository;
import bookcatalog.thesis.backend.repository.BookRepository;
import bookcatalog.thesis.backend.service.BookListService;
import bookcatalog.thesis.backend.service.UserService;
import org.springframework.http.ResponseEntity;
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
    /*@GetMapping
    public List<BookListDto> getMyLists(Authentication authentication) {
        UserEntity user = userService.getCurrentUser(authentication);

        return user.getLists().stream()
                .map(BookListDto::fromEntity)
                .toList();
    }*/

    @PostMapping("/{type}/books")
    public void addOrMoveBook(@PathVariable ListType type,
                              @RequestBody BookDto dto,
                              Authentication auth) {
        bookListService.addOrMoveBook(type, dto, auth);
    }
    /*@PostMapping("/{type}/books")
    public void addBookToList(
            @PathVariable ListType type,
            @RequestBody BookDto bookDto,
            Authentication authentication
    ) {

        UserEntity user = userService.getCurrentUser(authentication);
        bookListService.addBookToList(user, type, bookDto);
        System.out.println("LIST TYPE: " + type);
        System.out.println("REQUEST: " + bookDto.getTitle());
        System.out.println("AUTHORS: " + bookDto.getAuthors());
        System.out.println("PAGE COUNT: " + bookDto.getPageCount());
    }*/

    @DeleteMapping("/{type}/books/{googleId}")
    public void deleteBookFromList(
            @PathVariable ListType type,
            @PathVariable String googleId,
            Authentication authentication
    ) {
        bookListService.deleteBookFromList(type, googleId, authentication);
    }
}

