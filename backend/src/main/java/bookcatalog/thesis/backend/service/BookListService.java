package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.dto.BookListStatusDto;
import bookcatalog.thesis.backend.model.*;
import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookListService {

    private final BookRepository bookRepository;
    private final UserService userService;

    public BookListService(
            BookRepository bookRepository,
            UserService userService) {
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
        book.setAverageRating(dto.getAverageRating());
        book.setRatingsCount(dto.getRatingsCount());

        bookRepository.save(book);
    }

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

    public BookListStatusDto getListStatus(String googleId, Authentication auth ) {
        UserEntity user = userService.getCurrentUser(auth);

        return bookRepository
                .findByUserAndGoogleId(user, googleId)
                .map(list -> new BookListStatusDto(list.getListType()))
                .orElse(new BookListStatusDto(null));
    }
}


