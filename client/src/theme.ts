const palette = {
  dark: '#259b9A',
  light: '#ffffff',
}

const generalProperties = {
  marginFromSides: '4em',
}

const containers = {
  mainContainer: {
    marginLeft: generalProperties.marginFromSides,
    marginRight: generalProperties.marginFromSides,
    border: 'solid 2px black',
  },
  controlBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1em',
  },
}

const theme = {
  palette,
  generalProperties,
  components: {
    containers,
  },
}

export default theme
