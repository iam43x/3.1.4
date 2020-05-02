package web.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class User implements UserDetails {

    private Long id;

    private String username;

    private String password;

    boolean accountNonExpired = true;

    private boolean accountNonLocked = true;

    private boolean credentialsNonExpired = true;

    private boolean enabled = true;

    private Set<Role> authorities;

}

