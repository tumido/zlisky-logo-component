import React, { Component } from 'react';
import logo from '../static/zliska.svg';
import Morse from '../static/morse.json';
import { select } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import {SVGConverter} from 'svg-dataurl';

class Logo extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const data = this.stringToMorse("Zlisky");

    this.pushCircleToSvg('#group-name', 600, data);
  }

  componentDidUpdate() {
    const data = this.stringToMorse(this.props.nickname);

    this.pushCircleToSvg('#member-name', 550, data);

    if (this.props.exportTo) this.exportImage();
  }

  stringToMorse(text) {
    var morsecode = [];
    var nickname_data = [];

    for (var i = 0; i < text.length; i++) {
      let letter = text.charAt(i).toLowerCase();
      morsecode = morsecode.concat(Morse[letter].split(''));
    }

    for (var i = 0; i < morsecode.length; i++) {
      nickname_data.push(morsecode[i] == "-" ? 2 : 1);
    }

    return nickname_data;
  }

  pushCircleToSvg(id_selector, diameter, data) {
    const segment = arc()
      .innerRadius(diameter - 30)
      .outerRadius(diameter)
      .cornerRadius(15)
      .padAngle(0.05);

    const circle = pie().sort(null)(data);

    select(id_selector).selectAll('path').remove();
    select(id_selector)
      .selectAll('path')
      .data(circle)
      .enter()
      .append('path')
      .attr('d', segment)
      .attr('fill', '#000')
      .attr('transform', 'translate(600, 600)');
  }

  exportImage() {
    const {exportTo, nickname} = this.props;

    if (exportTo != "svg" && exportTo != "png") return;

    SVGConverter.loadFromElement(select('svg').node()).then((converter) => {
      const dataUrl = (exportTo == "svg") ? converter.svgDataURL() : converter.pngDataURL();
      const filename = "zlisky_" + ((this.props.nickname != "") ? this.props.nickname : "logo");

      var a = document.createElement("a");
      a.download = filename;
      a.href = dataUrl;
      a.click();
    })
  }


  render() {
    return (
      <object className='svg-container' dangerouslySetInnerHTML={{__html: logo}} />
    );
  }
}

export default Logo;
