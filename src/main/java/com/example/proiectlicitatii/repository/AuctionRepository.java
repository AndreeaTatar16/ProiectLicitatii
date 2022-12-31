package com.example.proiectlicitatii.repository;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Set<Auction> findByCreatedBy(User createdBy);
}
