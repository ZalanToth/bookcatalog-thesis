package bookcatalog.thesis.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/user")
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            // Visszaadjuk a felhasználó nevét
            return Map.of(
                    "name", principal.getAttribute("name"),
                    "email", principal.getAttribute("email")
            );
        }
        return Map.of(); // ha nincs bejelentkezve
    }
}
