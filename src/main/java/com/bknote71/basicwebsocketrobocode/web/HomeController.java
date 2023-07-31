package com.bknote71.basicwebsocketrobocode.web;

import com.bknote71.basicwebsocketrobocode.robocode.core.loader.AwsS3ClassLoader;
import com.bknote71.basicwebsocketrobocode.robocode.core.loader.CompileResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;

@Controller
public class HomeController {




    @PostMapping("/create/robot")
    @ResponseBody
    public ResponseEntity<?> createRobot(String author, String content) { // author == username
        CompileResult result = AwsS3ClassLoader.Instance.createRobot(author, content);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
