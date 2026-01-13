package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.model.*;
import bookcatalog.thesis.backend.repository.BookListRepository;
import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.repository.BookRepository;
import bookcatalog.thesis.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<BookEntity> getBooksForList(UserEntity user, ListType type) {
        return bookRepository.findByUserAndListType(user, type);
    }

    @Transactional
    public void addOrMoveBook(ListType targetList,
                              BookDto dto,
                              Authentication auth) {

        UserEntity user = userService.getCurrentUser(auth);

        Optional<BookEntity> existing =
                bookRepository.findByUserAndGoogleId(user, dto.getGoogleId());

        if (existing.isPresent()) {
            BookEntity book = existing.get();
            book.setListType(targetList);
            return;
        }

        BookEntity book = new BookEntity();
        book.setGoogleId(dto.getGoogleId());
        book.setTitle(dto.getTitle());
        book.setAuthors(dto.getAuthors());
        book.setListType(targetList);
        book.setUser(user);
        book.setPageCount(dto.getPageCount());

        bookRepository.save(book);
    }
    /*
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
    */

    @Transactional
    public void deleteBookFromList(
            ListType type,
            String googleId,
            Authentication auth
    ) {
        UserEntity user = userService.getCurrentUser(auth);

        BookEntity book = bookRepository
                .findByUserAndGoogleId(user, googleId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getListType() != type) {
            throw new RuntimeException("Book is not in this list");
        }

        bookRepository.delete(book);
    }
    /*
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
    }*/
}


