const palette = {
  darkest: '#000000',
  darker: '#408080',
  dark: '#6ddada',
  light: '#ffffff',
}

const generalProperties = {
  marginFromSides: '5em',
}

const containers = {
  mainContainer: {
    marginLeft: generalProperties.marginFromSides,
    marginRight: generalProperties.marginFromSides,
    border: 'solid 2px black',
  },
  controlBar: {
    main: {
      display: 'flex',
      background: palette.dark,
      padding: '1em',
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1em',
    },
  },
}

const buttons = {
  controlBarButton: {
    basic: {
      textDecoration: 'none',
      fontSize: '1.5em',
      color: palette.darkest,
    },
    hovered: {
      color: palette.darker,
    },
  },
}

const theme = {
  palette,
  generalProperties,
  components: {
    containers,
    buttons,
  },
}

export default theme
