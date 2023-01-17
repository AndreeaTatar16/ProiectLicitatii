package com.example.proiectlicitatii.model;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auctions")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //face ca id-ul sa fie autoincrement (mysql server face asta)
    private long id;
    private String auctionTitle;
    private String auctionDescription;
    private String auctionImage;
    private float initialPrice;
    private float lastPrice;
    private float finalPrice;
    private LocalDateTime created_at;
    //mai multe licitatii pot avea acelasi user
    @ManyToOne(optional = false)  //optional = false pt ca nu poate exista o licitatie fara un user
    private User createdBy;

    public Auction() {
    }

    public float getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(float lastPrice) {
        this.lastPrice = lastPrice;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAuctionTitle() {
        return auctionTitle;
    }

    public void setAuctionTitle(String auctionTitle) {
        this.auctionTitle = auctionTitle;
    }

    public String getAuctionDescription() {
        return auctionDescription;
    }

    public void setAuctionDescription(String auctionDescription) {
        this.auctionDescription = auctionDescription;
    }

    public String getAuctionImage() {
        return auctionImage;
    }

    public void setAuctionImage(String auctionImage) {
        this.auctionImage = auctionImage;
    }

    public float getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(float initialPrice) {
        this.initialPrice = initialPrice;
    }

    public float getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(float finalPrice) {
        this.finalPrice = finalPrice;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User created_by) {
        this.createdBy = created_by;
    }
}
