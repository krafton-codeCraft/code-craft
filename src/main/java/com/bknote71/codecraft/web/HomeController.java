package com.bknote71.codecraft.web;

import com.bknote71.codecraft.robocode.core.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.robocode.core.loader.CompileResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {




    @PostMapping("/create/robot")
    @ResponseBody
    public ResponseEntity<?> createRobot(String author, String content) { // author == username
        CompileResult result = AwsS3ClassLoader.Instance.createRobot(author, content);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
