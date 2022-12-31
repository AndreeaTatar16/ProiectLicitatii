package com.example.proiectlicitatii.service;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    public Auction create(Auction auction, User user) {
        auction.setCreatedBy(user);

        return auctionRepository.save(auction);
    }

    public Set<Auction> findByCreatedBy(User user) {
        return auctionRepository.findByCreatedBy(user);
    }

    public Optional<Auction> findById(Long auctionId) {
        return auctionRepository.findById(auctionId);
    }

    public Auction edit(Auction auction) {
        return auctionRepository.save(auction);
    }

    public void deleteById(Long auctionId) {
        auctionRepository.deleteById(auctionId);
    }
}
