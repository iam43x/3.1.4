package web.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import web.model.Role;
import web.model.User;

@Controller
public class MainController {

    @GetMapping(value = "/")
    public String session(Authentication authentication, ModelMap modelMap){
        if (authentication!= null) {
            User user=(User)authentication.getPrincipal();
            modelMap.addAttribute("user",user);
            return user.getAuthorities().contains(Role.ADMIN)?"redirect:/admin":"redirect:/user";
        } else {
            return "login";
        }
    }

    @GetMapping(value = "login")
    public String loginPage() {
        return "login";

    }

    @GetMapping(value = "/user")
    public String getUserPage(Authentication authentication, ModelMap modelMap) {
        User user=(User)authentication.getPrincipal();
        modelMap.addAttribute("user",user);
        return "userPage";
    }

    @GetMapping(value = "/admin")
    public String getAdminPage(Authentication authentication, ModelMap modelMap){
        User user=(User)authentication.getPrincipal();
        modelMap.addAttribute("user",user);
        return "admin/panel";
    }

    @GetMapping(value = "/reg")
    public String getRegPage(){
        return "reg";
    }
}
