package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.model.*;
import bookcatalog.thesis.backend.repository.BookListRepository;
import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.repository.BookRepository;
import bookcatalog.thesis.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BookListService {

    private final BookListRepository bookListRepository;
    private final BookRepository bookRepository;
    private final UserService userService;

    public BookListService(
            BookListRepository bookListRepository,
            BookRepository bookRepository,
            UserService userService
    ) {
        this.bookListRepository = bookListRepository;
        this.bookRepository = bookRepository;
        this.userService = userService;
    }

    public void addBookToList(
            UserEntity user,
            ListType type,
            BookDto request
    ) {
        BookListEntity list = bookListRepository
                .findByUserAndType(user, type)
                .orElseThrow(() ->
                        new IllegalStateException("List not found for user: " + type)
                );

        BookEntity book = bookRepository
                .findByGoogleId(request.getGoogleId())
                .orElseGet(() -> {
                    BookEntity newBook = new BookEntity();
                    newBook.setGoogleId(request.getGoogleId());
                    newBook.setTitle(request.getTitle());
                    newBook.setAuthors(request.getAuthors());
                    newBook.setPageCount(request.getPageCount());
                    return bookRepository.save(newBook);
                });

        boolean alreadyInList = list.getBooks().stream()
                .anyMatch(b -> b.getGoogleId().equals(book.getGoogleId()));

        if (!alreadyInList) {
            list.getBooks().add(book);
        }

        bookListRepository.save(list);
    }

    @Transactional
    public void removeBookFromList(ListType type, String googleId, Authentication authentication) {
        UserEntity user = userService.getCurrentUser(authentication);

        BookListEntity list = bookListRepository
                .findByUserAndType(user, type)
                .orElseThrow(() -> new RuntimeException("List not found"));

        BookEntity book = bookRepository
                .findByGoogleId(googleId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        list.getBooks().remove(book);
        bookRepository.delete(book);
    }
}


