import React, {useContext} from "react";
import "./css/Hero.css";
import Picture from "../Picture/Picture";
import Article from "../Article/Article";
import Form from "../Form/Form";
import { ConnectContext } from "../../context/ConnectContext";





export default function Hero(props) {
  const { currentAccount, connectWallet } = useContext(ConnectContext);


  return (
    <div
      className={
        props.isdarkThemeActive
          ? "Hero-wrapper Hero-wrapper-dark"
          : "Hero-wrapper"
      }
    >
      <article className="Hero">
        <Picture
          isdarkThemeActive={props.isdarkThemeActive}
          imgName="files-store-illustration.svg"
        />
        <div>
          <Article
            section="hero"
            headingType="heading"
            isdarkThemeActive={props.isdarkThemeActive}
            heading="NestDrive, Your Decentralized Online Library"
            paragraph={[
              "Store your public and private books, audiobooks, articles on the blockchain. Access them wherever you need, share and collaborate with friends, family and co-workers. Note that files with inappropriate content will be flagged.",
            ]}
          />
          {!currentAccount ? <button className="button" onClick={connectWallet}>Connect Wallet</button> : ""}
        </div>
      </article>
    </div>
  );
}