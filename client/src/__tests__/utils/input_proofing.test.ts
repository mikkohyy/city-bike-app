import {
  toStation,
  toGetStationsResponseData,
} from '../../utils/input_proofing'

describe('toStation()', () => {
  const stationData = {
    id: 1,
    stationId: '501',
    nameInFinnish: 'Hanasaari',
    nameInSwedish: 'Hanaholmen',
    nameInEnglish: 'Hanasaari',
    addressInFinnish: 'Hanasaarenranta 1',
    addressInSwedish: 'Hanaholmsstranden 1',
    cityInFinnish: 'Espoo',
    cityInSwedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 10,
    yCoordinate: 24.840319,
    xCoordinate: 60.16582,
  }
  test('returns expected object when data is valid', () => {
    const data = { ...stationData }

    const proofedStation = toStation(data)

    expect(proofedStation).toEqual(data)
  })
  describe('throws an error', () => {
    test('when one property is invalid', () => {
      const data = { ...stationData, stationId: '5014' }
      expect(() => {
        toStation(data)
      }).toThrow(new Error('Data is not valid Station data'))
    })
    test('when one property is missing', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = { ...stationData }

      delete data.operator

      expect(() => {
        toStation(data)
      }).toThrow(new Error('Data is not valid Station data'))
    })
  })
})

describe('toGetStationsResponseData()', () => {
  const stationData = [
    {
      id: 1,
      stationId: '501',
      nameInFinnish: 'Hanasaari',
      nameInSwedish: 'Hanaholmen',
      nameInEnglish: 'Hanasaari',
      addressInFinnish: 'Hanasaarenranta 1',
      addressInSwedish: 'Hanaholmsstranden 1',
      cityInFinnish: 'Espoo',
      cityInSwedish: 'Esbo',
      operator: 'CityBike Finland',
      capacity: 10,
      yCoordinate: 24.840319,
      xCoordinate: 60.1658,
    },
    {
      id: 2,
      stationId: '529',
      nameInFinnish: 'Keilaniemi (M)',
      nameInSwedish: 'Kägeludden (M)',
      nameInEnglish: 'Keilaniemi (M)',
      addressInFinnish: 'Keilaniementie 4',
      addressInSwedish: 'Kägeluddsvägen 4',
      cityInFinnish: 'Espoo',
      cityInSwedish: 'Esbo',
      operator: 'CityBike Finland',
      capacity: 40,
      xCoordinate: 24.82895,
      yCoordinate: 60.175233,
    },
  ]
  const requestData = {
    page: 0,
    pageSize: 50,
    totalNOfRows: 100,
    totalPages: 5,
    nextPage: 1,
  }
  describe('returns expected data', () => {
    test('when data is valid and nextPage is integer', () => {
      const data = {
        data: stationData.map((station) => {
          return station
        }),
        ...requestData,
      }

      const proofedData = toGetStationsResponseData(data)

      expect(proofedData).toEqual(data)
    })
    test('when data is valid and nextPage is null', () => {
      const data = {
        data: stationData.map((station) => {
          return station
        }),
        ...requestData,
      }
      const proofedData = toGetStationsResponseData(data)

      expect(proofedData).toEqual(data)
    })
  })
  describe('throws an error', () => {
    test('station data is invalid', () => {
      const data = {
        data: stationData.map((station) => {
          return station
        }),
        ...requestData,
      }

      data.data[0].stationId = '1234'

      expect(() => {
        toGetStationsResponseData(data)
      }).toThrow(new Error('Data is not valid GetStationsResponse data'))
    })

    test('one property is missing', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        data: stationData.map((station) => {
          return station
        }),
        ...requestData,
      }

      delete data.nextPage

      expect(() => {
        toGetStationsResponseData(data)
      }).toThrow(new Error('Data is not valid GetStationsResponse data'))
    })
  })
})
