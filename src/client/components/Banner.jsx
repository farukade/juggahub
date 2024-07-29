import React from "react";
// import bannerImage from "../../../public/assets/images/banner-item-01.jpg";

const Banner = ({
  media,
  category,
  id,
  title,
  createdBy,
  createdAt,
  comments,
}) => {
  return (
    <div key={id} className="main-banner header-text">
      <div className="container-fluid">
        <div id="owl-banner" className="owl-banner owl-carousel">
          <div className="item">
            <img src={media} alt="Banner" />
            <div className="item-content">
              <div className="main-content">
                <div className="meta-category">
                  <span>{category?.name}</span>
                </div>
                <a href="#">
                  <h4>{title}</h4>
                </a>
                <ul className="post-info">
                  <li>
                    <a href="#">{createdBy}</a>
                  </li>
                  <li>
                    <a href="#">{createdAt}</a>
                  </li>
                  <li>
                    <a href="#">
                      {comments?.length > 1
                        ? comments?.length + " Comments"
                        : comments?.length + " Comment"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
