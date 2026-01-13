package bookcatalog.thesis.backend.repository;

import bookcatalog.thesis.backend.model.BookEntity;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<BookEntity, Long> {
    Optional<BookEntity> findByGoogleId(String googleId);
    Optional<BookEntity> findByUserAndGoogleId(UserEntity user, String googleId);
    List<BookEntity> findByUserAndListType(UserEntity user, ListType type);
}