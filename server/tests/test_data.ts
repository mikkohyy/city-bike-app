/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { transformSnakeCaseObjectToCamelCase } from './test_helpers'

const stationsInSnakeCaseWithSetDatabaseId = [
  {
    id: 1,
    station_id: '501',
    name_in_finnish: 'Hanasaari',
    name_in_swedish: 'Hanaholmen',
    name_in_english: 'Hanasaari',
    address_in_finnish: 'Hanasaarenranta 1',
    address_in_swedish: 'Hanaholmsstranden 1',
    city_in_finnish: 'Espoo',
    city_in_swedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 10,
    y_coordinate: 24.840319,
    x_coordinate: 60.16582,
  },
  {
    id: 2,
    station_id: '529',
    name_in_finnish: 'Keilaniemi (M)',
    name_in_swedish: 'Kägeludden (M)',
    name_in_english: 'Keilaniemi (M)',
    address_in_finnish: 'Keilaniementie 4',
    address_in_swedish: 'Kägeluddsvägen 4',
    city_in_finnish: 'Espoo',
    city_in_swedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 40,
    x_coordinate: 24.82895,
    y_coordinate: 60.175233,
  },
  {
    id: 3,
    station_id: '531',
    name_in_finnish: 'Keilaranta',
    name_in_swedish: 'Kägelstranden',
    name_in_english: 'Keilaranta',
    address_in_finnish: 'Keilaranta 13',
    address_in_swedish: 'Kägelstranden 13',
    city_in_finnish: 'Espoo',
    city_in_swedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 24,
    x_coordinate: 24.835132,
    y_coordinate: 60.178762,
  },
  {
    id: 4,
    station_id: '539',
    name_in_finnish: 'Aalto-yliopisto (M), Tietot',
    name_in_swedish: 'Aalto-universitetet (M),',
    name_in_english: 'Aalto University (M), Tietotie',
    address_in_finnish: 'Tietotie 4',
    address_in_swedish: 'Datavägen 4',
    city_in_finnish: 'Espoo',
    city_in_swedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 20,
    x_coordinate: 24.820099,
    y_coordinate: 60.184987,
  },
  {
    id: 5,
    station_id: '635',
    name_in_finnish: 'Kuunkatu',
    name_in_swedish: 'Mångatan',
    name_in_english: 'Kuunkatu',
    address_in_finnish: 'Kuunkatu 3',
    address_in_swedish: 'Mångatan 3',
    city_in_finnish: 'Espoo',
    city_in_swedish: 'Esbo',
    operator: 'CityBike Finland',
    capacity: 24,
    x_coordinate: 24.726025,
    y_coordinate: 60.172673,
  },
  {
    id: 6,
    station_id: '032',
    name_in_finnish: 'Eläinmuseo',
    name_in_swedish: 'Naturhistoriska museet',
    name_in_english: 'Finnish Museum of Natural History',
    address_in_finnish: 'Pohjoinen Rautatiekatu 13',
    address_in_swedish: 'Norra Järnvägsgatan 13',
    city_in_finnish: '',
    city_in_swedish: '',
    operator: '',
    capacity: 20,
    x_coordinate: 24.9318975121431,
    y_coordinate: 60.1713588986588,
  },
  {
    id: 7,
    station_id: '040',
    name_in_finnish: 'Hakaniemi (M)',
    name_in_swedish: 'Hagnäs (M)',
    name_in_english: 'Hakaniemi (M)',
    address_in_finnish: 'John Stenberginranta 6',
    address_in_swedish: 'John Stenbergs strand 6',
    city_in_finnish: '',
    city_in_swedish: '',
    operator: '',
    capacity: 28,
    x_coordinate: 24.9522579797678,
    y_coordinate: 60.1780816347447,
  },
  {
    id: 8,
    station_id: '108',
    name_in_finnish: 'Radiokatu',
    name_in_swedish: 'Radiogatan',
    name_in_english: 'Radiokatu',
    address_in_finnish: 'Kuuluttajankatu 2',
    address_in_swedish: 'Hallåmansgatan 2',
    city_in_finnish: '',
    city_in_swedish: '',
    operator: '',
    capacity: 12,
    x_coordinate: 24.9182184498931,
    y_coordinate: 60.2050064264488,
  },
  {
    id: 9,
    station_id: '204',
    name_in_finnish: 'A.I. Virtasen aukio',
    name_in_swedish: 'A. I. Virtanens plats',
    name_in_english: 'A.I. Virtasen aukio',
    address_in_finnish: 'Gustaf Hällströmin katu 1',
    address_in_swedish: 'Gustaf Hällströms gata 1',
    city_in_finnish: '',
    city_in_swedish: '',
    operator: '',
    capacity: 24,
    x_coordinate: 24.9620788508104,
    y_coordinate: 60.2055418168461,
  },
  {
    id: 10,
    station_id: '395',
    name_in_finnish: 'Honkasuo',
    name_in_swedish: 'Hongasmossa',
    name_in_english: 'Honkasuo',
    address_in_finnish: 'Naapuripellontie 27',
    address_in_swedish: 'Naboängsvägen 27',
    city_in_finnish: '',
    city_in_swedish: '',
    operator: '',
    capacity: 16,
    x_coordinate: 24.8465809743929,
    y_coordinate: 60.255557476007,
  },
]

