package bookcatalog.thesis.backend.controller;

import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.dto.BookListDto;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import bookcatalog.thesis.backend.service.BookListService;
import bookcatalog.thesis.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public List<BookListDto> getMyLists(Authentication authentication) {
        UserEntity user = userService.getCurrentUser(authentication);

        return user.getLists().stream()
                .map(BookListDto::fromEntity)
                .toList();
    }

    @PostMapping("/{type}/books")
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
    }
}

