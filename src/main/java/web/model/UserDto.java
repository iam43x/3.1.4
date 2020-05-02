package web.model;

import java.util.List;

public class UserDto {

    private List<User> userList;

    UserDto(List<User> userList){
        this.userList=userList;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
