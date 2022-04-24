import Head from "next/head";
import Image from "next/image";
import IgPostsUi from "../components/ig-posts";
import styles from "../styles/Home.module.css";
// import { InstagramScraper } from "../components/instagram-scraper";
// import datanum from "../public/datanum.json";
const path = require("path");
const fs = require("fs").promises;
// const axios = require("axios");

export default function Home({ instagramScraper }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>نمونه ربات اینستاگرام</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {instagramScraper &&
        instagramScraper.map((igscrap) => (
          <main key={igscrap.id} className={styles.main}>
            <h1 className={styles.title}>
              خوش آمدید{" "}
              <a href={igscrap.externalUrlShimmed}>{igscrap.username}</a>
            </h1>
            <p className={styles.description}>
              {igscrap.biography}{" "}
              <code className={styles.code}>{igscrap.fullName}</code>
            </p>
            <div className={styles.grid}>
              Followers:{" "}
              <h1 className="font-bold p-1">{igscrap.followersCount}</h1>{" "}
              Follows: <h1 className="font-bold p-1">{igscrap.followsCount}</h1>{" "}
              Posts: <h1 className="font-bold p-1">{igscrap.postsCount}</h1>{" "}
              IGTVs:{" "}
              <h1 className="font-bold p-1">{igscrap.igtvVideoCount}</h1>{" "}
              Reels: <h1 className="font-bold p-1">{igscrap.highlightReelCount}</h1>{" "}
            </div>

          
              <div className={styles.grid}>
                {igscrap.latestPosts.map((post) => (
                  <IgPostsUi
                    key={post.id}
                    caption={post.caption}
                    imageUrl={post.displayUrl}
                    profileUrl={igscrap.profilePicUrl}
                    likes={post.likesCount}
                    comments={post.commentsCount}
                    location={post.locationName}
                    views={post.videoViewCount}
                  />
                ))}
              </div>
            
          </main>
        ))}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
                     مهدی زاده مینایی
 {" "}
          <span className={styles.logo}>
          طراحی و برنامه نویسی
          </span>
        </a>
      </footer>
    </div>
  );
}
//const fs = require('fs');

export async function getStaticProps() {
  // Run API calls in parallel
  //const [items] = await Promise.all([InstagramScraper()]);
  // let users = require(path.join("datanum.json"));

  // const filePath = require("../public/datanum.json");
  // const filePath2 = require("../public/datanum2.json");
  const stateFile = "./public/datanum2.json";

  const readFile = "./public/datanum.json";

  // console.log('fifififi1: '+path.join(process.cwd(), 'public/datanum2.json'))
  const file_data = await fs.readFile(readFile);
  const json_data = JSON.parse(file_data);
  // console.log('fifififi2: '+file_data)
  const saveLastEventSequenceId = (sequenceId) => {
    try {
      fs.writeFileSync(stateFile, json_data);
      // console.log(json_data)
    } catch (err) {
      console.log(err);
    }
  };
  // fs.writeFileSync(stateFile, filePath);
  console.log("SENDING FILE DONE~!");
  //console.log(json_data);
  // const uzi =  await Promise.all([users]);
  // console.log(uzi.id)
  // const usersRepo = {
  //   getAll: () =>  uzi,
  //   getById: id =>  uzi.find(x => x.id.toString() === id.toString()),
  //   find: x =>  uzi.find(x)
  // };
  // const jsdata = JSON.stringify(users)

  return {
    props: {
      instagramScraper: json_data,
    },
    //revalidate: 1,
  };
}
