package com.bknote71.codecraft.web;

import com.theokanning.openai.completion.chat.ChatCompletionChoice;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CodeConvertService {

    private final OpenAiService openAiService;

    @Value("${gpt.model}")
    private String gpt_model;

    public String convertLangToJava(String lang, String code) {
        String systemcmd = String.format("이제부터 %s 코드를 자바 코드로 변환할거야. 이때 자바코드 이외의 설명은 필요 없어.", lang);
        return convert(systemcmd, code);
    }

    private String convert(String systemcmd, String code) {
        ChatMessage m1 = new ChatMessage("system", systemcmd);
        ChatMessage m2 = new ChatMessage("user", code);

        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
                .messages(Arrays.asList(m1, m2))
                .model(gpt_model)
                .build();

        ChatCompletionResult chatCompletionResult = openAiService.createChatCompletion(chatCompletionRequest);
        List<ChatCompletionChoice> choices = chatCompletionResult.getChoices();
        for (ChatCompletionChoice choice : choices) {
            log.info("choice: {} {}", choice, choice.getMessage());
        }

        if (choices == null || choices.isEmpty()) {
            log.error("no response");
            return null;
        }

        ChatCompletionChoice chatCompletionChoice = choices.get(0);
        ChatMessage message = chatCompletionChoice.getMessage();
        String text = message.getContent();
        log.info("message? {}", text);
        return text;
    }
}