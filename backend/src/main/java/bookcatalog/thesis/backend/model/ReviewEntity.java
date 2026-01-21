package bookcatalog.thesis.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(
        name = "reviews",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "google_id"})
        }
)
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "google_id", nullable = false)
    private String googleId;

    @Setter
    @Column(nullable = false)
    private int rating;

    @Setter
    @Column(length = 2000)
    private String reviewText;

    @Setter
    @ManyToOne(optional = false)
    private UserEntity user;

}
