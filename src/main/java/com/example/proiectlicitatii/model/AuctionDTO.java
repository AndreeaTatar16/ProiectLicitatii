package com.example.proiectlicitatii.model;

import java.io.Serializable;

public class AuctionDTO implements Serializable {
    private Long id;
    private String auctionTitle;
    private float price;

    public AuctionDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuctionTitle() {
        return auctionTitle;
    }

    public void setAuctionTitle(String auctionTitle) {
        this.auctionTitle = auctionTitle;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
