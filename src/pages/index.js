import React from "react"
import Layout from "../components/layout"
import "../global.css"
import Rocket from "../../static/rocket.png"
import { Link } from "gatsby"

export default function Home() {
  return (
    <Layout>
      <div className="w-screen mt-5 bg_gradient_gray">
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="pt-12 text-center max-w-xl">
              <span className="text-black text-xs font-medium tracking-widest mb-3 block">Some poorly read notes on</span>
              <h2 className="text-black text-5xl leading-tight tracking-tight uppercase font-semibold">
                Enterprise <mark className="bg-red px-2 text-white">Architecture</mark>,
                  Cloud and <mark className="bg-yellow px-2 text-white">DevOps</mark>
              </h2>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Link className="text-xl tracking-tight mt-5 font-thin z-50" to="/tags">&gt; All Categories</Link>
          </div>
          <div className="flex flex-row justify-center -mt-32 overflow-hidden">
            <img className="max-w-4xl" src={Rocket} alt="Rocket" />
          </div>
        </div>
      </div>
    </Layout>
  )
}