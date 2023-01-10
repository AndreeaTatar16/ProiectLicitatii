package com.example.proiectlicitatii.repository;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
    Set<PriceHistory> findByAuctionID(Auction auctionId);

    void deleteByAuctionID(Auction auctionId);
}
