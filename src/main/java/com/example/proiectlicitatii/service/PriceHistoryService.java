package com.example.proiectlicitatii.service;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.PriceHistory;
import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.repository.PriceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class PriceHistoryService {

    @Autowired
    PriceHistoryRepository priceHistoryRepository;

    @PostMapping("/bidding/{id}")
    public PriceHistory create(PriceHistory priceHistory, Auction auction, User user) {
        priceHistory.setAuctionID(auction);
        priceHistory.setBid_by(user);

        return priceHistoryRepository.save(priceHistory);
    }
}
