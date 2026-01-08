package bookcatalog.thesis.backend.dto;

import java.util.List;

public record UserListsResponseDto(
        List<BookListDto> lists
) {}