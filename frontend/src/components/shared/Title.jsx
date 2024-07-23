import { Helmet } from "react-helmet-async";
import {PropTypes} from "prop-types";

import React from 'react'

const Title = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

Title.propTypes={
    title: PropTypes.string
}

export default Title