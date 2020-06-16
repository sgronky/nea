import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Search from "./search"

const Header = () =>
  (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}

      render={data => (
        <nav class="px-6 py-2 bg-white shadow-md flex">
          <div class="flex w-1/4 bg-white justify-between items-center">
            <Link to="/" class="bg-white visited:bg-white hover:bg-white active:bg-white">
              <svg x="0px" y="0px" width="150px" viewBox="0 0 278.166 60"> <g> <path fill="#C5281C" d="M83.256,54.82l2.15-0.813l0.032-0.01c3.052-1.266,3.486-2.055,3.342-4.084v-8.205 c2.322,5.898,4.518,10.044,9.02,10.043c0.613,0,1.266-0.076,1.97-0.236l1.757-0.396l-1.209-1.334 c-0.771-0.85-1.145-1.51-1.577-2.273c-0.177-0.313-0.361-0.638-0.581-0.996c-1.055-1.709-3.561-2.289-5.59-1.379 c-0.921-1.828-1.847-4.213-2.962-7.154l-0.244-0.561c-0.192-0.438-0.385-0.881-0.583-1.324v-0.072H88.75 c-0.692-1.555-1.429-3.113-2.312-4.574c-0.8-1.327-1.616-2.471-2.49-3.499c-2.348-2.758-5.456-4.472-9.238-5.098 c-2.614-0.431-4.465-0.522-6.81-0.637c-0.485-0.022-0.993-0.049-1.536-0.078c-1.06-0.058-3.252-0.237-5.371-0.413 c-1.431-0.116-2.896-0.235-4.048-0.322c0.077-0.324,0.123-0.66,0.123-1.009c0-0.469-0.042-0.885-0.125-1.257h15.043 c3.878,0,6.685-1.715,8.355-5.09c3.856-0.035,6.642-1.784,8.289-5.195h0.538c4.014,0,6.884-1.832,8.529-5.445l0.68-1.486H47.404 c-3.348,0-6.2,2.186-7.266,5.564l-0.033,0.118c-0.867-2.416-2.454-4.467-4.486-5.676c-2.827-1.682-6.043-2.246-8.603-1.51 c-0.847,0.246-1.691,0.627-2.375,1.079c-0.587,0.388-1.412,1.01-2.011,1.776c-0.651,0.835-1.281,1.847-1.743,2.792 c-0.292,0.242-0.52,0.489-0.678,0.729l-0.611,1.145l-0.032,0.064c-0.73,1.649-1.619,2.792-2.309,3.599 c-0.688,0.802-0.723,1.561-0.63,2.059c0.101,0.543,0.393,0.987,0.704,1.322l-0.017,0.032c-0.203,0.35-0.31,0.751-0.31,1.158 c0,1.345,1.17,2.362,2.609,2.362c1.047,0,1.901-0.488,2.807-1.088c0.368-0.243,1.341-0.889,1.661-0.924 c0.402,0,0.77,0.366,0.77,0.768c0,1.102-1.422,1.696-2.439,1.77l-2.069,0.222c-1.49,0.139-2.199,0.929-2.199,1.635 c0,0.709,0.342,1.108,0.579,1.345l0.154,0.158l0.525,0.467l-2.195,3.536c-1.565-1.45-3.397-2.327-5.021-2.378 c-1.051-0.035-1.958,0.282-2.625,0.913c-0.194,0.184-0.364,0.393-0.507,0.623H9.012c-1.736,0-3.13,0.928-3.814,1.972 c-0.744,1.14-0.476,3.113,0.467,4.621l-5.542,1.438v26.49h101.635V54.82H83.256z M96.365,47.618 c0.201,0.327,0.374,0.632,0.543,0.927c0.204,0.365,0.406,0.717,0.643,1.087c-1.596-0.101-2.804-0.983-3.923-2.655 C94.659,46.617,95.906,46.872,96.365,47.618 M74.367,24.93c3.276,0.54,5.96,2.016,7.976,4.382c0.431,0.508,0.848,1.047,1.256,1.631 c-5.512-0.724-7.432-1.526-10.515-6.206C73.495,24.792,73.918,24.855,74.367,24.93 M71.987,17.037H61.642 c0.886-0.779,1.628-1.777,2.228-2.983h14.057C76.606,16.078,74.689,17.037,71.987,17.037 M80.222,11.951H69.877 c0.914-0.802,1.676-1.838,2.284-3.097h14.074C84.913,10.958,82.975,11.951,80.222,11.951 M80.924,4.026h14.015 c-1.314,1.851-3.183,2.726-5.77,2.726H78.823C79.647,6.027,80.35,5.118,80.924,4.026 M24.291,4.566 c0.33-0.422,0.867-0.891,1.511-1.315c0.503-0.333,1.159-0.628,1.798-0.813c1.016-0.292,2.184-0.311,3.391-0.08L27.275,4.65 c-0.464-0.047-0.917-0.072-1.355-0.072c-0.632,0-1.211,0.051-1.742,0.137C24.216,4.666,24.253,4.614,24.291,4.566 M19.949,20.979 c0.031-0.146,0.149-0.261,0.273-0.258l1.811,0.058c2.208-0.077,4.457-0.986,4.71-3.285c0-1.558-1.105-3.072-2.665-3.072 c-0.834,0-1.772,0.576-2.827,1.274c-0.686,0.456-1.229,0.815-1.641,0.815c-0.278,0-0.502-0.186-0.502-0.338 c0-0.025,0.003-0.052,0.011-0.077l1.157-1.548l-0.999-0.671c-0.214-0.14-0.544-0.402-0.581-0.599 c-0.018-0.092,0.116-0.259,0.158-0.308c0.414-0.483,0.889-1.072,1.371-1.798c0.293-0.413,0.465-0.641,0.96-0.641 c0.489,0,0.888,0.392,0.888,0.873c0,0.319,0.35,0.57,0.784,0.57c0.435,0,0.628-0.308,0.896-0.57c0,0,1.034-0.946,0.487-1.394 c-0.624-0.511-3.122,0.531-2.427-1.762l0.173-0.328c0.266-0.354,1.462-1.238,3.931-1.238c0.466,0,0.96,0.033,1.466,0.096 l0.37,0.048l5.241-3.232c0.046,0.109,0.061,0.188,0.061,0.188l0.005,0.032c0.273,1.586-0.726,3.474-2.326,4.392l-0.639,0.365 l0.413,2.364c-1.347,0.413-2.283,1.491-2.283,2.789c0,0.445,0.104,0.975,0.235,1.644c0.145,0.744,0.31,1.585,0.354,2.44 c0,2.46-3.393,4.087-6.266,3.994L22.477,21.8c-0.118-0.003-1.946-0.148-2.395-0.501C19.994,21.234,19.924,21.089,19.949,20.979 M6.961,28.702c0.416-0.633,1.362-1.18,2.548-0.974l0.898,0.156l0.281-0.865c0.077-0.232,0.179-0.403,0.318-0.537 c0.253-0.237,0.629-0.35,1.109-0.337c1.268,0.041,2.855,0.924,4.145,2.307c0.469,0.503,0.884,1.085,1.255,1.676 c0.071,0.124,0.154,0.258,0.229,0.375c0.103,0.164,0.191,0.299,0.208,0.331c0.045,0.081,0.683,1.038,0.639,1.099 c0.437-0.61,0.872-1.223,1.308-1.834c0.013-0.017-0.006-0.074-0.043-0.153c-0.098-0.21-0.33-0.574-0.468-0.79L19.291,29 c-0.002-0.003-0.005-0.009-0.007-0.013c-0.014-0.021-0.072-0.113-0.148-0.232c-0.146-0.227-0.354-0.557-0.447-0.737l2.745-4.388 c0.685,0.143,1.268,0.164,1.547,0.164h0.068c3.87,0,7.872-2.232,7.872-5.969v-0.091c-0.048-1.017-0.238-1.988-0.392-2.768 c-0.1-0.514-0.196-0.999-0.196-1.241c0-0.41,0.577-0.865,1.401-0.865h1.251l-0.568-3.243c1.764-1.295,2.844-3.407,2.791-5.425 c1.896,1.455,3.235,3.98,3.48,6.665c0.073,0.779-0.082,1.871-0.334,3.017l-0.134,0.479l0.022,0.007 c-0.45,1.872-1.112,3.797-1.46,4.71l-0.324,0.844l0.788,0.446c1.411,0.8,2.28,1.384,2.28,3.244c0,2.133-1.919,3.768-3.775,4.114 l-2.535,0.474l2.146,1.433c0.688,0.459,1.097,1.207,1.097,2c0,1.339-1.138,2.428-2.539,2.428h-0.809l-0.228,0.742 c-0.788,2.566-1.643,3.819-4.394,4.088c0.128-0.779,0.216-1.529,0.216-2.59c0-0.249-0.021-0.947-0.031-1.172L28.55,32.73 l-1.681,1.707c-0.571,0.58-1.583,1.041-2.693,1.259v-2.085L12.15,30.49l-4.28,1.112C6.916,30.646,6.724,29.068,6.961,28.702 M3.503,54.82l8.647-2.25l8.644,2.25H3.503z M22.067,52.979l-9.917-2.58l-9.92,2.58v-17.74l9.92-2.576l9.917,2.576V52.979z M26.683,49.528c-0.896,1.288-1.005,3.064-0.331,5.292h-2.177V37.828c0.779-0.119,1.618-0.342,2.399-0.699 c-0.044,0.741-0.145,1.327-0.284,2.111c-0.031,0.182-0.064,0.371-0.1,0.574l-0.208,1.225h1.247c1.862,0,3.251-0.29,4.32-0.842 v7.094c0,0.182-0.141,0.328-0.313,0.328h-0.317C29.07,47.619,27.525,48.316,26.683,49.528 M49.535,49.984 c-0.762,0.874-1.502,2.396-1.022,4.836H35.632c1.384-0.137,2.389-0.46,3.084-1.182c0.842-0.877,0.917-2.076,0.889-2.933 c0.028-0.075,0.167-0.365,0.799-0.65l1.11-0.505l-0.665-1.025c-1.102-1.691-0.623-5.389-0.195-7.396h0.1 c4.367,0,7.193-0.907,10.172-1.865c0.777-0.25,1.579-0.508,2.425-0.754l0.026-0.01c0.018-0.004,0.888-0.281,2.073-0.559l4.201,6.92 l0.037,0.06c0.418,0.597,0.471,0.989-0.291,1.878l-2.104,2.271l-3.45-0.641l-0.031-0.006 C52.253,48.184,50.574,48.797,49.535,49.984 M50.67,54.82c-0.38-1.488-0.226-2.678,0.454-3.453 c0.649-0.744,1.646-0.969,2.352-0.869l4,0.742l0.1,0.02h0.557l2.827-3.049l0.026-0.027c0.483-0.563,1.951-2.265,0.45-4.439 l-3.775-6.223c0.625-0.089,1.254-0.145,1.833-0.145l0.026-0.002c0.02,0.002,1.913-0.026,3.942,1.154 c0.275,0.59,0.656,1.365,1.082,2.229c0.793,1.607,1.781,3.607,2.056,4.416c0.087,0.254,0.355,1.025-0.592,2.005l-7.241,7.642H50.67 z M75.347,54.82H61.665l5.864-6.188c1.184-1.224,1.561-2.694,1.063-4.14c-0.285-0.833-1.059-2.43-1.865-4.067 c2.327,1.081,5.855,2.054,13.036,2.632c0.865,0.072,1.093,0.367,1.264,1.153l0.315,3.099l-3.752,0.836 c-1.257,0.25-2.245,1.076-2.71,2.273C74.367,51.738,74.542,53.293,75.347,54.82 M76.844,51.18c0.207-0.531,0.608-0.867,1.163-0.974 l5.619-1.253l-0.508-5.012l-0.018-0.107c-0.138-0.658-0.557-2.658-3.166-2.871c-10.044-0.811-12.375-2.301-14.815-3.877 c-0.003-0.008-0.007-0.016-0.009-0.023l-0.016,0.008l-0.158-0.104c-2.607-1.686-5.199-1.7-5.453-1.693 c-2.845,0.002-6.445,1.128-6.738,1.221c-0.868,0.256-1.681,0.517-2.467,0.769c-3.145,1.011-5.862,1.888-10.425,1.751l-0.833-0.024 l-0.216,0.806c-0.164,0.619-1.44,5.664-0.208,8.905c-1.105,0.87-1.105,1.877-1.098,2.013c0.046,1.108-0.217,1.382-0.303,1.471 c-0.527,0.547-2.276,0.618-3.75,0.618h-0.018h-0.537l-0.315,0.435c-0.909,1.25-2.87,1.543-4.126,1.223 c-0.554-1.681-0.568-2.965-0.035-3.732c0.628-0.906,1.962-1.004,2.505-1.004h0.317c1.334,0,2.42-1.091,2.42-2.432V38.26 c0.406-0.627,0.732-1.351,1.017-2.165c2.203-0.353,3.891-2.222,3.891-4.47c0-0.863-0.253-1.697-0.712-2.41 c2.036-0.981,3.779-2.984,3.779-5.611c0-2.626-1.32-3.831-2.576-4.62c0.354-1.008,0.937-2.781,1.334-4.566l1.763-6.316 C42.94,5.625,45,4.026,47.404,4.026h31.062c-1.315,1.85-3.182,2.726-5.77,2.726H53.9l-0.983,2.102h16.846 c-1.324,2.104-3.26,3.097-6.013,3.097H51.537l-0.982,2.103h10.899c-1.321,2.026-3.236,2.983-5.938,2.983h-6.657l-0.983,2.103h6.98 c0.063,0.086,0.238,0.405,0.238,1.257c0,1.351-1.135,2.45-2.532,2.45c-0.479,0-0.888-0.111-1.607-0.403 c-0.308-0.131-0.616-0.262-0.924-0.392l-1.62,1.453c0.303,0.129,0.605,0.258,0.909,0.386v0.001 c1.402,0.607,2.184,0.924,3.243,0.924c1.285,0,2.444-0.533,3.266-1.381c1.196,0.077,3.125,0.236,4.994,0.388 c2.233,0.184,4.341,0.358,5.432,0.415c0.545,0.03,1.056,0.056,1.546,0.079c0.926,0.046,1.773,0.088,2.621,0.149 c4.237,6.884,6.412,7.789,14.623,8.772c0.592,1.061,1.124,2.182,1.632,3.309v13.404l0.003,0.077 c0.046,0.616,0.046,0.825-0.038,0.937c-0.286,0.373-1.553,0.902-1.993,1.084l-6.92,2.609C76.809,53.414,76.479,52.117,76.844,51.18 "></path> <polygon fill="#C5281C" points="19.87,37.961 13.242,36.242 13.242,38.413 19.87,40.135 "></polygon> <polygon fill="#C5281C" points="4.428,40.135 11.056,38.413 11.056,36.24 4.428,37.961 "></polygon> <polygon fill="#C5281C" points="4.428,44.5 11.056,42.78 11.056,40.607 4.428,42.326 "></polygon> <polygon fill="#C5281C" points="19.87,42.326 13.242,40.607 13.242,42.781 19.87,44.5 "></polygon> <polygon fill="#C5281C" points="19.87,46.695 13.242,44.973 13.242,47.146 19.87,48.867 "></polygon> <polygon fill="#C5281C" points="4.428,48.867 11.056,47.146 11.056,44.973 4.428,46.695 "></polygon> </g> <g> <g> <polygon fill="#C32A24" points="116.295,57.127 118.621,57.127 118.621,58.014 111.138,58.014 111.138,57.127 113.547,57.127 113.547,40.597 111.138,40.597 111.138,39.709 118.621,39.709 118.621,40.597 116.295,40.597 "></polygon> <path fill="#C32A24" d="M178.651,40.724l1.521-1.143v5.369h-0.508c0-0.592-0.043-1.1-0.17-1.563 c-0.127-0.465-0.295-0.846-0.506-1.143c-0.213-0.338-0.424-0.591-0.721-0.803c-0.254-0.212-0.549-0.423-0.803-0.592 c-0.635-0.338-1.354-0.55-2.199-0.592c-0.93,0-1.689,0.169-2.197,0.508c-0.508,0.338-0.889,0.718-1.143,1.099 c-0.295,0.465-0.465,1.016-0.506,1.606c0,0.507,0.127,0.888,0.379,1.226c0.254,0.339,0.551,0.593,0.846,0.804 c0.34,0.254,0.764,0.424,1.186,0.593l3.467,0.888c1.014,0.254,1.816,0.634,2.367,1.099c0.592,0.509,1.014,1.016,1.268,1.522 c0.297,0.507,0.465,1.015,0.508,1.437c0.043,0.425,0.086,0.763,0.086,0.932v0.127c0,0.973-0.129,1.816-0.381,2.536 c-0.254,0.677-0.594,1.269-0.973,1.732c-0.381,0.465-0.846,0.803-1.311,1.101c-0.467,0.254-0.932,0.465-1.396,0.591 c-0.424,0.127-0.846,0.212-1.184,0.254c-0.338,0.043-0.594,0.043-0.721,0.043l0,0c-0.465,0-0.93-0.085-1.395-0.17 c-0.381-0.084-0.846-0.253-1.354-0.464c-0.508-0.212-0.93-0.508-1.354-0.89l-1.816,1.312v-6.849h0.508 c0.041,1.142,0.295,2.664,0.676,3.467c0.17,0.339,0.381,0.677,0.635,1.015s0.592,0.634,0.93,0.888 c0.381,0.255,0.805,0.466,1.311,0.635c0.508,0.17,1.1,0.254,1.775,0.254h0.084c0.086,0,0.297,0,0.551-0.042 c0.254,0,0.551-0.085,0.889-0.127c0.338-0.085,0.676-0.212,1.014-0.338c0.381-0.169,0.678-0.382,0.975-0.636 c0.295-0.253,0.549-0.634,0.719-1.057c0.211-0.423,0.295-0.93,0.295-1.521v-0.043c0-0.084,0-0.296-0.043-0.591 c-0.041-0.297-0.127-0.635-0.338-0.973c-0.168-0.381-0.465-0.719-0.803-1.059c-0.34-0.338-0.889-0.591-1.521-0.761l-3.848-0.888 c-0.635-0.169-1.227-0.465-1.732-0.845c-0.424-0.34-0.846-0.763-1.184-1.354c-0.381-0.55-0.551-1.311-0.551-2.198 c0-0.887,0.17-1.689,0.508-2.408c0.338-0.678,0.762-1.27,1.268-1.733c0.508-0.465,1.102-0.804,1.691-1.057 c0.635-0.255,1.227-0.339,1.816-0.339c0.424,0,0.805,0.043,1.229,0.127c0.338,0.085,0.717,0.212,1.098,0.339 C178.017,40.217,178.354,40.428,178.651,40.724"></path> <path fill="#C32A24" d="M275.29,40.724l1.521-1.143v5.369h-0.508c0-0.592-0.084-1.1-0.17-1.563 c-0.127-0.465-0.295-0.846-0.508-1.143c-0.211-0.338-0.422-0.591-0.719-0.803c-0.252-0.212-0.549-0.423-0.803-0.592 c-0.635-0.338-1.354-0.55-2.197-0.592c-0.932,0-1.648,0.169-2.199,0.508c-0.506,0.338-0.887,0.718-1.143,1.099 c-0.295,0.465-0.465,1.016-0.506,1.606c0,0.507,0.127,0.888,0.379,1.226c0.256,0.339,0.551,0.593,0.848,0.804 c0.338,0.254,0.76,0.424,1.184,0.593l3.467,0.888c1.016,0.254,1.816,0.634,2.367,1.099c0.592,0.509,1.016,1.016,1.27,1.522 c0.295,0.507,0.465,1.015,0.506,1.437c0.043,0.425,0.086,0.763,0.086,0.932v0.127c0,0.973-0.127,1.816-0.381,2.536 c-0.254,0.677-0.592,1.269-0.973,1.732c-0.381,0.465-0.846,0.803-1.313,1.101c-0.465,0.254-0.93,0.465-1.395,0.591 c-0.424,0.127-0.846,0.212-1.184,0.254c-0.338,0.043-0.592,0.043-0.719,0.043h-0.086c-0.463,0-0.93-0.085-1.395-0.17 c-0.381-0.084-0.846-0.253-1.311-0.464c-0.508-0.212-0.932-0.508-1.354-0.89l-1.818,1.312v-6.849h0.508 c0.043,1.142,0.297,2.664,0.676,3.467c0.17,0.339,0.381,0.677,0.635,1.015s0.592,0.634,0.975,0.888 c0.379,0.255,0.803,0.466,1.309,0.635c0.508,0.17,1.1,0.254,1.775,0.254h0.086c0.084,0,0.295,0,0.549-0.042 c0.254,0,0.551-0.085,0.889-0.127c0.338-0.085,0.678-0.212,1.016-0.338c0.379-0.169,0.676-0.382,0.971-0.636 c0.297-0.253,0.551-0.634,0.719-1.057c0.17-0.423,0.297-0.93,0.297-1.521v-0.043c0-0.084,0-0.296-0.043-0.591 c-0.041-0.297-0.127-0.635-0.338-0.973c-0.168-0.381-0.465-0.719-0.803-1.059c-0.338-0.338-0.846-0.591-1.521-0.761l-3.848-0.888 c-0.635-0.169-1.227-0.465-1.732-0.845c-0.424-0.34-0.846-0.763-1.184-1.354c-0.381-0.55-0.551-1.311-0.551-2.198 c0-0.887,0.17-1.689,0.508-2.408c0.338-0.678,0.762-1.27,1.27-1.733c0.508-0.465,1.1-0.804,1.689-1.057 c0.635-0.255,1.227-0.339,1.818-0.339c0.422,0,0.846,0.043,1.225,0.127c0.34,0.085,0.719,0.212,1.102,0.339 C274.655,40.217,274.993,40.428,275.29,40.724"></path> <path fill="#C32A24" d="M196.278,39.752v6.469h-0.508c0-1.396-0.127-2.494-0.465-3.256c-0.297-0.762-0.635-1.311-0.973-1.69 c-0.422-0.423-0.887-0.634-1.396-0.719h-1.984v16.612h2.281v0.889h-7.523v-0.889h2.281V40.555h-2.408 c-0.551,0.042-1.016,0.296-1.439,0.719c-0.381,0.338-0.719,0.888-1.014,1.69c-0.297,0.762-0.465,1.859-0.465,3.256h-0.381v-6.427 L196.278,39.752L196.278,39.752z"></path> <path fill="#C32A24" d="M265.144,39.709v6.427h-0.506c0-1.396-0.127-2.494-0.424-3.255c-0.297-0.763-0.635-1.312-0.973-1.691 c-0.422-0.422-0.889-0.634-1.396-0.719h-2.029v16.614h2.283v0.888h-7.523v-0.888h2.281V40.471h-2.408 c-0.551,0.043-1.016,0.297-1.479,0.719c-0.381,0.339-0.719,0.888-1.016,1.691c-0.295,0.761-0.465,1.858-0.465,3.255h-0.381v-6.427 H265.144z"></path> <path fill="#C32A24" d="M215.386,57.168h2.283v0.847h-7.439v-0.847h2.41V41.654l-5.834,16.359h-0.889l-5.072-16.486v14.584 c0.043,0.212,0.127,0.423,0.295,0.55c0.127,0.127,0.34,0.254,0.508,0.296c0.211,0.086,0.381,0.127,0.594,0.127 c0.211,0,0.338,0.043,0.465,0.043h0.168v0.888h-4.945v-0.888h0.17c0.084,0,0.252,0,0.422-0.043c0.168,0,0.381-0.041,0.551-0.127 c0.168-0.084,0.381-0.169,0.549-0.296c0.17-0.127,0.297-0.338,0.381-0.55V41.527c0-0.212-0.127-0.381-0.338-0.466 c-0.211-0.126-0.424-0.211-0.721-0.253c-0.254-0.042-0.506-0.085-0.76-0.127c-0.254,0-0.465-0.042-0.635-0.042h-0.211v-0.888 h5.834l4.311,14.076l4.947-14.076h5.326v0.888h-2.283v16.528H215.386L215.386,57.168z"></path> <path fill="#C32A24" d="M159.542,48.122v-7.524c4.691,0,6.426-0.254,7.271,5.538h0.508v-6.427H154.47v0.889h2.24v16.528h-2.453 v0.847h13.232v-6.681h-0.678c-0.676,5.115-1.943,5.876-5.58,5.876h-1.689v-8.03h0.973c1.648,0.042,2.578,0.972,2.875,3.805h0.592 v-8.328h-0.592c0,0.042-0.127,3.593-2.959,3.509L159.542,48.122L159.542,48.122z"></path> <path fill="#C32A24" d="M223.968,48.122v-7.524c4.693,0,6.426-0.254,7.271,5.538h0.508v-6.427h-12.854v0.889h2.242v16.528h-2.453 v0.847h13.232v-6.681h-0.676c-0.678,5.115-1.945,5.876-5.58,5.876h-1.691v-8.03h0.973c1.648,0.042,2.578,0.972,2.873,3.805h0.594 v-8.328h-0.594c0,0.042-0.125,3.593-2.959,3.509L223.968,48.122L223.968,48.122z"></path> <path fill="#C32A24" d="M249.968,40.64v-0.888h-6.258v0.888h0.508c0.676,0,2.199,0.042,2.326,1.437v10.484l-8.709-12.809h-4.777 v0.888h0.805c0.93,0,2.238,0.042,2.324,1.437V55.52c0,1.311-1.943,1.818-2.791,1.818l0,0v0.676h6.428v-0.676 c-0.805,0-2.791-0.509-2.791-1.818l0.043-11.837c3.467,4.946,9.977,14.331,10.018,14.331h0.34V42.075 c0.084-1.353,1.648-1.437,2.324-1.437L249.968,40.64L249.968,40.64z"></path> <path fill="#C32A24" d="M136.587,40.597v-0.889h-6.299v0.889h0.507c0.677,0,2.24,0.043,2.325,1.438l0,0v10.526l-8.751-12.853 h-4.734v0.889h0.803c0.932,0,2.241,0.043,2.326,1.438V55.52c0,1.311-1.987,1.818-2.791,1.818l0,0v0.676h6.426v-0.676 c-0.803,0-2.79-0.509-2.79-1.818l0.043-11.879c3.467,4.945,9.978,14.373,10.062,14.373h0.338V42.034 c0.085-1.395,1.649-1.438,2.325-1.438H136.587z"></path> <polygon fill="#C32A24" points="148.212,39.709 148.212,40.048 148.212,40.597 148.212,40.597 150.454,40.597 146.776,53.448 142.675,40.597 145.085,40.597 145.085,40.597 145.085,40.048 145.085,39.709 137.517,39.709 137.517,40.597 138.109,40.597 138.109,40.597 139.843,40.597 145.339,58.056 145.972,58.056 151.087,40.597 153.454,40.597 153.454,40.597 153.454,40.048 153.454,39.709 "></polygon> </g> <g> <path fill="#C32A24" d="M142.845,15.485V3.987c7.188,0,9.85-0.38,11.117,8.455h0.762V2.592h-19.616v1.353h3.383V29.31h-3.764 v1.353h20.208V20.307h-1.016c-1.014,7.82-3,9.004-8.539,9.004h-2.578V17.009h1.479c2.494,0.042,3.932,1.521,4.439,5.791h0.93 V10.074c0,0.043-0.889,0-0.889,0c0,0.085-0.168,5.454-4.521,5.369L142.845,15.485L142.845,15.485z"></path> <path fill="#C32A24" d="M134.854,15.993h-11.075v1.27h3.805v9.089c-0.634,2.325-4.059,3.297-5.072,3.297 c-7.061,0-6.553-10.356-6.553-13.104c0-2.537-0.254-13.105,6.553-13.105c4.819,0,7.313,4.777,8.328,9.09h0.761 c0-1.775,0.042-10.188,0-10.188c0-0.085-3.298,2.367-3.298,2.324c0.085-0.043-1.521-2.282-5.834-2.282 c-8.328,0-11.414,8.328-11.371,14.119c0.042,5.326,2.494,14.374,11.371,14.374c2.79,0,4.777-1.438,5.834-3.045 c0-0.041,3.509,2.79,3.552,2.79V17.265h3.001L134.854,15.993L134.854,15.993z"></path> <path fill="#C32A24" d="M231.577,20.517l4.018-12.091l4.313,12.091H231.577z M215.894,15.697h-4.521V3.987h5.791 c3.424,0.508,3.551,4.438,3.551,5.707C220.714,12.738,219.446,15.697,215.894,15.697 M264.214,20.306 c-1.016,7.819-3.002,9.004-8.539,9.004h-0.338V4.029h3.551V2.677h-11.627v1.353h3.553v25.28h-2.791L237.708,1.873h-1.521 c0.043,0-8.582,24.857-8.582,24.941c0-0.084-0.633,2.156-2.07,2.41c-1.311,0.042-1.227-0.635-1.227-0.846v-4.777 c0-1.268-0.084-4.102-1.395-5.411c-1.48-1.479-3.975-1.606-3.934-1.647c0,0,6.342-1.312,6.342-7.355 c0-4.229-2.959-6.342-7.861-6.511h-13.951v1.353h3.594v25.28h-3.594v1.353h11.371V29.31h-3.551V17.135h4.775 c8.287,0.677-1.436,13.526,9.43,13.484h6.848v-1.353c-0.381,0-2.875,0.085-3.045-1.648c-0.084-1.269,1.648-5.792,1.648-5.792 h9.301c0,0,2.875,7.44,2.918,7.44h-3.256v1.353h25.322V20.263L264.214,20.306L264.214,20.306z"></path> <path fill="#C32A24" d="M189.685,3.987c7.188,0,9.85-0.338,11.117,8.497h0.762v-9.85h-28.619v1.353h0.76 c1.016,0,3.426,0.084,3.553,2.198v16.148L163.854,2.677h-7.313v1.353h1.227c1.438,0,3.467,0.085,3.553,2.198V26.9 c0,2.028-3.045,2.789-4.271,2.789l0,0v1.015h9.852v-1.015c-1.27,0-4.313-0.761-4.313-2.789L162.63,8.68 c5.285,7.566,15.305,21.981,15.389,21.981h0.508V6.185c0.127-2.114,2.535-2.198,3.551-2.198h3.297v25.322h-3.762v1.353h20.207 V20.306h-1.016c-1.014,7.819-3.002,9.004-8.539,9.004h-2.578V17.008h1.479c2.494,0.042,3.932,1.521,4.438,5.791h0.932V10.074 c0,0.042-0.889,0-0.889,0c0,0.084-0.168,5.453-4.521,5.368h-1.396L189.685,3.987L189.685,3.987z"></path> <polygon fill="#C32A24" points="277.954,3.987 277.954,2.635 266.538,2.635 266.538,3.987 270.132,3.987 270.132,29.268 266.538,29.268 266.538,30.62 277.954,30.62 277.954,29.268 274.36,29.268 274.36,3.987 "></polygon> </g> </g> </svg>

            </Link>
          </div>
          <div class="flex w-2/4 bg-white justify-between items-center">
            <Search searchIndex={data.siteSearchIndex.index} />
          </div>
          <div class="flex w-1/4 hidden" />
        </nav>
      )}
    />
  )

export default Header
