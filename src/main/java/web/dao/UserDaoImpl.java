package web.dao;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import web.model.User;

import java.util.Arrays;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic QURNSU46QURNSU4=");
        return headers;
    }

    @Override
    public User addUser(User user) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange("http://localhost:8080/rest/users", HttpMethod.POST,
                new HttpEntity<>(user, getHeaders()), User.class).getBody();
    }

    @Override
    public void deleteUser(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange("http://localhost:8080/rest/users/" + id, HttpMethod.DELETE,
                new HttpEntity<>(null, getHeaders()), User.class);
    }

    @Override
    public void updateUser(User user) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange("http://localhost:8080/rest/users/" + user.getId(), HttpMethod.PUT,
                new HttpEntity<>(user, getHeaders()), User.class);
    }

    @Override
    public List<User> getAllUsers() {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.exchange("http://localhost:8080/rest/users", HttpMethod.GET,
                new HttpEntity<String>(null, getHeaders()), User[].class).getBody();
        return Arrays.asList(users);
    }

    @Override
    public User getUserByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();
        User user = restTemplate.exchange("http://localhost:8080/rest/user", HttpMethod.POST,
                new HttpEntity<>(username, getHeaders()), User.class).getBody();
       return user;
    }


    @Override
    public User getUserById(Long id) {
        List<User> users = getAllUsers();
        for (User user : users) {
            if (user.getId().compareTo(id) == 0) {
                return user;
            }
        }
        throw new UsernameNotFoundException("User Not found");
    }
}

