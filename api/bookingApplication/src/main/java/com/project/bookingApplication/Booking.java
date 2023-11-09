package com.project.bookingApplication;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;



@Data
@Entity
public class Booking {
    @Id @GeneratedValue
    private Long id;

    private String hotelName;
    private Long hotelId;
    private int bedroomNum;

    private Long flightId;
    private String flightCode;

    public Booking(){

    }
    public Booking(String hotelName, Long hotelId, int bedroomNum, Long flightId, String flightCode){
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.bedroomNum = bedroomNum;
        this.flightId = flightId;
        this.flightCode = flightCode;
    }
}