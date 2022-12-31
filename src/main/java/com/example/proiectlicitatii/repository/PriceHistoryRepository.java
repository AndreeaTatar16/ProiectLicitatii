package com.example.proiectlicitatii.repository;

import com.example.proiectlicitatii.model.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
}
