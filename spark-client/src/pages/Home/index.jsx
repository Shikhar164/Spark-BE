import { Icon } from "@iconify/react";
import Logo from "../../components/Logo";
import "./index.css";
import { useNavigate } from "react-router-dom";

const socials = [
    "mdi:twitter",
    "mdi:facebook",
    "ri:instagram-fill",
    "mdi:youtube"
]

const Apps = [
    {
        id: 1,
        name: "Audiomack",
        description: "Add an Audiomack player to your Linktree",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Faudiomack.png?alt=media&token=e351b90f-2979-465f-ad6c-9d2bbaf4c4bb"
    },
    {
        id: 2,
        name: "Bandsintown",
        description: "Drive ticket sales by listing your events",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fbandsintown.png?alt=media&token=863b147a-059d-4521-8997-4fbffb5aad62"
    },
    {
        id: 3,
        name: "Bonfire",
        description: "Display and sell your custom merch",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fbonfire.png?alt=media&token=bfdf54fc-89a5-4fb8-afbb-6eb5602ca32d"
    },
    {
        id: 4,
        name: "Books",
        description: "Promote books on your Linktree",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fbooks.png?alt=media&token=cedd58d1-1448-45a4-9fa2-29188386bb7a"
    },
    {
        id: 5,
        name: "Buy Me A Gift",
        description: "Let visitors support you with a small gift",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fbuymegift.png?alt=media&token=3c8c8f73-7e73-4e1a-b9f5-a0de09f8a9a4"
    },
    {
        id: 6,
        name: "Cameo",
        description: "Make impossible fan connections possible",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fcameo.png?alt=media&token=e9614e17-19a8-4dba-986b-7cfb483273ca"
    },
    {
        id: 7,
        name: "Clubhouse",
        description: "Let your community in on the conversation",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fclubhouse.png?alt=media&token=fd472cfe-5d6e-401b-b614-a9dda2224612"
    },
    {
        id: 8,
        name: "Community",
        description: "Build an SMS subscriber list",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fcommunity.png?alt=media&token=032ec945-4518-4560-a159-41d39827d415"
    },
    {
        id: 9,
        name: "Contact Details",
        description: "Easily share downloadable contact details",
        url: "https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/apps%2Fcontact.png?alt=media&token=31370f4e-d63e-44da-9828-cb8d747f2b4e"
    }
]

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="header">
        <Logo
          imageUrl="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FLogo.png?alt=media&token=4ae9796e-a1b4-4516-9e5a-d2e9354efc08"
          label="SPARK"
          subLabel="Marketplace"
        />
        <div className="header-actions">
          <button className="btn-outline admin" onClick={() => navigate("/login")}>Log in</button>
          <button className="btn-primary" onClick={() => navigate("/signup")}>Sign up free</button>
          <Icon
            className="hamburger"
            icon="material-symbols:menu-rounded"
            width={24}
            height={24}
          />
        </div>
      </div>

      <main>
        <section className="container">
          <div className="connection-container">
            <h1>The easiest place to update and share your Connection</h1>
            <p>
              Help your followers discover everything you’re sharing all over
              the internet, in one simple place. They’ll thank you for it!
            </p>
            <button className="btn-primary">Get your free Spark</button>
          </div>
          <div className="connection-image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Fdashboard-big.png?alt=media&token=f06cbae6-490f-4daf-b001-0a530b934469"
              height={"100%"}
              width={"100%"}
            />
          </div>
        </section>
        <section className="container">
          <div className="best-product-container">
            <h2>The best in the class product for you today!</h2>
            <p>
              This is a placeholder for your testimonials and what your client
              has to say, put them here and make sure its 100% true and
              meaningful.
            </p>
          </div>
        </section>
        <section className="container">
          <div className="box">
            <div className="revenue-image">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FRevenue.png?alt=media&token=3989a544-a91f-4bae-b0f4-1dc0913c6135"
                height={"100%"}
                width={"100%"}
              />
            </div>
          </div>
          <div className="revenue-container">
            <h2>Analyze your audience and keep your followers engaged</h2>
            <p>
              Track your engagement over time, monitor revenue and learn what’s
              converting your audience. Make informed updates on the fly to keep
              them coming back.
            </p>
          </div>
        </section>
        <section className="container">
          <div className="content-container">
            <h2>Share limitless content in limitless ways</h2>
            <p>
              Connect your content in all its forms and help followers find more
              of what they’re looking for. Your TikToks, Tweets, YouTube videos,
              music, articles, recipes, podcasts and more… It all comes together
              in one powerful place
            </p>
          </div>
          <div className="content-image">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2FContent.png?alt=media&token=d13b84dc-02b6-4195-bdbc-886929163177"
              height={"100%"}
              width={"100%"}
            />
          </div>
        </section>
        <section className="customer-section">
          <div className="customer-section-title">
            <div className="customer-title">
              Here&apos;s what our <span className="green">customer</span> has
              to says
            </div>
          </div>
          <button className="btn-outline">Read customer stories</button>
        </section>
        <section className="customer-reviews">
          {Array(4)
            .fill({
              id: 1,
              title: "Amazing tool! Saved me months",
              reviewComment:
                "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
              userImage: "",
              username: "John Master",
              designation: "Director, Spark.com",
            })
            .map((review, index) => {
              return (
                <div
                  className={`review-card ${
                    index % 2 === 0 ? "bg-white" : "bg-grey"
                  }`}
                  key={index}>
                  <div className="review-card-body">
                    <h3>{review.title}</h3>
                    <p>{review.reviewComment}</p>
                    <div className="review-card-footer">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/spark-78288.firebasestorage.app/o/static%2Favatar.png?alt=media&token=a80623ab-7760-442a-bfb1-d5a6773359bc"
                        height={48}
                        width={48}
                      />
                      <div className="review-card-footer-content">
                        <div className="review-card-footer-content-name">
                          {review.username}
                        </div>
                        <div className="review-card-footer-content-designation">
                          <b>{review.designation}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
        <section className="link-apps-section">
          <div className="link-apps-section-title">
            <h2>All Link Apps and Integrations</h2>
          </div>
          <div className="link-apps-section-content">
            {
                Apps?.map((app, index) => {
                  return (
                    <div className="link-app-card" key={index}>
                      <div className="link-app-card-image">
                        <img src={app.url} alt={app.name} />
                      </div>
                      <div className="link-app-card-content">
                        <h3>{app.name}</h3>
                        <p>{app.description}</p>
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </section>
      </main>

      <section className="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <button className="btn-outline btn-grey" onClick={() => navigate("/login")}>Login</button>
                <button className="btn-primary" onClick={() => navigate("/signup")}>Sign up free</button>
            </div>
            <div className="footer-content-right">
                {["About Spark", "Blog", "Press",
                    "Social Good",
                    "Contact",
                    "Careers",
                    "Getting Started",
                    "Features and How-Tos",
                    "FAQs",
                    "Report a violation",
                    "Terms and Conditions",
                    "Privacy Policy",
                    "Cookie Notice",
                    "Trust Center"
                ]?.map((item, index) => {
                    return (
                        <label className="footer-content-right-item" key={index}>
                            <b>{item}</b>
                        </label>
                    )
                })}
            </div>
        </div>
        <div className="footer-links">
            <div className="footer-links-content">
                <h5>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.</h5>
            </div>
            <div className="footer-links-socials">
                {socials?.map((social, index) => {
                    return (
                        <div className="footer-links-social" key={index}>
                            <Icon icon={social} height={32} width={32} color="#000000" />
                        </div>
                    )
                })}
            </div>
        </div>
      </section>
    </div>
  );
}
