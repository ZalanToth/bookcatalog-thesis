package bookcatalog.thesis.backend.repository;

import bookcatalog.thesis.backend.model.BookListEntity;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookListRepository extends JpaRepository<BookListEntity, Long> {
    Optional<BookListEntity> findByUserAndType(UserEntity user, ListType type);
}

