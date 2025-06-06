package com.soumen.transactsecure.service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

public class PasswordResetRateLimiter {
    private static final int MAX_REQUESTS = 3;
    private static final long WINDOW_MINUTES = 60;
    private static final ConcurrentHashMap<String, List<LocalDateTime>> requests = new ConcurrentHashMap<>();

    public static synchronized boolean allow(String email) {
        LocalDateTime now = LocalDateTime.now();
        requests.putIfAbsent(email, new CopyOnWriteArrayList<>());
        List<LocalDateTime> times = requests.get(email);
        times.removeIf(time -> time.plusMinutes(WINDOW_MINUTES).isBefore(now));
        if (times.size() >= MAX_REQUESTS) {
            return false;
        }
        times.add(now);
        return true;
    }
}
