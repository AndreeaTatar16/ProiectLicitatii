package com.example.proiectlicitatii.controller;

import com.example.proiectlicitatii.model.Auction;
import com.example.proiectlicitatii.model.AuctionDTO;
import com.example.proiectlicitatii.model.PriceHistory;
import com.example.proiectlicitatii.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class WebSocketController {

    private static final Logger log = Logger.getLogger(WebSocketController.class.getCanonicalName());
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    AuctionService auctionService;

    public WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    //trimite la server cu POST cererea pentru resursa
    //foloseste template-ul ca sa trimita mesajul la "/topic/auctions"
    @PostMapping("send_update")
    public ResponseEntity<Auction> sendUpdate(@RequestBody Auction auction) {
        Auction auctionWithLastPrice = auctionService.edit(auction);
        template.convertAndSend("/auctions_update/" + auction.getId(), auctionWithLastPrice);

        return ResponseEntity.ok(auction);
    }

    //este apelata metoda cand un mesaj este trimit de la client la /app/sendMessage
    @MessageMapping("/sendMessage")
    public ResponseEntity<String> receiveMessage(@Payload @RequestBody String data) {
        System.out.println("Receive message:" + data);
        return new ResponseEntity<>("Product Updated" + data, HttpStatus.OK);
        // receive message from client
    }

    //este trimis mesajul la clientii care sunt abonati la canalul /topic/auctions
//    @SendTo("/topic/auctions/{auctionId}")
//    public PriceHistory broadcastMessage(@Payload PriceHistory priceHistory) {
//        return priceHistory;
//    }
}
