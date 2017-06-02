import React from 'react';
import PropTypes from 'prop-types';
import Slide1 from './slides/slide1';
import Slide2 from './slides/slide2';
import Slide3 from './slides/slide3';
import Slide4 from './slides/slide4';

function activeSlide(index) {
  switch (index) {
    case 0:
      return <Slide1 />;
    case 1:
      return <Slide2 />;
    case 2:
      return <Slide3 />;
    case 3:
      return <Slide4 />;
    default:
      return <div> No Slide Found </div>;
  }
}

const TutorialContent = ({ slide }) => (
  <div className="tutorial__slide">
    { activeSlide(slide) }
  </div>
);

TutorialContent.propTypes = {
  slide: PropTypes.number,
};

export default TutorialContent;
