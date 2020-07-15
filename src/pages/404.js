import React from "react"
import Layout from "../components/layout"
import "../global.css"
import Img404 from "../../static/404.svg"

export default function Page404() {
  return (
    <Layout>
      <div className="mt-20 flex flex-row justify-center">
        <img className="max-w-3xl" src={Img404} alt="404" />
      </div>
    </Layout>
  )
}
