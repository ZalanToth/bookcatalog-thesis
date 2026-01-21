package bookcatalog.thesis.backend.controller;

import bookcatalog.thesis.backend.dto.CreateReviewRequest;
import bookcatalog.thesis.backend.dto.ReviewDto;
import bookcatalog.thesis.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ReviewDto createOrUpdate(
            @RequestBody CreateReviewRequest request,
            Authentication authentication
    ) {
        System.out.println("GOOGLE ID FROM REQUEST = " + request.getGoogleId());
        return reviewService.createOrUpdateReview(request, authentication);
    }

    @GetMapping("/{googleId}")
    public List<ReviewDto> getReviewsForBook(
            @PathVariable String googleId
    ) {
        return reviewService.getReviewsForBook(googleId);
    }
}
