package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.dto.CreateReviewRequest;
import bookcatalog.thesis.backend.dto.ReviewDto;
import bookcatalog.thesis.backend.model.ReviewEntity;
import bookcatalog.thesis.backend.model.UserEntity;
import bookcatalog.thesis.backend.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;

    @Transactional
    public ReviewDto createOrUpdateReview(
            CreateReviewRequest request,
            Authentication auth
    ) {
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        UserEntity user = userService.getCurrentUser(auth);

        ReviewEntity review = reviewRepository
                .findByUserAndGoogleId(user, request.getGoogleId())
                .orElseGet(ReviewEntity::new);

        review.setUser(user);
        review.setGoogleId(request.getGoogleId());
        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());

        ReviewEntity saved = reviewRepository.save(review);

        return toDto(saved);
    }

    public List<ReviewDto> getReviewsForBook(String googleId) {
        return reviewRepository.findByGoogleId(googleId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    private ReviewDto toDto(ReviewEntity entity) {
        ReviewDto dto = new ReviewDto();
        dto.setId(entity.getId());
        dto.setGoogleId(entity.getGoogleId());
        dto.setRating(entity.getRating());
        dto.setReviewText(entity.getReviewText());
        dto.setUserName(entity.getUser().getName());
        return dto;
    }
}
