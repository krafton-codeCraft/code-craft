package com.bknote71.codecraft.robocode.core.loader;

public class CompileResult {
    int exitCode;
    String content;

    public CompileResult(int exitCode, String content) {
        this.exitCode = exitCode;
        this.content = content;
    }
}