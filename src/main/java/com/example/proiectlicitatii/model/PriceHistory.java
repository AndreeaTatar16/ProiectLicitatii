package com.example.proiectlicitatii.model;

import javax.persistence.*;

@Entity
@Table(name = "prices_history")
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Auction auctionID;

    private float updated_price;

    @ManyToOne(optional = false)
    private User bid_by;

    public PriceHistory() {
    }

    public Auction getAuctionID() {
        return auctionID;
    }

    public void setAuctionID(Auction auctionID) {
        this.auctionID = auctionID;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getUpdated_price() {
        return updated_price;
    }

    public void setUpdated_price(float updated_price) {
        this.updated_price = updated_price;
    }

    public User getBid_by() {
        return bid_by;
    }

    public void setBid_by(User bid_by) {
        this.bid_by = bid_by;
    }
}
