package com.bknote71.codecraft.robocode.loader;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CompileResult {
    public int exitCode;
    public String content;
    public String robotName;
    public String fullClassName;
    public String code;

    public CompileResult(int exitCode, String content) {
        this.exitCode = exitCode;
        this.content = content;
    }

    public CompileResult(int exitCode, String content, String robotName, String fullClassName, String code) {
        this.exitCode = exitCode;
        this.content = content;
        this.robotName = robotName;
        this.fullClassName = fullClassName;
        this.code = code;
    }
}