const stationsInCamelCaseWithSetDatabaseId =
  stationsInSnakeCaseWithSetDatabaseId.map((station) =>
    transformSnakeCaseObjectToCamelCase(station)
  )

const getOrderedStationsInCamelCase = (
  orderBy: string,
  direction: string
): object[] => {
  const compareFunction = (
    a: { [key: string]: string },
    b: { [key: string]: string }
  ): number => {
    let comparison = 0

    const firstValue = a[orderBy]
    const secondValue = b[orderBy]

    if (firstValue < secondValue) {
      comparison = direction === 'ascending' ? -1 : 1
    }

    if (firstValue > secondValue) {
      comparison = direction === 'ascending' ? 1 : -1
    }

    return comparison
  }

  const stations = [...stationsInCamelCaseWithSetDatabaseId]
  const orderedStations = stations.sort(compareFunction)

  return orderedStations
}

const getLastIdOfStations = () => {
  const lastStationIndex = stationsInSnakeCaseWithSetDatabaseId.length - 1
  const lastStationEntry =
    stationsInSnakeCaseWithSetDatabaseId[lastStationIndex]
  return lastStationEntry.id
}

const journeysInSnakeCaseWithSetDatabaseId = [
  {
    id: 1,
    departure_time: '2021-05-31T17:58:25',
    return_time: '2021-05-31T18:11:55',
    departure_station_id: '204',
    return_station_id: '204',
    covered_distance_in_meters: 2332,
    duration_in_seconds: 807,
  },
  {
    id: 2,
    departure_time: '2021-05-31T15:34:20',
    return_time: '2021-05-31T15:43:40',
    departure_station_id: '040',
    return_station_id: '032',
    covered_distance_in_meters: 1862,
    duration_in_seconds: 556,
  },
  {
    id: 3,
    departure_time: '2021-05-31T15:22:20',
    return_time: '2021-05-31T15:25:25',
    departure_station_id: '529',
    return_station_id: '531',
    covered_distance_in_meters: 573,
    duration_in_seconds: 180,
  },
  {
    id: 4,
    departure_time: '2021-05-31T11:32:50',
    return_time: '2021-05-31T11:35:57',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 586,
    duration_in_seconds: 183,
  },
  {
    id: 5,
    departure_time: '2021-05-31T09:44:44',
    return_time: '2021-05-31T09:47:55',
    departure_station_id: '529',
    return_station_id: '531',
    covered_distance_in_meters: 626,
    duration_in_seconds: 191,
  },
  {
    id: 6,
    departure_time: '2021-05-30T18:20:51',
    return_time: '2021-05-30T18:45:33',
    departure_station_id: '501',
    return_station_id: '539',
    covered_distance_in_meters: 5186,
    duration_in_seconds: 1478,
  },
  {
    id: 7,
    departure_time: '2021-05-30T16:41:51',
    return_time: '2021-05-30T16:46:49',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 602,
    duration_in_seconds: 293,
  },
  {
    id: 8,
    departure_time: '2021-05-30T16:41:27',
    return_time: '2021-05-30T16:45:54',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 577,
    duration_in_seconds: 261,
  },
  {
    id: 9,
    departure_time: '2021-05-29T14:19:33',
    return_time: '2021-05-29T14:26:03',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 784,
    duration_in_seconds: 385,
  },
  {
    id: 10,
    departure_time: '2021-05-29T10:16:43',
    return_time: '2021-05-29T10:20:07',
    departure_station_id: '529',
    return_station_id: '531',
    covered_distance_in_meters: 594,
    duration_in_seconds: 201,
  },
  {
    id: 11,
    departure_time: '2021-06-30T21:57:08',
    return_time: '2021-06-30T22:24:53',
    departure_station_id: '529',
    return_station_id: '529',
    covered_distance_in_meters: 1435,
    duration_in_seconds: 1661,
  },
  {
    id: 12,
    departure_time: '2021-06-30T18:01:06',
    return_time: '2021-06-30T18:03:19',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 584,
    duration_in_seconds: 127,
  },
  {
    id: 13,
    departure_time: '2021-06-30T15:21:30',
    return_time: '2021-06-30T15:24:39',
    departure_station_id: '529',
    return_station_id: '531',
    covered_distance_in_meters: 592,
    duration_in_seconds: 185,
  },
  {
    id: 14,
    departure_time: '2021-06-30T13:40:13',
    return_time: '2021-06-30T13:43:30',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 596,
    duration_in_seconds: 193,
  },
  {
    id: 15,
    departure_time: '2021-06-30T13:39:50',
    return_time: '2021-06-30T13:43:40',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 737,
    duration_in_seconds: 224,
  },
  {
    id: 16,
    departure_time: '2021-06-30T06:49:50',
    return_time: '2021-06-30T06:52:03',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 598,
    duration_in_seconds: 128,
  },
  {
    id: 17,
    departure_time: '2021-06-29T21:29:28',
    return_time: '2021-06-29T21:37:44',
    departure_station_id: '529',
    return_station_id: '501',
    covered_distance_in_meters: 1553,
    duration_in_seconds: 494,
  },
  {
    id: 18,
    departure_time: '2021-06-29T21:29:24',
    return_time: '2021-06-29T21:37:24',
    departure_station_id: '529',
    return_station_id: '501',
    covered_distance_in_meters: 1560,
    duration_in_seconds: 480,
  },
  {
    id: 19,
    departure_time: '2021-06-29T19:12:51',
    return_time: '2021-06-29T19:40:54',
    departure_station_id: '539',
    return_station_id: '501',
    covered_distance_in_meters: 3640,
    duration_in_seconds: 1679,
  },
  {
    id: 20,
    departure_time: '2021-06-29T19:09:45',
    return_time: '2021-06-29T19:40:28',
    departure_station_id: '539',
    return_station_id: '501',
    covered_distance_in_meters: 3722,
    duration_in_seconds: 1839,
  },
  {
    id: 21,
    departure_time: '2021-07-31T21:07:30',
    return_time: '2021-07-31T21:29:38',
    departure_station_id: '040',
    return_station_id: '040',
    covered_distance_in_meters: 1970,
    duration_in_seconds: 1326,
  },
  {
    id: 22,
    departure_time: '2021-07-31T17:00:33',
    return_time: '2021-07-31T17:08:24',
    departure_station_id: '501',
    return_station_id: '529',
    covered_distance_in_meters: 1562,
    duration_in_seconds: 466,
  },
  {
    id: 23,
    departure_time: '2021-07-31T17:00:08',
    return_time: '2021-07-31T17:08:52',
    departure_station_id: '501',
    return_station_id: '529',
    covered_distance_in_meters: 1543,
    duration_in_seconds: 520,
  },
  {
    id: 24,
    departure_time: '2021-07-31T16:59:58',
    return_time: '2021-07-31T17:09:04',
    departure_station_id: '501',
    return_station_id: '529',
    covered_distance_in_meters: 1506,
    duration_in_seconds: 542,
  },
  {
    id: 25,
    departure_time: '2021-07-31T16:59:57',
    return_time: '2021-07-31T17:08:15',
    departure_station_id: '501',
    return_station_id: '529',
    covered_distance_in_meters: 1568,
    duration_in_seconds: 493,
  },
  {
    id: 26,
    departure_time: '2021-07-31T15:16:46',
    return_time: '2021-07-31T15:36:28',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 810,
    duration_in_seconds: 1181,
  },
  {
    id: 27,
    departure_time: '2021-07-31T15:16:19',
    return_time: '2021-07-31T15:24:26',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 727,
    duration_in_seconds: 486,
  },
  {
    id: 28,
    departure_time: '2021-07-31T15:16:16',
    return_time: '2021-07-31T15:24:11',
    departure_station_id: '531',
    return_station_id: '529',
    covered_distance_in_meters: 907,
    duration_in_seconds: 474,
  },
  {
    id: 29,
    departure_time: '2021-07-31T11:16:32',
    return_time: '2021-07-31T11:28:36',
    departure_station_id: '040',
    return_station_id: '032',
    covered_distance_in_meters: 2017,
    duration_in_seconds: 720,
  },
  {
    id: 30,
    departure_time: '2021-07-31T01:30:05',
    return_time: '2021-07-31T01:38:54',
    departure_station_id: '529',
    return_station_id: '531',
    covered_distance_in_meters: 1233,
    duration_in_seconds: 525,
  },
]

const getLastIdOfJourneys = () => {
  const lastJourneyIndex = journeysInSnakeCaseWithSetDatabaseId.length - 1
  const lastJourneyEntry =
    journeysInSnakeCaseWithSetDatabaseId[lastJourneyIndex]
  return lastJourneyEntry.id
}

export {
  stationsInSnakeCaseWithSetDatabaseId,
  getLastIdOfStations,
  stationsInCamelCaseWithSetDatabaseId,
  getOrderedStationsInCamelCase,
  journeysInSnakeCaseWithSetDatabaseId,
  getLastIdOfJourneys,
}
