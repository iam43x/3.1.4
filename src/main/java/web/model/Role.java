package web.model;

import org.springframework.security.core.GrantedAuthority;


public enum Role implements GrantedAuthority {

    ADMIN,
    USER,TESTER;

    public String getAuthority() {
        return this.name();
    }


}
