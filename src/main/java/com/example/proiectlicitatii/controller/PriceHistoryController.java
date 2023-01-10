package com.example.proiectlicitatii.controller;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.PriceHistory;
import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.service.PriceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/bidding")
public class PriceHistoryController {
    @Autowired
    PriceHistoryService priceHistoryService;

    @PostMapping("/{auctionId}")
    public ResponseEntity<?> createPriceHistory(@RequestBody PriceHistory priceHistory, @PathVariable Auction auctionId, @AuthenticationPrincipal User user) {
        PriceHistory newPriceHistory = priceHistoryService.create(priceHistory, auctionId, user);

        return ResponseEntity.ok(newPriceHistory);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getPriceHistories(@PathVariable Auction auctionId, @AuthenticationPrincipal User user) {
        Set<PriceHistory> priceHistoryByAuction = priceHistoryService.findByAuctionID(auctionId);

        return ResponseEntity.ok(priceHistoryByAuction);
    }

}
