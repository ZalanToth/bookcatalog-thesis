package bookcatalog.thesis.backend.service;

import bookcatalog.thesis.backend.model.BookListEntity;
import bookcatalog.thesis.backend.model.ListType;
import bookcatalog.thesis.backend.model.UserEntity;
import bookcatalog.thesis.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getCurrentUser(Authentication authentication) {
        if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
            throw new IllegalStateException("User is not authenticated with OAuth2");
        }

        OAuth2User oauthUser = oauthToken.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null) {
            throw new IllegalStateException("Email not provided by OAuth provider");
        }

        return userRepository.findByEmail(email)
                .orElseGet(() -> createUserWithDefaultLists(email, name));
    }

    private UserEntity createUserWithDefaultLists(String email, String name) {

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setName(name);

        BookListEntity toRead = new BookListEntity(ListType.TO_READ, user);
        BookListEntity readingNow = new BookListEntity(ListType.READING_NOW, user);
        BookListEntity read = new BookListEntity(ListType.READ, user);

        //user.getLists().addAll(List.of(toRead, readingNow, read));

        return userRepository.save(user);
    }
}
