package bookcatalog.thesis.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "book_lists")
public class BookListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ListType type;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @ManyToMany
    @JoinTable(
            name = "book_list_books",
            joinColumns = @JoinColumn(name = "list_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<BookEntity> books = new ArrayList<>();

    public BookListEntity(ListType type, UserEntity user) {
        this.type = type;
        this.user = user;
        this.books = new ArrayList<>();
    }

    public BookListEntity() {

    }

    public Long getId() {
        return id;
    }

    public ListType getType() {
        return type;
    }

    public void setType(ListType type) {
        this.type = type;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<BookEntity> getBooks() {
        return books;
    }
}
