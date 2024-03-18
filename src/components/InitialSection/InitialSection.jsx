import "./InitialStyle.scss";

import CustomButton from "../CustomButton/CustomButton";

function scrollTo(ref) {
  if (!ref.current) return;
  ref.current.scrollIntoView({ behavior: "smooth" });
}

export default function InitialSection({ regSection }) {
  return (
    <>
      <section className="initial-section">
        <div className="initial-text-block">
          <div className="initial-section_inner">
            <div className="initial-text">
              <h1>Test assignment for front-end developer</h1>
              <p>
                What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User
                design thinking as they'll be building web interfaces with
                accessibility in mind. They should also be excited to learn, as
                the world of Front-End Development keeps evolving.
              </p>
              <CustomButton onClick={() => scrollTo(regSection)}>
                Sign Up
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
