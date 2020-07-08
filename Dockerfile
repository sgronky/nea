FROM gatsbyjs/gatsby:onbuild as build

FROM gatsbyjs/gatsby
ADD public/ /pub