package com.example.proiectlicitatii.model;

public enum roles {
    ADMIN,
    USER;

    int userRole;

    public int getUserRole() {
        return userRole;
    }

    public void setUserRole(int userRole) {
        this.userRole = userRole;
    }
}
