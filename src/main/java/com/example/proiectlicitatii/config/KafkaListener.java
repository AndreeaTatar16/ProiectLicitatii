package com.example.proiectlicitatii.config;

import org.springframework.stereotype.Component;

@Component
public class KafkaListener {

    @org.springframework.kafka.annotation.KafkaListener(topics = "auction", groupId = "groupID")
    void listener(String data) {
        System.out.println("Am primit " + data);
    }
}

