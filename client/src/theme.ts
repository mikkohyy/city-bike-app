const palette = {
  darkest: '#000000',
  darker: '#408080',
  dark: '#6ddada',
  light: '#ffffff',
  selected: '#ffffff',
  headerRow: 'red',
  bodyRow: 'blue',
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
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1em',
    },
  },
  languageSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
    padding: '1em',
  },
}

const tables = {
  cell: {
    header: {
      fontWeight: 'bold',
    },
    body: {
      fontWeight: 'normal',
    },
  },
  row: {
    display: 'grid',
    fontSize: '1.5em',
    padding: '0.5em',
  },
  headerRow: {
    background: 'grey',
    fontWeight: 'bold',
  },
  bodyRow: {
    even: {
      background: '#ffffff',
    },
    odd: {
      background: 'lightgrey',
    },
  },
  stationsRow: {
    gridTemplateColumns: '2fr 2fr 2fr',
  },
}

const buttons = {
  controlBarButton: {
    basic: {
      textDecoration: 'none',
      fontSize: '1.5em',
      color: palette.darkest,
      padding: '0.5em 0.5em 0.5em 0.5em',
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
    tables,
  },
}

export default theme
