import Typography from 'typography'

const typography = new Typography({
  baseFontSize : '16px',
  baseLineHeight : 1.50,
  scaleRatio : 3.00,
  bodyWeight : '300',
  headerWeight : '700',
  boldWeight : '700',
  bodyColor : '#504040',
  headerColor : '#504040',
  headerFontFamily : ['Rubik'],
  bodyFontFamily : ['Rubik'],
})

export const { scale, rhytm, options } = typography
export default typography