package com.bknote71.codecraft.web;

import com.bknote71.codecraft.entity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/usercheck")
    @ResponseBody
    public String homepage(@AuthenticationPrincipal UserDetails userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName());
        System.out.println(authentication.getDetails());
        System.out.println(authentication.getPrincipal());
        return "this is home " + authentication.getName();
    }

    @GetMapping("/username")
    @ResponseBody
    public String getusernmae(@AuthenticationPrincipal(expression = "username") String username) {
        return "this username: " + username;
    }

    @GetMapping("/principle")
    @ResponseBody
    public String getprincipal(Principal principal) {
        // [Principal=org.springframework.security.core.userdetails.User]
        System.out.println("null? " + principal);
        return principal.getName();
    }

    @PostMapping("/signup")
    @ResponseBody
    public Long signup(String username, String password) {
        return userService.signup(username, password);
    }


}
