import React from "react";
import "./css/Footer.css";

export default function Footer(props) {
  return (
    <div
      className={
        props.isdarkThemeActive
          ? "Footer-wrapper Footer-wrapper-dark"
          : "Footer-wrapper"
      }
    >
      <div className="Footer">
        <div className="Footer-aboutText">
          <p className="aboutText">
            MainStreet Lab.
          </p>
        </div>
        <div className="Footer-details">
          <p className="details-phone">
            <img src="images/phone-icon.svg" alt="phone icon" /> 08066447739
          </p>
          <p className="details-email">
            <img src="images/email-icon.svg" alt="email icon" />{" "}
            info@mainstreetlab.com
          </p>
          <p className="details-location">
            <img src="images/location-icon.svg" alt="location icon" />
            Nigeria
          </p>
        </div>
        <div className="Footer-links">
          <a href="#" className="Footer-link-item">
            About us
          </a>
          <a href="#" className="Footer-link-item">
            Team
          </a>
          <a href="#" className="Footer-link-item">
            Press
          </a>
          <a href="#" className="Footer-link-item">
            Blog
          </a>
        </div>
        <div className="Footer-links">
          <a href="#" className="Footer-link-item">
            Contact us
          </a>
          <a href="#" className="Footer-link-item">
            Terms
          </a>
          <a href="#" className="Footer-link-item">
            Privacy
          </a>
        </div>
        <div className="Footer-socialLinks">
          <span
            className={
              props.isdarkThemeActive
                ? "Footer-socialLink Footer-socialLink-dark"
                : "Footer-socialLink"
            }
          >
            <i className="fab fa-facebook-f"></i>
          </span>
          <span
            className={
              props.isdarkThemeActive
                ? "Footer-socialLink Footer-socialLink-dark"
                : "Footer-socialLink"
            }
          >
            <i className="fab fa-twitter"></i>
          </span>
          <span
            className={
              props.isdarkThemeActive
                ? "Footer-socialLink Footer-socialLink-dark"
                : "Footer-socialLink"
            }
          >
            <i className="fab fa-instagram"></i>
          </span>
        </div>
      </div>
    </div>
  );
}