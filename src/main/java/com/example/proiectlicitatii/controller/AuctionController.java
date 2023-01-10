package com.example.proiectlicitatii.controller;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.User;
import com.example.proiectlicitatii.service.AuctionService;
import com.example.proiectlicitatii.service.PriceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auctions")
public class AuctionController {
    @Autowired
    private AuctionService auctionService;

    @Autowired
    private PriceHistoryService priceHistoryService;

    @GetMapping("")
    public ResponseEntity<?> getAuctions(@AuthenticationPrincipal User user) {
        Set<Auction> auctionsByUser = auctionService.findByCreatedBy(user);

        return ResponseEntity.ok(auctionsByUser);
    }

    @PostMapping("/addAuction")
    public ResponseEntity<?> createAuction(@RequestBody Auction auction, @AuthenticationPrincipal User user) {
        Auction newAuction = auctionService.create(auction, user);

        return ResponseEntity.ok(newAuction);
    }

    @GetMapping("{auctionId}")
    public ResponseEntity<?> getAuctions(@PathVariable Long auctionId, @AuthenticationPrincipal User user) {
        Optional<Auction> auction = auctionService.findById(auctionId);

        return ResponseEntity.ok(auction.orElse(new Auction()));
    }

    @GetMapping("editAuction/{auctionId}")
    public ResponseEntity<?> editAuctionsView(@PathVariable Long auctionId, @AuthenticationPrincipal User user) {
        Optional<Auction> auction = auctionService.findById(auctionId);

        return ResponseEntity.ok(auction.orElse(new Auction()));
    }

    @PutMapping("editAuction/{auctionId}")
    public ResponseEntity<?> editAuctions(@PathVariable Long auctionId, @RequestBody Auction auction, @AuthenticationPrincipal User user) {
        Auction updatedAuction = auctionService.edit(auction);

        return ResponseEntity.ok(updatedAuction);
    }

    @DeleteMapping("deleteAuction/{auctionId}")
    public ResponseEntity<?> deleteAuction(@PathVariable Long auctionId, @AuthenticationPrincipal User user) {
        priceHistoryService.deleteById(auctionId);
        auctionService.deleteById(auctionId);

        return ResponseEntity.ok().build();
    }

}
