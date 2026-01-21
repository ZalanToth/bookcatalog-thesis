package bookcatalog.thesis.backend.repository;

import bookcatalog.thesis.backend.model.ReviewEntity;
import bookcatalog.thesis.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    Optional<ReviewEntity> findByUserAndGoogleId(UserEntity user, String googleId);

    List<ReviewEntity> findByGoogleId(String googleId);
}

