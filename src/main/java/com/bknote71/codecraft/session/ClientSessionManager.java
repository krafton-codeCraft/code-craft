package com.bknote71.codecraft.session;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

public class ClientSessionManager {

    // 세션을 관리하는 세션 메니저
    Map<String, ClientSession> sessions = new HashMap<>();
    Object lock = new Object();

    Map<String, ClientSession> usernameToSessions = new HashMap<>();
    Object usernameLock = new Object();

    public static ClientSessionManager Instance = new ClientSessionManager();

    public ClientSession generate(WebSocketSession session) {
        synchronized (lock) {
            String sessionId = session.getId();
            ClientSession clientSession = new ClientSession(sessionId, session);
            sessions.put(sessionId, clientSession);
            return clientSession;
        }
    }

    public ClientSession find(String id) {
        synchronized (lock) {
            if (!sessions.containsKey(id))
                return null;
            return sessions.get(id);
        }
    }

    public void remove(ClientSession session) {
        synchronized (lock) {
            sessions.remove(session.getSessionId());
        }
        synchronized (usernameLock) {
            usernameToSessions.remove(session.getUsername());
        }
    }

    public void registerUsername(String username, ClientSession session) {
        synchronized (usernameLock) {
            usernameToSessions.put(username, session);
        }
    }

    public ClientSession findByUsername(String username) {
        synchronized (usernameLock) {
            return usernameToSessions.get(username);
        }
    }
}

