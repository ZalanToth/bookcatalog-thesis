package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.model.*;
import bookcatalog.thesis.backend.repository.BookListRepository;
import bookcatalog.thesis.backend.dto.BookDto;
import bookcatalog.thesis.backend.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class BookListService {

    private final BookListRepository bookListRepository;
    private final BookRepository bookRepository;

    public BookListService(
            BookListRepository bookListRepository,
            BookRepository bookRepository
    ) {
        this.bookListRepository = bookListRepository;
        this.bookRepository = bookRepository;
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
                    return bookRepository.save(newBook);
                });

        boolean alreadyInList = list.getBooks().stream()
                .anyMatch(b -> b.getGoogleId().equals(book.getGoogleId()));

        if (!alreadyInList) {
            list.getBooks().add(book);
        }

        bookListRepository.save(list);
    }
}


